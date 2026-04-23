import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getNotifications = query({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError("Unauthorized");

    return await ctx.db
      .query("notifications")
      .withIndex("by_recipient", (q) => q.eq("recipientId", user.subject))
      .order("desc")
      .collect();
  },
});


export const createNotification = mutation({
  args: {
    recipientId: v.string(),
    senderId: v.string(),
    senderName: v.string(),
    senderAvatar: v.optional(v.string()),
    documentId: v.string(),
    documentTitle: v.string(),
    body: v.string(),
    commentId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError("Unauthorized");

    const existing = await ctx.db
      .query("notifications")
      .withIndex("by_comment_recipient", (q) =>
        q.eq("commentId", args.commentId).eq("recipientId", args.recipientId)
      )
      .first();

    if (existing) return existing._id;

    return await ctx.db.insert("notifications", {
      ...args,
      isRead: false,
    });
  },
});

export const markAsRead = mutation({
  args: { id: v.id("notifications") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError("Unauthorized");

    const notification = await ctx.db.get(args.id);
    if (!notification || notification.recipientId !== user.subject) {
      throw new ConvexError("Unauthorized");
    }

    return await ctx.db.patch(args.id, { isRead: true });
  },
});

export const markAsUnread = mutation({
  args: { id: v.id("notifications") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError("Unauthorized");

    const notification = await ctx.db.get(args.id);
    if (!notification || notification.recipientId !== user.subject) {
      throw new ConvexError("Unauthorized");
    }

    return await ctx.db.patch(args.id, { isRead: false });
  },
});

export const deleteNotification = mutation({
  args: { id: v.id("notifications") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError("Unauthorized");

    const notification = await ctx.db.get(args.id);
    if (!notification || notification.recipientId !== user.subject) {
      throw new ConvexError("Unauthorized");
    }

    return await ctx.db.delete(args.id);
  },
});

export const markAllAsRead = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError("Unauthorized");

    const unread = await ctx.db
      .query("notifications")
      .withIndex("by_recipient", (q) => q.eq("recipientId", user.subject))
      .filter((q) => q.eq(q.field("isRead"), false))
      .collect();

    await Promise.all(unread.map((n) => ctx.db.patch(n._id, { isRead: true })));
  },
});
