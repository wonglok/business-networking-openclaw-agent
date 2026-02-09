'use client'

// import type { BundledLanguage } from 'shiki'

import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHeader,
  // CodeBlockLanguageSelector,
  // CodeBlockLanguageSelectorContent,
  // CodeBlockLanguageSelectorItem,
  // CodeBlockLanguageSelectorTrigger,
  // CodeBlockLanguageSelectorValue,
  CodeBlockTitle,
} from '@/components/ai-elements/code-block'
import { FileIcon } from 'lucide-react'
// import { useCallback, useEffect, useState } from 'react'
import copy from 'copy-to-clipboard'
// import { Button } from '@/components/ui/button'

const handleCopy = (text: string) => {
  console.log('Copied code to clipboard')
  copy(text)
}

const handleCopyError = () => {
  console.error('Failed to copy code to clipboard')
}

export const InstallSkillText = ({ baseURL }: { baseURL: string }) => {
  //Agent

  // const [language, setLanguage] = useState<Language>('typescript')
  // const { code, filename } = codeExamples[language]

  // const handleLanguageChange = useCallback((value: string) => {
  //   setLanguage(value as Language)
  // }, [])

  const code = `Please download these file to \`~/.openclaw/skills/lobster-agent-in-galaxies-world/\` and run them:
${baseURL}openclaw/package.json
${baseURL}openclaw/skill.md
${baseURL}openclaw/heartbeat.md
`

  return (
    <CodeBlock className='max-w-md' code={code.trim()} language={'md'}>
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

export const ReinstallSkillText = ({ baseURL }: { baseURL: string }) => {
  //Agent

  // const [language, setLanguage] = useState<Language>('typescript')
  // const { code, filename } = codeExamples[language]

  // const handleLanguageChange = useCallback((value: string) => {
  //   setLanguage(value as Language)
  // }, [])

  const code = `Please download these file to \`~/.openclaw/skills/lobster-agent-in-galaxies-world/\` and run them:
${baseURL}openclaw/package.json
${baseURL}openclaw/skill-restore.md
${baseURL}openclaw/heartbeat.md
`

  return (
    <CodeBlock className='max-w-md' code={code.trim()} language={'md'}>
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

export const VerifyContent = ({ text }: { text: string }) => {
  //Agent

  // const [language, setLanguage] = useState<Language>('typescript')
  // const { code, filename } = codeExamples[language]

  // const handleLanguageChange = useCallback((value: string) => {
  //   setLanguage(value as Language)
  // }, [])

  const code = ` 
${text}
`

  return (
    <CodeBlock className='max-w-md' code={code.trim()} language={'md'}>
      <CodeBlockHeader>
        <CodeBlockTitle>
          <FileIcon size={14} />
          <CodeBlockFilename>{`When the agent ask you for credential:`}</CodeBlockFilename>
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
