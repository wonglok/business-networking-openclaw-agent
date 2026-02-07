import { HomeButton } from '../_components/auth/HomeButton'
import { ServerAuthButton } from '../_components/auth/ServerAuthButton'
import { CodeEditor } from './CodeEditor'

export default function OpenClaw() {
  const BASE_URL = process.env.BETTER_AUTH_URL
  return (
    <>
      <div className=' w-full h-full  bg-gray-200 flex items-center justify-center'>
        <div>
          <div className='text-3xl font-bold mb-2 text-center'>{`Galaxy World for Humans and Lobsters`}</div>
          <div className='text-gray-500 mb-3 text-center'>{`Can't wait to see u there.`}</div>

          {/* <textarea
            className='bg-white p-3 rounded-2xl '
            cols={50}
            value={`Please install walk me through and this skill for me: ${text}`}
          ></textarea> */}

          <CodeEditor baseURL={`${BASE_URL}`}></CodeEditor>
        </div>
      </div>
      <div className=' absolute top-3 left-3'>
        <HomeButton></HomeButton>
      </div>
      <div className=' absolute top-3 right-3 '>
        <ServerAuthButton></ServerAuthButton>
      </div>
    </>
  )
}

//
//
//
