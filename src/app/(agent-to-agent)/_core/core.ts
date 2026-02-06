import type {
  AgentCard,
  JSONRPCErrorResponse,
  JSONRPCResponse,
  JSONRPCSuccessResponse,
  MessageSendParams,
  PushNotificationConfig,
  TaskArtifactUpdateEvent,
  TaskStatusUpdateEvent,
} from '@a2a-js/sdk'
import {
  type AgentExecutor,
  RequestContext,
  type ExecutionEventBus,
  DefaultRequestHandler,
  InMemoryTaskStore,
  JsonRpcTransportHandler,
  A2AError,
} from '@a2a-js/sdk/server'
// import { A2AExpressApp } from "@a2a-js/sdk/server/express";
// import { v4 } from 'uuid';
import { type Message, type Task } from '@a2a-js/sdk'

import { InMemoryPushNotificationStore, DefaultPushNotificationSender } from '@a2a-js/sdk/server'
import { v4 } from 'uuid'
import { getA2ABaseURL } from './getA2ABaseURL'
import { A2AClient } from '@a2a-js/sdk/client'

// https://www.saad.sh/posts/nextjs-streaming

const getConfig = async ({ agentID }: { agentID: string }) => {
  const pushNotificationStore = new InMemoryPushNotificationStore()

  const pushNotificationSender = new DefaultPushNotificationSender(pushNotificationStore, {
    timeout: 15 * 1000, // 15 second timeout
    tokenHeaderName: 'X-A2A-Notification-Token', // Custom header name
  })

  // 1. Define your agent's identity card.
  const agentCard: AgentCard = {
    name: 'Inter Site Agent',
    description: 'My Interstie Agent',
    url: `${getA2ABaseURL({ agentID })}/a2a/${agentID}/inbound`,
    provider: {
      organization: 'Inter-Site Technology',
      url: `${getA2ABaseURL({ agentID })}/a2a/${agentID}/inbound`,
    },
    version: '1.0.0',
    capabilities: {
      streaming: true,
      pushNotifications: true,
      stateTransitionHistory: true,
    },
    skills: [
      {
        id: 'general_chat',
        name: 'General Chat',
        description: 'General conversation using A2A JavaScript',
        tags: ['chat', 'a2a-js'],
        examples: ['Hello', 'Help me answer questions'],
      },
    ],
    // --- Other AgentCard fields omitted for brevity ---
  } as AgentCard

  class TaskExecutor implements AgentExecutor {
    async execute(requestContext: RequestContext, eventBus: ExecutionEventBus): Promise<void> {
      //
      //
      const { taskId, contextId } = requestContext

      // 1. Publish initial 'submitted' state.
      eventBus.publish({
        kind: 'task',
        id: taskId,
        contextId: contextId,
        status: {
          state: 'submitted',
          timestamp: new Date().toISOString(),
        },
      })

      //

      const maxTask = 5
      for (let i = 0; i < maxTask; i++) {
        // 2. Publish 'working' state.
        //
        //
        eventBus.publish({
          kind: 'status-update',
          taskId: taskId,
          contextId: contextId,
          status: {
            state: 'working',
            timestamp: new Date().toISOString(),
            message: {
              kind: 'message',
              role: 'agent',
              messageId: `${v4()}`,
              taskId: taskId,
              contextId: contextId,
              parts: [
                {
                  /**
                   * The structured data content.
                   */
                  data: {
                    mydata: i + 1,
                  },
                  /**
                   * The type of this part, used as a discriminator. Always 'data'.
                   */
                  kind: 'data',
                  /**
                   * Optional metadata associated with this part.
                   */
                  metadata: {
                    index: i,
                    maxIndex: maxTask - 1,
                    //
                    count: maxTask,
                  },
                },
              ],
            },
          },
          final: false,
        })

        await new Promise((resolve) => setTimeout(resolve, 500))

        console.log('execution...', i)
      }

      await new Promise((resolve) => setTimeout(resolve, 500))

      // 3. Simulate work and publish an artifact.
      eventBus.publish({
        kind: 'artifact-update',
        taskId: taskId,
        contextId: contextId,
        artifact: {
          artifactId: 'result.txt',
          parts: [{ kind: 'text', text: 'First result.' }],
        },
      })

      await new Promise((resolve) => setTimeout(resolve, 500))

      // 4. Publish final 'completed' state.
      eventBus.publish({
        kind: 'status-update',
        taskId: taskId,
        contextId: contextId,
        status: {
          state: 'completed',
          timestamp: new Date().toISOString(),
        },
        final: true,
      })

      eventBus.finished()
    }

    cancelTask = async (): Promise<void> => {
      //
    }
  }

  // 3. Set up and run the server.
  const agentExecutor = new TaskExecutor()

  const taskStore = new InMemoryTaskStore()

  // const requestHandler = new DefaultRequestHandler(
  //     agentCard,
  //     taskStore,
  //     agentExecutor,
  // );

  const requestHandler = new DefaultRequestHandler(
    agentCard,
    taskStore,
    agentExecutor,
    undefined, // eventBusManager (optional)
    pushNotificationStore, // custom store
    pushNotificationSender, // custom sender
    undefined, // extendedAgentCard (optional)
  )

  const jsonRpcTransportHandler = new JsonRpcTransportHandler(requestHandler)

  return {
    jsonRpcTransportHandler,
    // agentExecutor,
    requestHandler,
  }
}

export const GetMethodAgentCard = async (request: Request, { params }: { params: Promise<{ agentID: string }> }) => {
  const agentID = (await params).agentID
  const { requestHandler } = await getConfig({ agentID: agentID })

  try {
    // getAgentCard is on A2ARequestHandler, which DefaultRequestHandler implements

    const agentCard = await requestHandler.getAgentCard()

    return Response.json(agentCard, {
      status: 200,
    })
  } catch (error: any) {
    //

    console.error('Error fetching agent card:', error)
    return Response.json(
      { error: 'Failed to retrieve agent card' },
      {
        status: 500,
      },
    )
  }
}

export const PostMethodPushNotificationWebhook = async (
  request: Request,
  { params }: { params: Promise<{ agentID: string }> },
) => {
  const update: Task = await request.json()

  const token = request.headers.get('x-a2a-notification-token')

  if (token !== 'your-auth-token') {
    return Response.json(
      { error: 'Unauthorized' },
      {
        status: 401,
      },
    )
  }

  console.log(JSON.stringify(update, null, '\t'))

  console.log(`a2a-update-task ${update.id} status: ${update.status.state}`)

  // reply to origin , target received notification
  return Response.json({ received: true })
}

//
//

export const PostMethodInboundMessage = async (
  request: Request,
  { params }: { params: Promise<{ agentID: string }> },
) => {
  const agentID = (await params).agentID

  const { jsonRpcTransportHandler } = await getConfig({ agentID })

  const req = {
    body: await request.json(),
  }

  const requestID = req.body.id

  const responseStream = new TransformStream()

  try {
    const rpcResponseOrStream = await jsonRpcTransportHandler.handle(JSON.stringify(req.body))

    console.log('rpcResponseOrStream', typeof (rpcResponseOrStream as any)?.[Symbol.asyncIterator] === 'function')

    // Check if it's an AsyncGenerator (stream)
    if (typeof (rpcResponseOrStream as any)?.[Symbol.asyncIterator] === 'function') {
      console.log('rpcResponse-stream-json', rpcResponseOrStream)

      const stream = rpcResponseOrStream as AsyncGenerator<JSONRPCSuccessResponse, void, undefined>

      const writer = responseStream.writable.getWriter()

      const headers = new Headers({
        ['Content-Type']: 'text/event-stream',
        ['Connection']: 'keep-alive',
        ['Cache-Control']: 'no-cache, no-transform',
      })

      try {
        await new Promise((resolve) => {
          //

          const run = async () => {
            for await (const event of stream) {
              // Each event from the stream is already a JSONRPCResult

              //
              writer.write(`id: ${new Date().getTime()}\n`)
              writer.write(`data: ${JSON.stringify(event)}\n\n`)

              // console.log('streaming...', `${JSON.stringify(event)}`);
            }

            //
            // once all done then reply.
            writer.close()

            resolve(null)
          }
          run()
        })
      } catch (streamError: any) {
        console.error(`Error during SSE streaming (request ${requestID}):`, streamError)
        // If the stream itself throws an error, send a final JSONRPCErrorResponse
        const a2aError =
          streamError instanceof A2AError
            ? streamError
            : A2AError.internalError(streamError.message || 'Streaming error.')

        const errorResponse: JSONRPCErrorResponse = {
          jsonrpc: '2.0',
          id: requestID || null, // Use original request ID if available
          error: a2aError.toJSONRPCError(),
        }

        // Try to send as last SSE event if possible, though client might have disconnected
        writer.write(`id: ${new Date().getTime()}\n`)
        writer.write(`event: error\n`) // Custom event type for client-side handling
        writer.write(`data: ${JSON.stringify(errorResponse)}\n\n`)
        //

        //
      } finally {
        return new Response(responseStream.readable, {
          headers: headers,
        })
      }
    } else {
      // Single JSON-RPC response
      const rpcResponse = rpcResponseOrStream as JSONRPCResponse
      // res.status(200).json(rpcResponse);

      console.log('rpcResponse-sync-json', rpcResponse)

      return Response.json(rpcResponse)
    }
  } catch (error: any) {
    //
    // Catch errors from jsonRpcTransportHandler.handle itself (e.g., initial parse error)
    console.error('Unhandled error in A2AExpressApp POST handler:', error)
    //

    const a2aError = error instanceof A2AError ? error : A2AError.internalError('General processing error.')

    const errorResponse: JSONRPCErrorResponse = {
      jsonrpc: '2.0',
      id: null,
      error: a2aError.toJSONRPCError(),
    }

    return new Response(JSON.stringify(errorResponse), {
      status: 500,
    })
  }
}

export const FuncCallA2AWebhook = async ({ agentID }: { agentID: string }) => {
  ///

  const client = await A2AClient.fromCardUrl(`${getA2ABaseURL({ agentID })}/a2a/${agentID}/card`)

  // Configure push notification for a message
  const pushConfig: PushNotificationConfig = {
    id: 'my-notification-config', // Optional, defaults to task ID
    url: `${getA2ABaseURL({ agentID })}/a2a/${agentID}/push-notifications`,
    token: 'your-auth-token', // Optional authentication token
  }

  const sendParams: MessageSendParams = {
    message: {
      messageId: v4(),
      role: 'user',
      parts: [
        //
        { kind: 'text', text: 'Hello, agent!' },
      ],
      kind: 'message',
    },
    configuration: {
      blocking: false,
      acceptedOutputModes: ['text/plain'],
      pushNotificationConfig: pushConfig, // Add push notification config
    },
  }

  //

  try {
    //
    //
    client.sendMessage(sendParams).then((msg) => {
      console.log('client.sendMessage', JSON.stringify(msg, null, '  '))
    })

    //
    //
    // console.log(msg);

    // const stream = client.sendMessageStream(sendParams);

    // for await (const event of stream) {
    //     console.log("event", event);
    //     if (event.kind === "task") {
    //         console.log(
    //             `[${event.id}] Task created. Status: ${event.status.state}`,
    //         );
    //     } else if (event.kind === "status-update") {
    //         console.log(
    //             `[${event.taskId}] Status Updated: ${event.status.state}`,
    //         );
    //     } else if (event.kind === "artifact-update") {
    //         console.log(
    //             `[${event.taskId}] Artifact Received: ${event.artifact.artifactId}`,
    //         );
    //     }
    //     //
    // }

    //

    // console.log("--- Stream finished ---");
  } catch (error) {
    console.error('Error during streaming:', error)
  }
}
