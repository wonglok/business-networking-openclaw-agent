'use client'
// client.ts
import { type SendMessageSuccessResponse } from '@a2a-js/sdk'
import { A2AClient, ClientFactory } from '@a2a-js/sdk/client'
import { type Message, type Task } from '@a2a-js/sdk'
import { v4 } from 'uuid'
import { getA2ABaseURL } from '../getA2ABaseURL'
// ... other imports ...

export function TaskSync({ agentID }: { agentID: string }) {
  //
  //
  //
  return (
    <>
      {/*  */}
      {/*  */}
      <div
        className='m-3 bg-gray-200 p-3'
        onClick={async () => {
          const client = await A2AClient.fromCardUrl(`${getA2ABaseURL({ agentID })}/a2a/${agentID}/card`)

          const response = await client.sendMessage({
            message: {
              messageId: v4(),
              role: 'user',
              parts: [{ kind: 'text', text: 'Do something.' }],
              kind: 'message',
            },
          })

          if ('error' in response) {
            console.error('Error:', response.error.message)
          } else {
            const result = (response as SendMessageSuccessResponse).result

            // Check if the agent's response is a Task or a direct Message.
            if (result.kind === 'task') {
              const task = result as Task
              console.log(`Task [${task.id}] completed with status: ${task.status.state}`)

              console.log('task.artifacts', JSON.stringify(task.artifacts, null, '\t'))

              console.log('task.artifacts', JSON.stringify(task.artifacts, null, '\t'))

              if (task.artifacts && task.artifacts.length > 0) {
                console.log(`Artifact found: ${task.artifacts[0]?.name}`)
                if (task?.artifacts[0]?.parts[0]) {
                  console.log(
                    `Content: ${
                      (
                        task?.artifacts[0]?.parts[0] as {
                          text: any
                        }
                      )?.text
                    }`,
                  )
                }
              }
            } else {
              const message = result as Message
              console.log('Received direct message:', (message?.parts[0] as { text: any })?.text)
            }
          }
        }}
      >
        Task Sync
      </div>
      {/*  */}
      {/*  */}
    </>
  )
}
