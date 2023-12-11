
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { Button } from "./ui/button"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

export function ChatPermisionError() {
    return (
        <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex">
                <p className="flex-1">
                    You don&apos;t have access to this chat
                    <br />
                    <span className="font-bold">
                        Please ask admin to add you to this chat
                    </span>
                </p>

                <Link href="/chat" replace>
                    <Button variant="destructive">Dismiss</Button>
                </Link>
            </AlertDescription>
        </Alert>
    )
}
