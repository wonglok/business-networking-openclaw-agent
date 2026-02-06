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
import { useCallback, useState } from 'react'
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

export const CodeEditor = ({ baseURL }: { baseURL: string }) => {
  // const [language, setLanguage] = useState<Language>('typescript')
  // const { code, filename } = codeExamples[language]

  // const handleLanguageChange = useCallback((value: string) => {
  //   setLanguage(value as Language)
  // }, [])

  const code = `Please read this skill file:\n${baseURL}openclaw/skill.md\nand follow the instruction there to install it.`

  return (
    <CodeBlock className=' max-w-lg' code={code} language={'md'}>
      <CodeBlockHeader>
        <CodeBlockTitle>
          <FileIcon size={14} />
          <CodeBlockFilename>{`Paste to OpenClaw Chatbox`}</CodeBlockFilename>
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
