'use client'

import Link from "next/link"
import Image from "next/image"

import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import { OrganizationSwitcher } from '@clerk/nextjs'
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Star } from 'lucide-react'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600']
})

export const OrganizationSidebar = () => {

  return (
    <div className='hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5'>
      <Link href='/'>
        <div className='flex items-center gap-x-4'>
          <Image 
            src='/logo.png'
            alt='Logo'
            height={50}
            width={50}
          />
          <span className={cn('font-semibold text-2xl', font.className)}>Board</span>
        </div>
      </Link>
      <OrganizationSwitcher 
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            },
            organizationSwitcherTrigger: {
              padding: '6px',
              width: '100%',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              justifyContent: 'space-between',
              backgroundColor: 'white'
            }
          }
        }}
      />
      <div className='space-y-1 w-full'>
        <Button 
          asChild 
          variant={'secondary'}
          size='lg' 
          className='font-normal justify-start px-4 w-full'
        >
          <Link href='/'><LayoutDashboard className='h-4 w-4 mr-2' /> Boards</Link>
        </Button>

        <Button 
          asChild 
          variant={'secondary'}
          size='lg' 
          className='font-normal justify-start px-4 w-full'
        >
          <Link href={{ pathname: '/' }}><Star className='h-4 w-4 mr-2' /> Favourites</Link>
        </Button>
      </div>
    </div>
  )
}
