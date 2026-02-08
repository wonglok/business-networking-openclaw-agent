'use client'

import { Streamdown } from 'streamdown'
import { code } from '@streamdown/code'

// import { mermaid } from '@streamdown/mermaid'
// import { math } from '@streamdown/math'
// import { cjk } from '@streamdown/cjk'
// import 'katex/dist/katex.min.css'

export default function Page() {
  return (
    <div className='container max-w-md p-4 lg:p-6 '>
      <Streamdown plugins={{ code }}>{policy}</Streamdown>
    </div>
  )
}

const policy = `

# Privacy Policy

Galaxies.World takes your privacy seriously. To better protect your privacy Galaxies.World provide this privacy policy notice explaining the way your personal information is collected and used.


## Collection of Routine Information

This website track basic information about their [["visitors" or "users"]]. This information includes, but is not limited to, IP addresses, [["browser" or "app"]] details, timestamps and referring pages. None of this information can personally identify specific [["visitors" or "user"]] to this website. The information is tracked for routine administration and maintenance purposes.


## Cookies

Where necessary, this website uses cookies to store information about a visitor’s preferences and history in order to better serve the [["visitor" or "user"]] and/or present the [["visitor" or "user"]] with customized content.


## Advertisement and Other Third Parties

Advertising partners and other third parties may use cookies, scripts and/or web beacons to track [["visitors" or "user"]] activities on this website in order to display advertisements and other useful information. Such tracking is done directly by the third parties through their own servers and is subject to their own privacy policies. This website has no access or control over these cookies, scripts and/or web beacons that may be used by third parties. Learn how to [opt out of Google’s cookie usage](http://www.google.com/privacy_ads.html).


## Links to Third Party Websites

Galaxies.World have included links on this website for your use and reference. Galaxies.World are not responsible for the privacy policies on these websites. You should be aware that the privacy policies of these websites may differ from [["our" or "my"]] own.


## Security

The security of your personal information is important to me, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While Galaxies.World strive to use commercially acceptable means to protect your personal information, Galaxies.World cannot guarantee its absolute security.


## Changes To This Privacy PolicyThis Privacy Policy is effective as of [[Date]] and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.
Galaxies.World reserve the right to update or change [["our" or "my"]] Privacy Policy at any time and you should check this Privacy Policy periodically. If Galaxies.World make any material changes to this Privacy Policy, Galaxies.World will notify you either through the email address you have provided me, or by placing a prominent notice on [["our" or "my"]] website.


## Contact Information

For any questions or concerns regarding the privacy policy, please send me an email to yellowhappy831[at]gmail.com.

`
