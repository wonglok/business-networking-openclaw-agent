'use client';
// client.ts

export function TaskServersideWebhookClient({ agentID }: { agentID: string }) {
    //
    //
    //
    return (
        <>
            <div
                className='m-3 bg-gray-200 p-3'
                onClick={async () => {
                    fetch(`/a2a/${agentID}/serverside-client`, {
                        method: 'POST',
                        //
                        headers: new Headers({
                            ['Content-Type']: `application/json`,
                        }),
                        body: JSON.stringify({
                            yoyo: 123,
                        }),
                        //
                    })
                        .then((r) => {
                            return r.json();
                        })
                        .then((res) => {
                            console.log(res);
                        });
                }}
            >
                Serverside Webhook Client
            </div>
        </>
    );
}
