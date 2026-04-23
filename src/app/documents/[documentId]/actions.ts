"use server"

import {auth, currentUser, clerkClient} from "@clerk/nextjs/server"
import { ConvexHttpClient } from "convex/browser"
import { api } from "../../../../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel"

const convexHttp = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export async function getUsers(){
    const {sessionClaims} = await auth();
    const clerk = await clerkClient();

    const orgId = sessionClaims?.org_id as string | undefined;

    if (orgId) {
        const response = await clerk.users.getUserList({
            organizationId: [orgId],
        });
        return response.data.map((user) => ({
            id: user.id,
            name: user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
            avatar: user.imageUrl,
        }));
    }

    // Personal account — return all app users so @mention works across accounts
    const response = await clerk.users.getUserList({ limit: 100 });
    return response.data.map((user) => ({
        id: user.id,
        name: user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
        avatar: user.imageUrl,
    }));
}

export async function getDocumentInfos(roomIds: string[]) {
    const results = await Promise.allSettled(
        roomIds.map((id) =>
            convexHttp.query(api.documents.getById, { id: id as Id<"documents"> })
        )
    )
    return roomIds.map((id, i) => {
        const result = results[i]
        return {
            id,
            name:
                result.status === "fulfilled" && result.value
                    ? result.value.title
                    : "Untitled Document",
        }
    })
}