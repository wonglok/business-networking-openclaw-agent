'use client'

import { authClient } from '@/server/better-auth/client'

export function LinkedinButton() {
  return (
    <>
      <button
        className='w-full justify-between items-center inline-flex p-2 bg-[#4e4e4e55] border-2 border-white text-white rounded-lg px-5 select-none cursor-pointer'
        onClick={async () => {
          const response = await authClient.signIn.social({
            provider: 'linkedin',
            // callbackURL: `/api/auth/callback/google`,
            // scopes: [
            //   "https://www.googleapis.com/auth/userinfo.email",
            //   "https://www.googleapis.com/auth/userinfo.profile",
            // ],
          })

          //

          location.assign(response?.data?.url || '/')
          console.log(response?.data?.url)
        }}
      >
        {/* <svg className='h-full' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
          <path
            d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
            fill='currentColor'
          />
        </svg> */}
        <svg className='w-[17px] mr-2' viewBox='0 0 512 509.64' version='1.1'>
          <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
            <g transform='translate(0.000000, -6.000000)' fill='#FFFFFF' fillRule='nonzero'>
              <g transform='translate(0.000000, 6.000000)'>
                <path d='M396.39,0 C460.23964,-1.42108547e-14 512,51.7603601 512,115.61 L512,394.03 C512,457.87964 460.23964,509.64 396.39,509.64 L115.61,509.64 C51.7603601,509.64 1.42108547e-14,457.87964 0,394.03 L0,115.61 C-1.42108547e-14,51.7603601 51.7603601,1.42108547e-14 115.61,0 L396.39,0 Z M269.66,197.54 L204.97,197.54 L204.97,412.27 L272.37,412.27 L272.37,306.41 C272.37,279.6 277.76,253.69 312.88,253.69 C347.47,253.69 347.96,284.33 347.96,308.14 L347.97,412.27 L415.43,412.27 L415.43,295.35 C415.43,240.05 402.8,197.54 334.49,197.54 C301.64,197.54 279.61,214.54 270.6,230.7 L269.66,230.7 L269.66,197.54 Z M166.74,197.54 L96.57,197.54 L96.57,412.27 L166.74,412.27 L166.74,197.54 Z M131.66,97.37 C112.29,97.37 96.57,113.08 96.57,132.45 C96.57,151.81 112.29,167.53 131.66,167.53 C151.02,167.53 166.74,151.81 166.74,132.45 C166.74,113.08 151.02,97.37 131.66,97.37 Z'></path>
              </g>
            </g>
          </g>
        </svg>
        Linkedin Login
      </button>
    </>
  )
}

//

//

//
//https%3A%2F%2Flaptop.smile-with-jesus.com%2Fapi%2Fauth%2Fcallback%2Flinkedin
// https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86wx5fn40l5z3k&state=X_WH8yiftVTjJ1gx2yRbeQ7K5HAjgTaB&scope=profile+email+openid+profile+email&redirect_uri=
