"use client"

import React, { useState } from 'react'
import { useToast } from './ui/use-toast';
import useAdminId from '@/hooks/useAdminId';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from './ui/button';
import { DialogHeader } from './ui/dialog';
interface DeleteChatButtonProps {
  chatId: string;
}

function DeleteChatButton({ chatId }: DeleteChatButtonProps) {
  async function handleDelete() {
    toast({
      title: "Deleting chat...",
      description: "This chat is deleting...",
    });

    await fetch(`/api/chat/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatId: chatId }),
    }).then((res) => {
      toast({
        title: "Chat deleted",
        description: "This chat has been deleted.",
        className: "bg-green-500 text-white",
      });
      router.replace("/chat");
    }).finally(() => setOpen(false));
  }

  const { toast } = useToast();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const adminId = useAdminId({ chatId });
  const router = useRouter();

  return (
    session?.user.id === adminId && (
      <Dialog
        open={open}
        onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive">Delete Chat</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This will delete the chat and all messages in it. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 space-x-2">
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  )

}

export default DeleteChatButton