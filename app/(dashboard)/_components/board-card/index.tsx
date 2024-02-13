"use client"

import Image from "next/image"
import Link from "next/link"

import { Overlay } from "./overlay"
import { MoreHorizontal } from "lucide-react"
import { formatDistanceToNow } from 'date-fns'
import { useAuth } from "@clerk/nextjs"
import { Footer } from "./footer"
import { Skeleton } from '@/components/ui/skeleton'
import { Actions } from "@/components/board/actions"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"

interface BoardCardProps {
  id: any,
  title: string,
  authorName: string,
  authorId: string,
  createdAt: number,
  imageUrl: string,
  isFav: boolean,
  orgId: string,
}

export const BoardCard = ({ id, title, authorName, authorId, createdAt, imageUrl, isFav, orgId }: BoardCardProps) => {

  const { userId } = useAuth()

  

  const { mutate: fav, pending: pendingFav } = useApiMutation(api.board.favourite)
  const { mutate: unFav, pending: pendingUnFav } = useApiMutation(api.board.unfavourite)

  const authorLabel = userId === authorId ? "You" : authorName
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true })

  const toggleFav = () => {
    if (isFav) {
      unFav({ id }).catch(() => toast.error('Failed to unfav'))
    } else {
      fav({ id, orgId }).catch(() => toast.error('Failed to fav'))
    }
  }

  return (
    <Link href={`/board/${id}`}>
      <div className='group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden'>
        <div className='relative flex-1 bg-amber-50'>
          <Image 
            src={imageUrl}
            alt='doodle'
            fill
            className='object-fit'
          />
          <Overlay />
          <Actions 
            id={id}
            title={title}
            side='right'
          >
           <button className='transition-opacity px-3 py-2 outline-none absolute right-1 top-1 opacity-0 group-hover:opacity-100'><MoreHorizontal className='text-white opacity-75 hover:opacity-100 transition-opacity' /></button>
          </Actions>
        </div>
        <Footer 
          isFav={isFav}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFav}
          disabled={pendingFav || pendingUnFav}
        />
      </div>
    </Link>
  )
}

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className='aspect-[100/127] rounded-lg overflow-hidden'>
      <Skeleton className='h-full w-full' />
    </div>
  )
}