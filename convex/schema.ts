import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    initialContent: v.optional(v.string()),
    ownerId: v.string(),
    roomId: v.optional(v.string()),
    organizationId: v.optional(v.string()),
  })
  .index("by_owner__id",["ownerId"])
  .index("by_organization_id",["organizationId"])
  .searchIndex("search_title",{
    searchField: "title",
    filterFields: ["ownerId","organizationId"]
  }),

  notifications: defineTable({
    recipientId: v.string(),
    senderId: v.string(),
    senderName: v.string(),
    senderAvatar: v.optional(v.string()),
    documentId: v.string(),
    documentTitle: v.string(),
    body: v.string(),
    commentId: v.string(),
    isRead: v.boolean(),
  })
  .index("by_recipient", ["recipientId"])
  .index("by_comment_recipient", ["commentId", "recipientId"]),
});