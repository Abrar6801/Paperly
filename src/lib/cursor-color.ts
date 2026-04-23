const CURSOR_COLORS = [
    "#E03131", "#2F9E44", "#1971C2", "#F08C00",
    "#7048E8", "#0C8599", "#E64980", "#5C7CFA",
    "#20C997", "#FD7E14", "#A61E4D", "#364FC7",
]

export function cursorColor(userId: string): string {
    let hash = 0
    for (let i = 0; i < userId.length; i++) {
        hash = ((hash << 5) - hash) + userId.charCodeAt(i)
        hash = hash | 0
    }
    return CURSOR_COLORS[Math.abs(hash) % CURSOR_COLORS.length]
}
