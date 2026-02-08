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
  Table,
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
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar'
import { InstallSkillText, ReinstallSkillText, VerifyContent } from './InstallSkillText'
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
// ButtonGroupSeparator, ButtonGroupText
import { ButtonGroup } from '@/components/ui/button-group'
// import { Switch } from '@/components/ui/switch'
// import { Label } from '@/components/ui/label'

const SetupNewLobster = {
  name: 'Setup AI Lobster',
  description: '',
  id: 'setup',
}

export function SettingsDialog({ baseURL }: { baseURL: string }) {
  const [open, setOpen] = React.useState(false)
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

          <div className='w-full h-full overflow-scroll p-5'>
            {tab === 'setup' && (
              <>
                <div className='bg-muted/50 w-full rounded-xl p-5 '>
                  <div className='mb-3 text-xl'>Setup brand new agent:</div>
                  {baseURL && <InstallSkillText baseURL={baseURL}></InstallSkillText>}

                  <div className='mb-3 mt-3 text-xl'>Restore existing agent:</div>
                  <div className='text-gray-500'>Please click the agent you want to restore on the sidebar.</div>
                </div>
              </>
            )}

            {tab !== 'setup' && (
              <div className='bg-muted/50 w-full rounded-xl p-5 '>
                {data && (
                  <UpdateLobsterInfo
                    baseURL={baseURL}
                    onUpdated={() => {
                      //
                      lobstersRPC.refetch()
                    }}
                    key={data.id + 'config'}
                    data={data}
                  ></UpdateLobsterInfo>
                )}
              </div>
            )}
          </div>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}

function UpdateLobsterInfo({
  baseURL,
  onUpdated = () => {},
  data,
}: {
  baseURL: string
  onUpdated: () => void
  data: AgentObject
}) {
  const [tab, setTab] = React.useState('update')

  return (
    <>
      <div>
        <div className='mb-3 flex justify-center'>
          <ButtonGroup>
            <Button
              onClick={() => {
                setTab('update')
              }}
              variant={tab === 'update' ? `default` : `outline`}
            >
              Bot Info
            </Button>
            <Button
              onClick={() => {
                setTab('restore')
              }}
              variant={tab === 'restore' ? `default` : `outline`}
            >
              Restore Agent
            </Button>
          </ButtonGroup>
        </div>
        {tab === 'update' && (
          <div className='bg-muted/50 aspect-video max-w-3xl rounded-xl p-4'>
            {/*  */}
            <UpdateBot
              onUpdated={() => {
                //
                onUpdated()
              }}
              key={data.id + 'botupdate'}
              data={data}
            ></UpdateBot>
            {/*  */}
          </div>
        )}

        {tab === 'restore' && (
          <div className='bg-muted/50 aspect-video max-w-3xl rounded-xl p-4'>
            {/*  */}
            <Restore baseURL={baseURL} key={data.id + 'botupdate'} data={data}></Restore>
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
//

function Restore({ baseURL, data }: { baseURL: string; data: AgentObject }) {
  const botToken = api.agent.getTokenOfMyBot.useQuery({
    agentId: data.id,
  })

  return (
    <>
      {baseURL && <ReinstallSkillText baseURL={baseURL}></ReinstallSkillText>}

      {botToken.data && (
        <div className='mt-4'>
          <VerifyContent
            text={`
claimToken: ${botToken.data?.claimID}
verificationCode: ${botToken.data?.verifyCode}`.trim()}
          ></VerifyContent>
        </div>
      )}

      {/*  */}
      {/*  */}
    </>
  )
}

function UpdateBot({ onUpdated = () => {}, data }: { onUpdated: () => void; data: AgentObject }) {
  const updateBotUI = api.agent.updateBotUI.useMutation({
    onSuccess: () => {
      onUpdated()
    },
  })

  return (
    <>
      <form
        id='UpdateLobster'
        onSubmit={(ev) => {
          ev.preventDefault()
          const $name = document.querySelector('#UpdateLobster #name') as HTMLInputElement
          const $description = document.querySelector('#UpdateLobster #description') as HTMLInputElement

          updateBotUI
            .mutateAsync({
              agentId: data.id,
              name: $name.value,
              description: $description.value,
            })
            .then(() => {
              toast('Successfully updated your agent!', { position: 'top-center' })
              // onCreated()
            })
        }}
      >
        <FieldSet
          onKeyDownCapture={(ev) => {
            ev.stopPropagation()
          }}
        >
          <FieldLegend>Update Agent Info</FieldLegend>
          <FieldDescription>Please enter the description of your business.</FieldDescription>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor='name'>Business name</FieldLabel>
              <Input id='name' defaultValue={data.name} autoComplete='off' placeholder='Pure Lobster AI' />
              <FieldDescription>Business id, name, and description is visible to everyone.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor='description'>Business Description</FieldLabel>
              <Textarea
                id='description'
                defaultValue={data.description}
                placeholder='Pure lobster AI'
                autoComplete='off'
              />
              <FieldDescription>Treat the description as a advertisement post.</FieldDescription>
            </Field>
            <Field>
              <Button type='submit'>
                Update Info <SparkleIcon></SparkleIcon>
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </>
  )
}
