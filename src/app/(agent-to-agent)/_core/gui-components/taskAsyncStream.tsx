'use client';
// client.ts
import { type SendMessageSuccessResponse, type MessageSendParams } from '@a2a-js/sdk';
import { A2AClient } from '@a2a-js/sdk/client';
import { type Message, type Task } from '@a2a-js/sdk';
import { v4 } from 'uuid';
import { getA2ABaseURL } from '../getA2ABaseURL';
// ... other imports ...

export function TaskAsync({ agentID }: { agentID: string }) {
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

                    const streamParams: MessageSendParams = {
                        message: {
                            messageId: v4(),
                            role: 'user',
                            parts: [
                                {
                                    kind: 'text',
                                    text: 'Stream me some updates!',
                                },
                            ],
                            kind: 'message',
                        },
                    };

                    try {
                        const stream = client.sendMessageStream(streamParams);

                        for await (const event of stream) {
                            if (event.kind === 'task') {
                                console.log(`[${event.id}] Task created. Status: ${event.status.state}`);
                            } else if (event.kind === 'status-update') {
                                console.log(`[${event.taskId}] Status Updated: ${event.status.state}`);
                            } else if (event.kind === 'artifact-update') {
                                console.log(`[${event.taskId}] Artifact Received: ${event.artifact.artifactId}`);
                            }
                        }
                        console.log('--- Stream finished ---');
                    } catch (error) {
                        console.error('Error during streaming:', error);
                    }
                    //
                    //
                }}
            >
                Task Async Stream
            </div>
            {/*  */}
            {/*  */}
        </>
    );
}
