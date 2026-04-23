"use client"
import { useEditor, EditorContent, ReactRenderer } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import Table from "@tiptap/extension-table"
import TableCell from "@tiptap/extension-table-cell"
import TableHeader from "@tiptap/extension-table-header"
import TableRow from "@tiptap/extension-table-row"
import ImageResize from "tiptap-extension-resize-image"
import { useEditorStore } from "@/store/use-editor-store"
import Underline from "@tiptap/extension-underline"
import FontFamily from "@tiptap/extension-font-family"
import TextStyle from "@tiptap/extension-text-style"
import { Color } from "@tiptap/extension-color"
import Highlight from "@tiptap/extension-highlight"
import Link from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"
import { FontSizeExtension } from "@/extensions/font-size"
import { LineHeightExtension } from "@/extensions/line-height"
import { Ruler } from "./ruler"
import { useLiveblocksExtension } from "@liveblocks/react-tiptap"
import { Threads } from './threads'
import { MentionDetector } from './mention-detector'
import Mention from "@tiptap/extension-mention"
import tippy, { type Instance as TippyInstance } from "tippy.js"
import { MentionList, type MentionListRef, type MentionUser } from "./mention-list"
import { getUsers } from "./actions"
import { useAuth } from "@clerk/nextjs"
import { useRef, useState, useEffect } from "react"

function buildMentionExtension(currentUserIdRef: React.MutableRefObject<string>) {
    return Mention.configure({
        HTMLAttributes: { class: "mention" },
        suggestion: {
            items: async ({ query }: { query: string }) => {
                const users: MentionUser[] = await getUsers();
                return users.filter((u) =>
                    u.id !== currentUserIdRef.current &&
                    u.name.toLowerCase().includes(query.toLowerCase())
                );
            },
            render() {
                let component: ReactRenderer<MentionListRef, React.ComponentProps<typeof MentionList>>;
                let popup: TippyInstance[];

                return {
                    onStart(props) {
                        component = new ReactRenderer(MentionList, {
                            props,
                            editor: props.editor,
                        });
                        popup = tippy("body", {
                            getReferenceClientRect: props.clientRect as () => DOMRect,
                            appendTo: () => document.body,
                            content: component.element,
                            showOnCreate: true,
                            interactive: true,
                            trigger: "manual",
                            placement: "bottom-start",
                        });
                    },
                    onUpdate(props) {
                        component.updateProps(props);
                        popup[0]?.setProps({
                            getReferenceClientRect: props.clientRect as () => DOMRect,
                        });
                    },
                    onKeyDown(props) {
                        if (props.event.key === "Escape") {
                            popup[0]?.hide();
                            return true;
                        }
                        return component.ref?.onKeyDown(props) ?? false;
                    },
                    onExit() {
                        popup[0]?.destroy();
                        component.destroy();
                    },
                };
            },
        },
    });
}

interface EditorProps {
    initialContent: string;
}

export const Editor = ({ initialContent }: EditorProps) => {
    const { userId } = useAuth()
    const currentUserIdRef = useRef<string>(userId ?? "")
    currentUserIdRef.current = userId ?? ""
    const [leftMargin, setLeftMargin] = useState(56)
    const [rightMargin, setRightMargin] = useState(56)
    const liveblocks = useLiveblocksExtension({ initialContent, mentions: false })
    const { setEditor } = useEditorStore()

    const editor = useEditor({
        editorProps: {
            attributes: {
                style: `padding-left:${leftMargin}px; padding-right:${rightMargin}px;`,
                class: "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pb-10 cursor-text"
            },
        },
        extensions: [
            liveblocks,
            StarterKit.configure({ history: false }),
            FontSizeExtension,
            LineHeightExtension.configure({ types: ["heading", "paragraph"], defaultLineHeight: "normal" }),
            FontFamily,
            TextStyle,
            Image,
            ImageResize,  // already includes the base Image extension
            Table,
            TableRow,
            TableCell,
            TableHeader,
            TaskItem.configure({ nested: true }),
            TaskList,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Underline,
            Highlight.configure({ multicolor: true }),
            Color,
            Link.configure({ autolink: true, defaultProtocol: "https" }),
            buildMentionExtension(currentUserIdRef),
        ],
        immediatelyRender: false,
    })

    // Sync editor to store after mount/unmount — runs after render, never during
    useEffect(() => {
        setEditor(editor)
        return () => setEditor(null)
    }, [editor, setEditor])

    // Keep toolbar reactive on editor events (these fire from user actions, outside render)
    useEffect(() => {
        if (!editor) return
        const sync = () => setEditor(editor)
        editor.on("update", sync)
        editor.on("selectionUpdate", sync)
        editor.on("transaction", sync)
        editor.on("focus", sync)
        editor.on("blur", sync)
        return () => {
            editor.off("update", sync)
            editor.off("selectionUpdate", sync)
            editor.off("transaction", sync)
            editor.off("focus", sync)
            editor.off("blur", sync)
        }
    }, [editor, setEditor])

    useEffect(() => {
        editor?.setOptions({
            editorProps: {
                attributes: {
                    style: `padding-left:${leftMargin}px; padding-right:${rightMargin}px;`,
                    class: "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pb-10 cursor-text"
                }
            }
        })
    }, [leftMargin, rightMargin, editor])

    return (
        <div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible">
            <Ruler
                leftMargin={leftMargin}
                rightMargin={rightMargin}
                onLeftMarginChange={setLeftMargin}
                onRightMarginChange={setRightMargin}
            />
            <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
                <MentionDetector documentTitle="Untitled Document" />
                <EditorContent editor={editor} />
                <Threads editor={editor} />
            </div>
        </div>
    )
}
