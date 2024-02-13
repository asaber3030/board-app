"use client"

import { Button } from "@/components/ui/button";
import { EmptyState } from "./empty-state";
import { BoardCard } from "./board-card";

import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { NewBoardButton } from "./new-board-button";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favs?: string
  }
}

export const BoardList = ({ orgId, query }: BoardListProps) => {

  const data = useQuery(api.boards.get, { 
    orgId, 
    ...query
  });

  if (data === undefined) {
    return (
      <div>
        <h2 className='text-3xl'>{query.favs && 'Favourties '} Boards</h2>

        <div className='grid grid-cols sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10'>
          <NewBoardButton orgId={orgId} disabled />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>

      </div>
    )
  }

  if (!data?.length && query.search) {
    return (
      <EmptyState 
        title="No Results with this search!"
        paragraph="Try searching for something else."
      />
    )
  }

  if (!data?.length && query.favs) {
    return (
      <EmptyState 
        title="No favourites found in current selected organizations"
      />
    )
  }

  if (!data?.length) {
    return (
      <EmptyState 
        title="No Boards found!"
        includeButton
      />
    )
  }

  return (
    <div>
      <h2 className='text-3xl'>{query.favs && 'Favourties '} Boards</h2>

      <div className='grid grid-cols sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10'>
        <NewBoardButton orgId={orgId} />
        {data?.map(board => (
          <BoardCard 
            key={board._id}
            id={board._id}
            title={board.title}
            authorName={board.authorName}
            authorId={board.authorId}
            createdAt={board._creationTime}
            imageUrl={board.imageUrl}
            orgId={board.orgId}
            isFav={board.isFav}
          />
        ))}
      </div>
    </div>
  )
}