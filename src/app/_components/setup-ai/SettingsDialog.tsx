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
import { Button } from '@/components/ui/button'
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
import { LobsterInit, LobsterInstallText } from './LobsterInstallText'

const menuItems = [
  //
  {
    name: 'Connect to your Lobster',
    icon: ArrowRightCircleIcon,
    value: 'setup',
    ui: ({ baseURL = '' }: any) => <div>{baseURL && <LobsterInit baseURL={baseURL}></LobsterInit>}</div>,
  },
  //
  {
    name: 'My AI Lobsters',
    icon: Bot,
    value: 'lobsters',
    ui: ({ baseURL = '' }: any) => <div>123</div>,
  },
  //
]

export function SettingsDialog(props: any) {
  const [open, setOpen] = React.useState(false)
  const [tab, setTab] = React.useState(menuItems[0]?.value)
  const currentMenu = menuItems.find((r) => r.value === tab)

  React.useEffect(() => {
    if (!currentMenu) {
      setTab(menuItems[0]?.value)
    }
  }, [currentMenu])
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
        <SidebarProvider className='items-start'>
          <Sidebar collapsible='none' className='hidden md:flex'>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuItems.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          onClick={() => {
                            setTab(item.value)
                          }}
                          asChild
                          isActive={item.value === tab}
                        >
                          <span>
                            <item.icon />
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

          {/*  */}

          {currentMenu && (
            <main className='flex h-[480px] flex-1 flex-col overflow-hidden'>
              <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
                <div className='flex items-center gap-2 px-4'>
                  <Breadcrumb>
                    <BreadcrumbList>
                      {/* <BreadcrumbItem className='hidden md:block'>
                        <BreadcrumbLink href='#'>{`Settings`}</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className='hidden md:block' /> */}
                      <BreadcrumbItem>
                        <BreadcrumbPage>
                          <span className='flex items-center'>
                            <currentMenu.icon className='mr-2' />
                            <span>{currentMenu.name}</span>
                          </span>
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </header>
              <div className='flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0'>
                <div>
                  <div className='bg-muted/50 aspect-video max-w-3xl rounded-xl p-4'>
                    {currentMenu?.ui && <currentMenu.ui {...props}></currentMenu.ui>}
                  </div>
                </div>
              </div>
            </main>
          )}
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}
