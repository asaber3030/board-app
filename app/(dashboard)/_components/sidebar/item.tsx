'use client'

import Image from "next/image"
import { Hint } from "@/components/hint"

import {
  useOrganization,
  useOrganizationList
} from '@clerk/nextjs'

import { cn } from '@/lib/utils'

interface ItemProps {
  id: string,
  name: string,
  imageURL: string
}

export const Item = ({ id, name, imageURL }: ItemProps) => {

  const { organization } = useOrganization()
  const { setActive } = useOrganizationList()

  const isActive = organization?.id === id

  const onClick = () => {
    if (!setActive) return
    setActive({
      organization: id
    })
  }

  return (
    <div className='aspect-square relative'>
      <Hint label={name} side='right' align='start' sideOffset={18}>
        <Image
          fill        
          src={imageURL} 
          alt={name}
          onClick={onClick}
          className={cn(
            'rounded-md cursor-pointer opacity-50 hover:opacity-100 transition',
            isActive && 'opacity-100'
          )}
        />
      </Hint>
    </div>
  )
}