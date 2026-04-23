"use client";
import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";
import { useRef, useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "../../../../convex/_generated/dataModel";
import { LoaderIcon } from "lucide-react";

export const DocumentInput = () => {
    const { documentId } = useParams<{ documentId: string }>();
    const document = useQuery(api.documents.getById, { id: documentId as Id<"documents"> });
    const update = useMutation(api.documents.updateById);

    const [title, setTitle] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (document?.title !== undefined) {
            setTitle(document.title);
        }
    }, [document?.title]);

    const isLoading = document === undefined;

    const handleClick = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        }, 0);
    };

    const handleSave = async () => {
        if (!isEditing) return;
        setIsEditing(false);
        const newTitle = title.trim() || "Untitled Document";
        if (newTitle === document?.title) return;

        setIsPending(true);
        setIsError(false);
        try {
            await update({ id: documentId as Id<"documents">, title: newTitle });
        } catch {
            setIsError(true);
            setTitle(document?.title ?? "Untitled Document");
        } finally {
            setIsPending(false);
        }
    };

    const renderIcon = () => {
        if (isLoading || isPending) {
            return <LoaderIcon className="size-4 animate-spin text-muted-foreground" />;
        }
        if (isError) {
            return <BsCloudSlash className="size-4 text-red-500" />;
        }
        return <BsCloudCheck className="size-4" />;
    };

    return (
        <div className="flex items-center gap-2">
            {isEditing ? (
                <input
                    ref={inputRef}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSave();
                        if (e.key === "Escape") {
                            setIsEditing(false);
                            setTitle(document?.title ?? "Untitled Document");
                        }
                    }}
                    className="text-lg px-1.5 truncate bg-transparent border-b border-black/30 focus:outline-none focus:border-black"
                />
            ) : (
                <span
                    onClick={handleClick}
                    className="text-lg px-1.5 cursor-pointer truncate hover:underline"
                >
                    {title || "Untitled Document"}
                </span>
            )}
            {renderIcon()}
        </div>
    );
};
