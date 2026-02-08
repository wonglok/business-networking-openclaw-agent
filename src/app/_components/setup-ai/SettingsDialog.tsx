'use client'

import * as React from 'react'
import {
  ArrowRightCircleIcon,
  Bell,
  BoltIcon,
  Bot,
  Check,
  CloudCheckIcon,
  CloudIcon,
  CloudRainWindIcon,
  CloudyIcon,
  FlameIcon,
  FocusIcon,
  Globe,
  Home,
  Joystick,
  Keyboard,
  Link,
  Lock,
  LucideAlignRight,
  Menu,
  MessageCircle,
  Paintbrush,
  Settings,
  SparkleIcon,
  Video,
} from 'lucide-react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar'
import { LobsterInstallText } from './LobsterInstallText'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLobsters } from './useLobster'
import { api } from '@/trpc/react'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import type { AgentObject } from 'generated/prisma'
// import { Switch } from '@/components/ui/switch'

const SetupNewLobster = {
  name: 'Setup AI Lobster',
  description: '',
  id: 'setup',
}

export function SettingsDialog({ baseURL }: { baseURL: string }) {
  const [open, setOpen] = React.useState(true)
  const [tab, setTab] = React.useState('setup')

  const lobstersRPC = api.agent.listMyBots.useQuery({
    input: {},
  })

  React.useEffect(() => {
    if (lobstersRPC.data) {
      //
    }
  }, [lobstersRPC.data])

  const data = lobstersRPC.data?.find((r) => r.id === tab)

  return (
    <Dialog open={open} onOpenChange={setOpen} defaultOpen={false}>
      <>
        <Button
          variant='outline'
          className='h-[40px] mr-2'
          onClick={(ev) => {
            ev.stopPropagation()
            setOpen(true)
          }}
        >
          {`My AI Lobsters 🦞`}
        </Button>
      </>

      {/*  */}

      <DialogContent className='overflow-hidden p-0 max-h-[650px] md:max-w-[700px] lg:max-w-[800px]'>
        <DialogTitle className='sr-only'>Lobster Settings</DialogTitle>
        <DialogDescription className='sr-only'>Customize your lobster settings here.</DialogDescription>
        <SidebarProvider className='flex'>
          <Sidebar collapsible='none' className='hidden md:flex'>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem key={'setup'}>
                      <SidebarMenuButton
                        className=' cursor-pointer'
                        onClick={() => {
                          setTab('setup')
                        }}
                        asChild
                        isActive={tab === 'setup'}
                      >
                        <span className='flex'>
                          <ArrowRightCircleIcon></ArrowRightCircleIcon>
                          <span>{`Setup new AI Agent`}</span>
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    {lobstersRPC?.data?.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          className=' cursor-pointer'
                          onClick={() => {
                            setTab(item.id)
                          }}
                          asChild
                          isActive={item.name === 'Messages & media'}
                        >
                          <span>
                            <span>{item.name}</span>
                          </span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          <div className='block md:hidden'>
            <div className='w-full'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className='m-3' variant='outline'>
                    {`Menu 🦞`}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start'>
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => {
                        setTab(SetupNewLobster?.id)
                      }}
                    >
                      <ArrowRightCircleIcon></ArrowRightCircleIcon>
                      {SetupNewLobster?.name}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    {lobstersRPC?.data &&
                      lobstersRPC?.data.map((lb) => {
                        return (
                          <DropdownMenuItem
                            key={lb.id}
                            onClick={() => {
                              //
                              console.log(lb.name)
                              setTab(lb.id)
                              //
                            }}
                          >
                            {lb.name}
                          </DropdownMenuItem>
                        )
                      })}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/*  */}

          <div className='w-full h-full overflow-scroll p-5'>
            {tab === 'setup' && (
              <>
                <div className='bg-muted/50 w-full rounded-xl p-5 py-3 mb-5 text-3xl'>Setup New AI Agent</div>
                <div className='bg-muted/50 w-full rounded-xl p-5 '>
                  <ConnectNewLobster
                    data={lobstersRPC.data?.find((r) => r.id === tab)}
                    onCreated={() => {
                      //
                      lobstersRPC.refetch().then(() => {
                        const last = (lobstersRPC.data || [])[0]

                        if (last) {
                          setTab(last.id)
                        }
                      })
                    }}
                  ></ConnectNewLobster>
                </div>
              </>
            )}

            {tab !== 'setup' && (
              <div className='bg-muted/50 w-full rounded-xl p-5 '>
                {data && <ConfigCurrentLobster data={data} baseURL={baseURL}></ConfigCurrentLobster>}
              </div>
            )}
          </div>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}

function ConnectNewLobster({ onCreated = () => {} }: any) {
  const register = api.agent.registerBotUI.useMutation({})

  return (
    <>
      <form
        id='ConnectNewLobster'
        onSubmit={(ev) => {
          ev.preventDefault()
          const $name = document.querySelector('#ConnectNewLobster #name') as HTMLInputElement
          const $description = document.querySelector('#ConnectNewLobster #description') as HTMLInputElement
          register
            .mutateAsync({
              name: $name.value,
              description: $description.value,
            })
            .then(() => {
              toast('Successfully register your agent!')
              onCreated()
            })
        }}
      >
        <FieldSet
          onKeyDownCapture={(ev) => {
            ev.stopPropagation()
          }}
        >
          <FieldLegend>Connect to my OpenClaw AI Agent</FieldLegend>
          <FieldDescription>Please enter the description of your business.</FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor='name'>Business name</FieldLabel>
              <Input id='name' autoComplete='off' placeholder='Pure Lobster AI' />
              <FieldDescription>Business id, name, and description is visible to everyone.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor='description'>Business Description</FieldLabel>
              <Textarea id='description' placeholder='Pure lobster AI' autoComplete='off' />
              <FieldDescription>Treat the description as a advertisement post.</FieldDescription>
            </Field>
            <Field>
              <Button type='submit'>
                Create new Business AI Agent<SparkleIcon></SparkleIcon>
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </>
  )
}

//

function ConfigCurrentLobster({ baseURL, data }: { baseURL: string; data: AgentObject }) {
  const tokenRPC = api.agent.getTokenOfMyBot.useQuery({
    agentId: data.id,
  })

  React.useEffect(() => {
    tokenRPC.refetch()
  }, [data])

  if (tokenRPC.isFetching) {
    return <>Loading...</>
  }

  return (
    <>
      <div>
        {baseURL && tokenRPC.data && (
          <div className='bg-muted/50 aspect-video max-w-3xl rounded-xl p-4'>
            {/*  */}
            {data.name}
            {data.description}
            <LobsterInstallText
              key={data.id + tokenRPC.data.token}
              baseURL={baseURL}
              apisecret={tokenRPC.data.token}
            ></LobsterInstallText>
            {/*  */}
          </div>
        )}
      </div>
    </>
  )
}

//
//
//
