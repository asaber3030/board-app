"use client"

import { useRenameModal } from '@/store/use-rename-modal'
import { FormEventHandler, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'

import { 
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogHeader,
  DialogClose
} from '@/components/ui/dialog'

export const RenameModal = () => {

  const { mutate, pending } = useApiMutation(api.board.update)
  const { isOpen, onClose, initialValues } = useRenameModal()
  const [title, setTitle] = useState(initialValues.title)

  useEffect(() => {
    setTitle(initialValues.title)
  }, [initialValues.title])

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    mutate({
      id: initialValues.id,
      title
    }).then(() => {
      toast.success('Updated!')
      onClose()
    })
      .catch(() => toast.error('Failed to update'))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        
        <DialogHeader>
          <DialogTitle>Edit Board Title</DialogTitle>
        </DialogHeader>

        <DialogDescription>Enter new title for selected board</DialogDescription>

        <form className='space-y-4' onSubmit={onSubmit}>
          <Input 
            required
            disabled={pending}
            maxLength={60}
            value={title}
            onChange={ e => setTitle(e.target.value) }
            placeholder='New Board Title'
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type='button' variant='outline'>
                Cancel
              </Button>
            </DialogClose>
            <Button type='submit' disabled={pending}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}