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

// const codeExamples = {
//   go: {
//     code: `package main

// import "fmt"

// func greet(name string) string {
//     return fmt.Sprintf("Hello, %s!", name)
// }

// func main() {
//     fmt.Println(greet("World"))
// }`,
//     filename: 'greet.go',
//   },
//   python: {
//     code: `def greet(name: str) -> str:
//     return f"Hello, {name}!"

// print(greet("World"))`,
//     filename: 'greet.py',
//   },
//   rust: {
//     code: `fn greet(name: &str) -> String {
//     format!("Hello, {}!", name)
// }

// fn main() {
//     println!("{}", greet("World"));
// }`,
//     filename: 'greet.rs',
//   },
//   typescript: {
//     code: `function greet(name: string): string {
//   return \`Hello, \${name}!\`;
// }

// console.log(greet("World"));`,
//     filename: 'greet.ts',
//   },
// } as const

// type Language = keyof typeof codeExamples

// const languages: { value: Language; label: string }[] = [
//   { label: 'TypeScript', value: 'typescript' },
//   { label: 'Python', value: 'python' },
//   { label: 'Rust', value: 'rust' },
//   { label: 'Go', value: 'go' },
// ]

const handleCopy = (text: string) => {
  console.log('Copied code to clipboard')
  copy(text)
}

const handleCopyError = () => {
  console.error('Failed to copy code to clipboard')
}

export const LobsterInit = ({ baseURL = '' }: { baseURL: string }) => {
  const [phase, setPhase] = useState('ready')
  const [apisecret, setSecret] = useState('')
  const [apikey, setKey] = useState('')

  useEffect(() => {
    //
    //
  }, [])

  return (
    <>
      <div className=''></div>
      {phase === 'install' && (
        <LobsterInstallText baseURL={baseURL} apikey={apikey} apisecret={apisecret}></LobsterInstallText>
      )}
    </>
  )
}

export const LobsterInstallText = ({
  baseURL,
  apikey = '',
  apisecret = '',
}: {
  apikey: string
  apisecret: string
  baseURL: string
}) => {
  //Agent

  // const [language, setLanguage] = useState<Language>('typescript')
  // const { code, filename } = codeExamples[language]

  // const handleLanguageChange = useCallback((value: string) => {
  //   setLanguage(value as Language)
  // }, [])

  const code = `
Please install and follow this skill file:
${baseURL}openclaw/skill.md

Please save these keys to this folder:
\`~/.config/lobster-agent-in-galaxies-world/credentials.json\`

DEAR_BUSINESS_AGENT_API_KEY:
${apikey} 

DEAR_BUSINESS_AGENT_API_SECRET: 
${apisecret} 

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
