"use client"

//@ts-ignore
import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { Link2, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useApiMutation } from '@/hooks/use-api-mutation'
import { api } from '@/convex/_generated/api';
import { ConfirmModal } from '@/components/confirm-modal'
import { Button } from '../ui/button';
import { useRenameModal } from '@/store/use-rename-modal';

interface ActionsProps {
  children: React.ReactNode;
  id: string;
  title: string;
  sideOffset?: DropdownMenuContentProps['sideOffset'];
  side?: DropdownMenuContentProps['side'];
}

export const Actions = ({ children, id, title, sideOffset, side }: ActionsProps) => {

  const { mutate, pending } = useApiMutation(api.board.remove)

  const { onOpen } = useRenameModal()

  const onDelete = () => {
    mutate({ id })
      .then(() => toast.success('Board Deleted!'))
      .catch(() => toast.error('Failed to delete!'))
  }

  const onCopyLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/board/${id}`
    ).then(() => toast.success('Link copied!'))
     .catch(() => toast.error('Failed to copy :('))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        sideOffset={sideOffset}
        className='w-60'
        onClick={ (e: any) => e.stopPropagation() }
      >
        <DropdownMenuItem onClick={onCopyLink} className='cursor-pointer p-3'>
          <Link2 className='h-4 w-4 mr-2' />
          Copy board Link
        </DropdownMenuItem>

        <DropdownMenuItem onClick={ () => onOpen(id, title) } className='cursor-pointer p-3'>
          <Pencil className='h-4 w-4 mr-2' />
          Rename
        </DropdownMenuItem>

        <ConfirmModal
          header='Delete Board'
          description='This will delete the board with its content'
          disabled={pending}
          onConfirm={onDelete}
        >
          <Button variant='ghost' className='justify-start text-sm w-full font-normal cursor-pointer p-3'>
            <Trash2 className='h-4 w-4 mr-2' />
            Delete
          </Button>
        </ConfirmModal>

      </DropdownMenuContent>
    </DropdownMenu>
  )

}