export const GET = async (req: Request, ctx: any) => {
  const claimId = (await ctx.params).claimId

  //
  return new Response(`${JSON.stringify(claimId)}`, {
    headers: {
      'content-type': 'text/markdown; charset=UTF-8',
    },
  })
}
