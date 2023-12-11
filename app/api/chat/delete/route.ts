import { adminDb } from "@/firebase-admin"
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    const { chatId } = await req.json();

    const ref = adminDb.collection('chats').doc(chatId);

    const bulkWriter = adminDb.bulkWriter();
    const MAX_RETRT_ATEMPTS = 5;

    bulkWriter.onWriteError((error) => {
        if (error.failedAttempts < MAX_RETRT_ATEMPTS) {
            return true;
        } else {
            console.log("Failed to delete chat", error)
            return false;
        }
    });

    try {
        await adminDb.recursiveDelete(ref, bulkWriter);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (e) {
        console.log("Failed to delete chat", e)
        return NextResponse.json({ success: false }, { status: 500 });
    }
}