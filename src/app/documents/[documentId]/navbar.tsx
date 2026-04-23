"use client";
import Link  from "next/link"
import Image from "next/image"
import { DocumentInput } from "./document-input"
import {Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar"
import { BoldIcon, FileIcon, FileJsonIcon, FilePenIcon, FilePlusIcon, FileTextIcon, GlobeIcon, ItalicIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, StrikethroughIcon, TextIcon, TrashIcon, UnderlineIcon, Undo2Icon } from "lucide-react"
import { BsFilePdf } from "react-icons/bs"
import { useEditorStore } from "@/store/use-editor-store";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Avatars } from "./avatars";
import { NotificationBell } from "./notification-bell";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { RenameDialog } from "@/components/rename-dialog";
import { RemoveDialog } from "@/components/remove-dialog";
import { toast } from "sonner";

export const Navbar = () =>{
    const {editor} = useEditorStore()
    const router = useRouter()
    const { documentId } = useParams<{ documentId: string }>()
    const doc = useQuery(api.documents.getById, { id: documentId as Id<"documents"> })
    const create = useMutation(api.documents.create)

    const onNewDocument = () => {
        create({ title: "Untitled Document", initialContent: "" })
            .catch(() => toast.error("Something went wrong"))
            .then((id) => {
                toast.success("Document created");
                router.push(`/documents/${id}`);
            })
    }
    const insertTable = ({rows,cols} : {rows:number,cols:number})=>{
        editor?.chain().focus().insertTable({rows,cols,withHeaderRow: false}).run()
    };

    const onDownload = (blob: Blob, filename: string) =>{
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a")
        a.href = url;
        a.download = filename;
        a.click();
    }

    const onSaveJSON = () =>{
        if (!editor) return;
        const content = editor.getJSON()
        const blob = new Blob([JSON.stringify(content)],{
            type: "application/json",
        })
        onDownload(blob, `document.json`)
    }

    const onSaveHTML = () =>{
        if (!editor) return;
        const content = editor.getHTML()
        const blob = new Blob([content],{
            type: "text/html",
        })
        onDownload(blob, `document.html`)
    }

    const onSaveText = () =>{
        if (!editor) return;
        const content = editor.getText()
        const blob = new Blob([content],{
            type: "text/plain",
        })
        onDownload(blob, `document.txt`)
    }

    return(
        <nav className = "flex items-center justify-between">
            <div className = "flex gap-2 items-center">
                <Link href="/">
                    <Image src="/logo.svg" alt="logo" width={36} height={36} style={{ height: "auto" }}/>
                </Link>
                <div className = "flex flex-col">
                    <DocumentInput/>
                    <div className="flex">
                        <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                                    File
                                </MenubarTrigger>
                                <MenubarContent className="print:hidden">
                                    <MenubarSub>
                                        <MenubarSubTrigger>
                                            <FileIcon className="size-4 mr-2"/>
                                            Save
                                        </MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem onClick = {onSaveJSON}>
                                                <FileJsonIcon className="size-4 mr-2"/>
                                                JSON
                                            </MenubarItem>
                                            <MenubarItem onClick = {onSaveHTML}>
                                                <GlobeIcon className="size-4 mr-2"/>
                                                HTML
                                            </MenubarItem>
                                            <MenubarItem onClick={() => window.print()}>
                                                <BsFilePdf className="size-4 mr-2"/>
                                                PDF
                                            </MenubarItem>
                                            <MenubarItem onClick = {onSaveText}>
                                                <FileTextIcon className="size-4 mr-2"/>
                                                Text
                                            </MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                    <MenubarSeparator/>
                                    <MenubarItem onClick={onNewDocument}>
                                        <FilePlusIcon className="size-4 mr-2"/>
                                        New Document
                                    </MenubarItem>
                                    <MenubarSeparator/>
                                    <RenameDialog
                                        documentId={documentId as Id<"documents">}
                                        initialTitle={doc?.title ?? "Untitled Document"}
                                    >
                                        <MenubarItem onSelect={(e) => e.preventDefault()}>
                                            <FilePenIcon className="size-4 mr-2"/>
                                            Rename
                                        </MenubarItem>
                                    </RenameDialog>
                                    <MenubarSeparator/>
                                    <RemoveDialog
                                        documentId={documentId as Id<"documents">}
                                        onSuccess={() => router.push("/")}
                                    >
                                        <MenubarItem onSelect={(e) => e.preventDefault()}>
                                            <TrashIcon className="size-4 mr-2"/>
                                            Remove
                                        </MenubarItem>
                                    </RemoveDialog>
                                    <MenubarSeparator/>
                                    <MenubarItem  onClick={() => window.print()}>
                                    <PrinterIcon className="size-4 mr-2"/>
                                                Print
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                                    Edit
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem onClick = {() => editor?.chain().focus().undo().run()}>
                                        <Undo2Icon className="size-4 mr-2"/>
                                        Undo
                                    </MenubarItem>
                                    <MenubarItem onClick = {() => editor?.chain().focus().redo().run()}>
                                        <Redo2Icon className="size-4 mr-2"/>
                                        Redo
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                                    Insert
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarSub>
                                        <MenubarSubTrigger>Table</MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem onClick={() => insertTable({rows:1,cols:1})}>
                                                1 X 1
                                            </MenubarItem>
                                            <MenubarItem onClick={() => insertTable({rows:2,cols:2})}>
                                                2 X 2
                                            </MenubarItem>
                                            <MenubarItem onClick={() => insertTable({rows:3,cols:3})}>
                                                3 X 3
                                            </MenubarItem>
                                            <MenubarItem onClick={() => insertTable({rows:4,cols:4})}>
                                                4 X 4
                                            </MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                                    Format
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarSub>
                                        <MenubarSub>
                                            <MenubarSubTrigger>
                                                <TextIcon className="size-4 mr-2"/>
                                                Text
                                            </MenubarSubTrigger>
                                            <MenubarSubContent>
                                                <MenubarItem onClick = {() => editor?.chain().focus().toggleBold().run()}>
                                                    <BoldIcon className="size-4 me-2"/>
                                                    Bold
                                                </MenubarItem>
                                                <MenubarItem onClick = {() => editor?.chain().focus().toggleItalic().run()}>
                                                    <ItalicIcon className="size-4 me-2"/>
                                                    Italic
                                                </MenubarItem>
                                                <MenubarItem onClick = {() => editor?.chain().focus().toggleUnderline().run()}>
                                                    <UnderlineIcon className="size-4 me-2"/>
                                                    Underline
                                                </MenubarItem>
                                                <MenubarItem onClick = {() => editor?.chain().focus().toggleStrike().run()}>
                                                    <StrikethroughIcon className="size-4 me-2"/>
                                                    Strikethrough
                                                </MenubarItem>
                                            </MenubarSubContent>
                                            <MenubarItem onClick = {() => editor?.chain().focus().unsetAllMarks().run()}>
                                                <RemoveFormattingIcon className="size-4 mr-2"/>
                                                Clear formatting
                                            </MenubarItem>
                                        </MenubarSub>
                                    </MenubarSub>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>

                    </div>
                </div>
            </div>
            <div className="flex gap-3 items-center pl-6">
                <Avatars/>
                <NotificationBell/>
                <OrganizationSwitcher
                    afterCreateOrganizationUrl="/"
                    afterLeaveOrganizationUrl="/"
                    afterSelectOrganizationUrl="/"
                    afterSelectPersonalUrl='/'
                />
                <UserButton/>
            </div>
        </nav>
    )
}