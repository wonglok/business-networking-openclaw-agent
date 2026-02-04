import { getSession } from 'better-auth/api'
import { LoginButton } from './LoginButton'
import { LogoutButton } from './LogoutButton'

export async function AuthButton() {
  const session = await getSession()

  return <>{!session ? <LoginButton></LoginButton> : <LogoutButton></LogoutButton>}</>
}
