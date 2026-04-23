import {Liveblocks} from "@liveblocks/node"
import {ConvexHttpClient} from "convex/browser"
import {auth, currentUser, clerkClient} from "@clerk/nextjs/server"
import { api } from "../../../../convex/_generated/api"

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
const liveblocks = new Liveblocks({secret: process.env.LIVEBLOCKS_SECRET_KEY!})

const CURSOR_COLORS = [
    "#E03131", "#2F9E44", "#1971C2", "#F08C00",
    "#7048E8", "#0C8599", "#E64980", "#5C7CFA",
    "#20C997", "#FD7E14", "#A61E4D", "#364FC7",
]

function cursorColor(userId: string): string {
    let hash = 0
    for (let i = 0; i < userId.length; i++) {
        hash = ((hash << 5) - hash) + userId.charCodeAt(i)
        hash = hash | 0
    }
    return CURSOR_COLORS[Math.abs(hash) % CURSOR_COLORS.length]
}

export async function POST(req: Request){
    const{sessionClaims} = await auth()
    if(!sessionClaims) {
        return new Response("Unauthorized",{status:401});
    }

    const user = await currentUser();
    if (!user){
        return new Response("Unauthorized",{status:401});
    }
    const {room} = await req.json()
    const document = await convex.query(api.documents.getById,{id:room})
    if(!document){
        return new Response("Unauthorized",{status:401})
    }
    const isOwner = document.ownerId === user.id

    let isOrganizationMember = false;
    if (document.organizationId) {
        const clerk = await clerkClient();
        const memberships = await clerk.organizations.getOrganizationMembershipList({
            organizationId: document.organizationId,
        });
        isOrganizationMember = memberships.data.some(
            (m) => m.publicUserData?.userId === user.id
        );
    }

    if (!isOwner && !isOrganizationMember){
        return new Response("Unauthorized",{status:401})
    }

    const session = liveblocks.prepareSession(user.id,{
        userInfo:{
            name: user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
            avatar: user.imageUrl,
            color: cursorColor(user.id),
        }
    });
    session.allow(room,session.FULL_ACCESS)
    const {body,status} = await session.authorize();
    return new Response(body,{status})
}