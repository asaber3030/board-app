"use client";

import { UserAvatar } from "./user-avatar";
import { useOthers, useSelf } from "@/liveblocks.config";
import { randomColor } from "@/lib/utils";

const MAX_USERS = 7

export const Participants = () => {
  const users = useOthers()
  const currentUser = useSelf()

  const hasMoreUsers = users.length > MAX_USERS

  return (
    <div className="absolute h-12 top-2 right-2 rounded-md p-3 flex items-center shadow-md">
      <div className='flex gap-x-2'>
      {currentUser && (
          <UserAvatar
            borderColor={randomColor(currentUser.connectionId)}
            src={currentUser.info?.picture}
            name={`${currentUser.info?.name} (Me)`}
            fallback={currentUser.info?.name?.[0] || "T"}
          />
        )}
        {users.slice(0, MAX_USERS).map(({ connectionId, info }) => (
          <UserAvatar
            borderColor={randomColor(connectionId)}
            key={connectionId}
            src={info?.picture}
            name={info?.name}
            fallback={info?.name?.[0] || "T"}
          />
        ))}

        {hasMoreUsers && (
          <UserAvatar 
            name={`${users.length - MAX_USERS} more`}
            fallback={`+${users.length - MAX_USERS}`}
          />

        )}

      </div>
    </div>
  )
}

export const ParticipantsSkeleton = () => {
  return (
    <div className='w-[100px] absolute top-2 right-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md' />
  )
}