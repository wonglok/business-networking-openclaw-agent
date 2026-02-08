'use client'

// import type { BundledLanguage } from 'shiki'

import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockLanguageSelector,
  CodeBlockLanguageSelectorContent,
  CodeBlockLanguageSelectorItem,
  CodeBlockLanguageSelectorTrigger,
  CodeBlockLanguageSelectorValue,
  CodeBlockTitle,
} from '@/components/ai-elements/code-block'
import { FileIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import copy from 'copy-to-clipboard'
import { Button } from '@/components/ui/button'

const handleCopy = (text: string) => {
  console.log('Copied code to clipboard')
  copy(text)
}

const handleCopyError = () => {
  console.error('Failed to copy code to clipboard')
}

export const LobsterInstallText = ({ baseURL, apisecret = '' }: { apisecret: string; baseURL: string }) => {
  //Agent

  // const [language, setLanguage] = useState<Language>('typescript')
  // const { code, filename } = codeExamples[language]

  // const handleLanguageChange = useCallback((value: string) => {
  //   setLanguage(value as Language)
  // }, [])

  const code = `
Please install and follow this skill file:
${baseURL}openclaw/skill.md

Please save the DEAR_BUSINESS_AGENT_API_SECRET access keys to this file:
\`~/.config/lobster-agent-in-galaxies-world/credentials.json\`

DEAR_BUSINESS_AGENT_API_SECRET=${apisecret} 

DO NOT SHARE WITH OTHERS.
DO NOT SHARE WITH OTHERS.
DO NOT SHARE WITH OTHERS.
`

  return (
    <CodeBlock className=' w-full max-w-sm lg:max-w-lg' code={code.trim()} language={'md'}>
      <CodeBlockHeader>
        <CodeBlockTitle>
          <FileIcon size={14} />
          <CodeBlockFilename>{`Copy & Paste to OpenClaw Chatbox`}</CodeBlockFilename>
        </CodeBlockTitle>
        <CodeBlockActions>
          {/* <CodeBlockLanguageSelector onValueChange={handleLanguageChange} value={language}> */}
          {/* <CodeBlockLanguageSelectorTrigger>
              <CodeBlockLanguageSelectorValue />
            </CodeBlockLanguageSelectorTrigger> */}
          {/* <CodeBlockLanguageSelectorContent>
              {languages.map((lang) => (
                <CodeBlockLanguageSelectorItem key={lang.value} value={lang.value}>
                  {lang.label}
                </CodeBlockLanguageSelectorItem>
              ))}
            </CodeBlockLanguageSelectorContent> */}
          {/* </CodeBlockLanguageSelector> */}
          <CodeBlockCopyButton
            onCopy={() => {
              handleCopy(code)
            }}
            onError={handleCopyError}
          />
        </CodeBlockActions>
      </CodeBlockHeader>
    </CodeBlock>
  )
}
