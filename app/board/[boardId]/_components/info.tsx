"use client"

import { api } from "@/convex/_generated/api"
import { cn } from "@/lib/utils"
import { useQuery } from "convex/react"
import { useRenameModal } from "@/store/use-rename-modal"
import { Id } from "@/convex/_generated/dataModel"
import { Button } from "@/components/ui/button"
import { Hint } from "@/components/hint"
import { Actions } from "@/components/board/actions"

import Image from 'next/image'
import Link from 'next/link'
import { Menu } from "lucide-react"

interface InfoProps {
  boardId: string,
}

const TabSeparator = () => {
  return (
    <div className='text-neutral-300 px-1.5'>
      |
    </div>
  )
}

export const Info = ({ boardId }: InfoProps) => {

  const { onOpen } = useRenameModal()

  const data = useQuery(api.board.get, {
    id: boardId as Id<'boards'>
  })

  if (!data) return <InfoSkeleton />

  return (
    <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md'>

      <Hint label='Go to boards!' side='bottom' sideOffset={10}>
        <Button asChild className='px-2 py-3' variant={'board'} size='sm'>
          <Link href='/'>
            <Image src='/logo.png' alt='logo' height={25} width={25} />
            <span className={'font-semibold text-sm ml-2 text-black'}>Board</span>
          </Link>
        </Button>
      </Hint>

      <TabSeparator />

      <Hint label='Edit Board' side='bottom' sideOffset={10}>
        <Button onClick={ () => onOpen(data._id, data.title) } variant='board' className='text-base font-normal px-4'>
          {data.title}
        </Button>
      </Hint>

      <TabSeparator />

      <Actions
        id={data._id}
        title={data.title}
        side={'bottom'}
        sideOffset={10}
      >
        <div>
          <Hint label='Main Menu' side='bottom' sideOffset={10}>
            <Button size='icon' variant='board'>
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
      
    </div>
  )
}

export const InfoSkeleton = () => {
  return (
    <div className='w-[300px] absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md' />
  )
}