"use client";

import { useState } from "react";
import { BellIcon, MoreHorizontalIcon, Trash2Icon, MailIcon } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";
import { formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NotificationBell() {
  const notifications = useQuery(api.notifications.getNotifications);
  const markAsRead = useMutation(api.notifications.markAsRead);
  const markAsUnread = useMutation(api.notifications.markAsUnread);
  const deleteNotification = useMutation(api.notifications.deleteNotification);
  const [open, setOpen] = useState(false);
  const [manuallyUnread, setManuallyUnread] = useState<Set<string>>(new Set());

  const isUnread = (n: { _id: string; isRead: boolean }) =>
    !n.isRead || manuallyUnread.has(n._id);

  const unreadCount = notifications?.filter(isUnread).length ?? 0;

  const handleRead = (id: Id<"notifications">) => {
    markAsRead({ id });
    setManuallyUnread((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleMarkUnread = (id: Id<"notifications">) => {
    markAsUnread({ id });
    setManuallyUnread((prev) => new Set([...prev, id]));
  };

  const handleDelete = (id: Id<"notifications">) => {
    deleteNotification({ id });
    setManuallyUnread((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="relative p-1.5 rounded-full hover:bg-muted transition-colors focus:outline-none">
          <BellIcon className="size-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 leading-none">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 p-0 shadow-lg" sideOffset={8}>
        <div className="px-4 py-3 border-b">
          <h3 className="font-semibold text-sm">Notifications</h3>
        </div>

        {!notifications || notifications.length === 0 ? (
          <div className="px-4 py-10 text-center">
            <BellIcon className="size-8 mx-auto mb-2 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">No notifications yet</p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              You&apos;ll be notified when someone mentions you
            </p>
          </div>
        ) : (
          <div className="max-h-[420px] overflow-y-auto">
            {notifications.map((n) => {
              const unread = isUnread(n);
              return (
                <div
                  key={n._id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleRead(n._id)}
                  onKeyDown={(e) => e.key === "Enter" && handleRead(n._id)}
                  className={`group flex items-start gap-3 px-4 py-3 border-b last:border-b-0 cursor-pointer hover:bg-muted/50 transition-colors ${
                    unread ? "bg-blue-50/40" : ""
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative flex-shrink-0 mt-0.5">
                    {n.senderAvatar ? (
                      <img
                        src={n.senderAvatar}
                        alt=""
                        className="size-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="size-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">
                        {n.senderName?.[0]?.toUpperCase() ?? "?"}
                      </div>
                    )}
                    {unread && (
                      <span className="absolute -top-0.5 -right-0.5 size-2.5 bg-blue-500 rounded-full border-2 border-white" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm leading-snug ${unread ? "font-medium" : "text-muted-foreground"}`}>
                      <span className="font-semibold text-foreground">{n.senderName}</span>
                      {" "}mentioned you in{" "}
                      <span className="font-semibold text-foreground">{n.documentTitle}</span>
                    </p>
                    {n.body && (
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{n.body}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(n._creationTime, { addSuffix: true })}
                    </p>
                  </div>

                  {/* Actions */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="flex-shrink-0 p-1 rounded hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontalIcon className="size-4 text-muted-foreground" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkUnread(n._id);
                        }}
                      >
                        <MailIcon className="size-4 mr-2" />
                        Mark as unread
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(n._id);
                        }}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2Icon className="size-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              );
            })}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
