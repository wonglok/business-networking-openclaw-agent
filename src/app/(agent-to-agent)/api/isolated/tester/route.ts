export const POST = async (req: Request) => {
  const body = await req.json()

  return new Response(
    JSON.stringify({
      //
      vercelFunc: 'from rest api from vercel rand: ' + Math.random(),
      ...(body || {}),
    }),
  )
}

export const GET = POST
