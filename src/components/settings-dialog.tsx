'use client'

import * as React from 'react'
import {
  Bell,
  Check,
  Globe,
  Home,
  Keyboard,
  Link,
  Lock,
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

const menuItems = [{ name: 'My Lobsters', icon: Bell, value: 'companies' }]

export function SettingsDialog({}: {}) {
  const [open, setOpen] = React.useState(false)
  const [tab, setTab] = React.useState('companies')
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
          {`🦞 My AI Lobsters`}
        </Button>
      </>
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
                        <SidebarMenuButton asChild isActive={item.name === 'Messages & media'}>
                          <a href='#'>
                            <item.icon />
                            <span>{item.name}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className='flex h-[480px] flex-1 flex-col overflow-hidden'>
            <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
              <div className='flex items-center gap-2 px-4'>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className='hidden md:block'>
                      <BreadcrumbLink href='#'>{`AI Agents ✨`}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className='hidden md:block' />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Messages & media</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className='flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0'>
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className='bg-muted/50 aspect-video max-w-3xl rounded-xl' />
              ))}
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}
