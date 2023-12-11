"use client";

import React, { Dispatch, SetStateAction } from 'react'
import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from './ui/use-toast';

interface ShareLinkProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    chatId: string;
}

function ShareLink({ isOpen, setIsOpen, chatId }: ShareLinkProps) {
    const { toast } = useToast();
    const host = window.location.host;

    const linkToChat =
        process.env.NODE_ENV === "development" ?
            `http://${host}/chat/${chatId}` :
            `https://${host}/chat/${chatId}`;


    async function copyLink() {
        try {
            await navigator.clipboard.writeText(linkToChat);
            toast({
                title: "Copied to clipboard",
                description: "Anyone who has this link will be able to view this.",
                className: "bg-green-500 text-white",
            });
        } catch (error) {
            console.error("Failed to copy: ", error);
        }

    };
    return (
        <Dialog
            onOpenChange={(open) => setIsOpen(open)}
            open={isOpen}
            defaultOpen={isOpen}
        >
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Copy className="mr-2">Share Link</Copy>
                    Share Link
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            defaultValue={linkToChat}
                            readOnly
                        />
                    </div>
                    <Button type="submit" onClick={() => copyLink()} size="sm" className="px-3">
                        <span className="sr-only">Copy</span>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ShareLink