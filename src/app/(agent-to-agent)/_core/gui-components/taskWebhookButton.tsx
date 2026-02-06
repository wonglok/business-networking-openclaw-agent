'use client';
// client.ts
import { type MessageSendParams, type PushNotificationConfig, type SendMessageSuccessResponse } from '@a2a-js/sdk';
import { A2AClient } from '@a2a-js/sdk/client';
// import { type Message, type Task } from '@a2a-js/sdk';
import { v4 } from 'uuid';
import { getA2ABaseURL } from '../getA2ABaseURL';

export function TaskWebhookButton({ agentID }: { agentID: string }) {
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
                    const client = await A2AClient.fromCardUrl(`${getA2ABaseURL({ agentID })}/a2a/${agentID}/card`);

                    // Configure push notification for a message
                    const pushConfig: PushNotificationConfig = {
                        id: 'task-id', // Optional, defaults to task ID
                        url: `${getA2ABaseURL({ agentID })}/a2a/${agentID}/push-notifications`,
                        token: 'your-auth-token', // Optional authentication token
                    };

                    const sendParams: MessageSendParams = {
                        message: {
                            messageId: v4(),
                            role: 'user',
                            parts: [
                                //
                                {
                                    //
                                    kind: 'text',
                                    text: 'Hello, agent!',
                                },
                            ],
                            kind: 'message',
                        },
                        configuration: {
                            blocking: false,
                            acceptedOutputModes: ['text/plain'],
                            pushNotificationConfig: pushConfig, // Add push notification config
                        },
                    };

                    try {
                        const msg = await client.sendMessage(sendParams);
                        console.log(msg);

                        //

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
                        // console.log("--- Stream finished ---");
                    } catch (error) {
                        console.error('Error during streaming:', error);
                    }
                }}
            >
                Webhook
            </div>
            {/*  */}
            {/*  */}
        </>
    );
}
