'use client'

import { useApiMutation } from '@/hooks/use-api-mutation';
import { api } from '@/convex/_generated/api';
import { Button } from "@/components/ui/button";
import { useOrganization } from '@clerk/nextjs'
import { toast } from "sonner";

import Image from "next/image";
import { useRouter } from 'next/navigation';

interface EmptyStateProps {
  title: string,
  paragraph?: string,
  includeButton?: boolean
}

export const EmptyState = ({ includeButton, title, paragraph }: EmptyStateProps) => {

  const { organization } = useOrganization()
  const { mutate, pending } = useApiMutation(api.board.create)

  const router = useRouter()

  const onClick = () => {
    if (!organization) return
    mutate({
      orgId: organization.id,
      title: 'Untitled',
    })
      .then((id) => {
        toast.success('Board Created')
        router.push(`/board/${id}`)
      })
      .catch(() => toast.error('Failed to create new board'))
  }

  return (
    <div className='flex flex-col justify-center items-center h-full'>
      <Image 
        alt='Empty'
        src='/empty.svg'
        height={140}
        width={140}
      />
      <h2 className='text-2xl font-semibold mt-6'>{title}</h2>
      {paragraph && (
        <p className='text-muted-foreground text-sm mt-2'>{paragraph}</p>
      )}
      {includeButton && (
        <Button disabled={pending} onClick={onClick} className='mt-4' size='lg'>Create board</Button>
      )}
    </div>
  )
}