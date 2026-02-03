import { redirect } from 'next/navigation'

export const GET = async (req: Request, ctx: any) => {
  const claimId = (await ctx.params).claimId

  return redirect('/activate-agent/' + claimId)
}
