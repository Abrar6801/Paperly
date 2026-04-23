"use client";

import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import Image from "next/image";

const AVATAR_SIZE = 36;
const MAX_SHOWN = 5;

interface AvatarProps {
    src: string;
    name: string;
}

function Avatar({ src, name }: AvatarProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div
                        style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
                        className="relative -ml-2 inline-block rounded-full border-2 border-white ring-2 ring-[#3b72f6] overflow-hidden flex-shrink-0"
                    >
                        <Image
                            src={src}
                            alt={name}
                            fill
                            className="object-cover"
                            referrerPolicy="no-referrer"
                            unoptimized
                        />
                    </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                    {name}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export function Avatars() {
    const others = useOthers();
    const self = useSelf();

    const all = Array.from(
        new Map(
            [
                ...(self ? [{ id: self.id, info: self.info }] : []),
                ...others.map((o) => ({ id: o.id, info: o.info })),
            ]
                .filter((u) => u.info?.avatar && u.info?.name)
                .map((u) => [u.id, u])
        ).values()
    );

    const shown = all.slice(0, MAX_SHOWN);
    const overflow = all.length - shown.length;

    if (all.length === 0) return null;

    return (
        <div className="flex items-center ml-2">
            <div className="flex items-center">
                {shown.map((user) => (
                    <Avatar key={user.id} src={user.info.avatar} name={user.info.name} />
                ))}
                {overflow > 0 && (
                    <div
                        style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
                        className="-ml-2 inline-flex items-center justify-center rounded-full border-2 border-white bg-gray-200 text-xs font-medium text-gray-600 flex-shrink-0"
                    >
                        +{overflow}
                    </div>
                )}
            </div>
        </div>
    );
}
