import { Editor } from "./editor"
import { Navbar } from "./navbar";
import { Room } from "./room";
import { Toolbar } from "./toolbar"
import { ConvexHttpClient } from "convex/browser"
import { api } from "../../../../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel"
import type { Metadata } from "next"

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

interface DocumentIdPageProps {
    params: Promise<{ documentId: string }>;
}

export async function generateMetadata({ params }: DocumentIdPageProps): Promise<Metadata> {
    const { documentId } = await params
    const document = await convex.query(api.documents.getById, { id: documentId as Id<"documents"> })
    return {
        title: document?.title ? `${document.title} - Paperly` : "Paperly",
    }
}

const documentIdPage = async ({ params }: DocumentIdPageProps) => {
    const { documentId } = await params
    const document = await convex.query(api.documents.getById, { id: documentId as Id<"documents"> })

    return (
        <Room>
            <div className="min-h-screen bg-[#FAFBFD]">
                <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
                    <Navbar />
                    <Toolbar />
                </div>
                <div className="pt-[114px]">
                    <Editor initialContent={document?.initialContent ?? ""} />
                </div>
            </div>
        </Room>
    )
}

export default documentIdPage
