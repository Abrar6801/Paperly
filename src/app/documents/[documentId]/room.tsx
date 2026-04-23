"use client"

import {ReactNode, useEffect, useMemo, useState} from "react"
import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense"
import { useParams } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import {FullScreenLoader} from "@/components/ui/fullscreen-loader"
import { toast } from "sonner"
import { getUsers, getDocumentInfos } from "./actions"
import { cursorColor } from "@/lib/cursor-color"

type User = {id:string; name:string; avatar:string}

export function Room({children}:{children: ReactNode}){
    const params = useParams()
    const { userId } = useAuth()
    const [users,setUsers] = useState<User[]>([])

    const fetchUsers = useMemo(
        ()=>async()=>{
            try{
                const list = await getUsers();
                setUsers(list)
            }catch{
                toast.error("Failed to fetch users")
            }
        },
        [],
    )

    useEffect(()=>{
        fetchUsers()
    },[fetchUsers])
    return(
        <LiveblocksProvider 
        throttle={16}
        authEndpoint="/api/liveblocks-auth"
        resolveUsers={({userIds})=>{
            return userIds.map((userId) => {
                const user = users.find((u) => u.id === userId);
                if (!user) return undefined;
                return { name: user.name, avatar: user.avatar, color: cursorColor(userId) };
            });
        }}
        resolveMentionSuggestions={({text})=>{
            const filtered = users.filter((u) => {
                if (u.id === userId) return false;
                return !text || u.name.toLowerCase().includes(text.toLowerCase());
            });
            return filtered.map((u) => u.id);
        }}
        resolveRoomsInfo={async ({ roomIds }) => {
            const infos = await getDocumentInfos(roomIds)
            return roomIds.map((id) => {
                const info = infos.find((i) => i.id === id)
                return info ? { name: info.name } : undefined
            })
        }}>
            <RoomProvider id={params.documentId as string}>
                <ClientSideSuspense fallback={<FullScreenLoader/>}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    )
}