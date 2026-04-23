"use client";

import { useEffect, useRef } from "react";
import { useThreads } from "@liveblocks/react/suspense";
import { getMentionedIdsFromCommentBody } from "@liveblocks/client";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { getUsers } from "./actions";

function extractBodyText(body: Parameters<typeof getMentionedIdsFromCommentBody>[0]): string {
  return (body.content as Array<{ children?: Array<{ text?: string }> }>)
    .flatMap((block) => block.children ?? [])
    .map((node) => node.text ?? "")
    .join("")
    .trim()
    .slice(0, 150);
}

interface MentionDetectorProps {
  documentTitle: string;
}

export function MentionDetector({ documentTitle }: MentionDetectorProps) {
  const { userId } = useAuth();
  const params = useParams();
  const documentId = params.documentId as string;
  const { threads } = useThreads();
  const createNotification = useMutation(api.notifications.createNotification);

  const usersRef = useRef<Array<{ id: string; name: string; avatar: string }>>([]);
  // Track which comments this session has already dispatched notifications for
  const processedRef = useRef(new Set<string>());

  useEffect(() => {
    getUsers()
      .then((users) => { usersRef.current = users; })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!userId || !threads) return;

    for (const thread of threads) {
      for (const comment of thread.comments) {
        // Only process comments created by the CURRENT user (sender-side detection)
        if (!comment.body || comment.deletedAt) continue;
        if (comment.userId !== userId) continue;
        if (processedRef.current.has(comment.id)) continue;

        const mentionedIds = getMentionedIdsFromCommentBody(comment.body);
        if (mentionedIds.length === 0) continue;

        processedRef.current.add(comment.id);

        const me = usersRef.current.find((u) => u.id === userId);
        const bodyText = extractBodyText(comment.body);

        for (const recipientId of mentionedIds) {
          if (recipientId === userId) continue; // don't notify yourself

          createNotification({
            recipientId,
            senderId: userId,
            senderName: me?.name ?? "Someone",
            senderAvatar: me?.avatar,
            documentId,
            documentTitle,
            body: bodyText,
            commentId: comment.id,
          }).catch((err) => console.error("[MentionDetector] createNotification failed:", err));
        }
      }
    }
  }, [threads, userId, documentId, documentTitle, createNotification]);

  return null;
}
