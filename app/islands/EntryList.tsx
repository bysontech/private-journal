import type { Entry } from "../lib/db";

interface EntryListProps {
  entries: Entry[];
  selectedId?: string;
  onSelect: (entry: Entry) => void;
  onDelete?: (entry: Entry) => void;
  isLoading?: boolean;
}

/**
 * Format a timestamp to a human-readable date string
 */
function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Today
  if (diffDays === 0) {
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Yesterday
  if (diffDays === 1) {
    return "Yesterday";
  }

  // Within the last week
  if (diffDays < 7) {
    return date.toLocaleDateString(undefined, { weekday: "long" });
  }

  // Older
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

/**
 * Get a preview of the entry content (first line or truncated)
 */
function getPreview(content: string, maxLength: number = 100): string {
  const firstLine = content.split("\n")[0].trim();
  if (firstLine.length <= maxLength) return firstLine;
  return firstLine.slice(0, maxLength).trim() + "...";
}

/**
 * Get mood emoji based on sentiment
 */
function getMoodEmoji(mood?: "positive" | "neutral" | "negative"): string {
  switch (mood) {
    case "positive":
      return "😊";
    case "negative":
      return "😔";
    case "neutral":
      return "😐";
    default:
      return "";
  }
}

export default function EntryList({
  entries,
  selectedId,
  onSelect,
  onDelete,
  isLoading = false,
}: EntryListProps) {
  if (isLoading) {
    return (
      <div class="flex items-center justify-center h-full p-8">
        <div class="animate-pulse text-muted-foreground">
          Loading entries...
        </div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div class="flex flex-col items-center justify-center h-full p-8 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-12 w-12 text-muted-foreground/50 mb-4"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
        <h3 class="text-lg font-medium text-muted-foreground mb-2">
          No entries yet
        </h3>
        <p class="text-sm text-muted-foreground/70">
          Start writing your first journal entry
        </p>
      </div>
    );
  }

  return (
    <div class="divide-y divide-border">
      {entries.map((entry) => {
        const isSelected = entry.id === selectedId;
        const preview = getPreview(entry.content);
        const moodEmoji = getMoodEmoji(entry.mood);

        return (
          <div
            key={entry.id}
            onClick={() => onSelect(entry)}
            class={`
              group relative px-4 py-3 cursor-pointer transition-colors
              ${isSelected ? "bg-accent" : "hover:bg-muted/50"}
            `}
          >
            {/* Entry Header */}
            <div class="flex items-center justify-between mb-1">
              <span class="text-sm font-medium text-foreground">
                {formatDate(entry.createdAt)}
              </span>
              <div class="flex items-center gap-2">
                {moodEmoji && (
                  <span class="text-sm" title={entry.mood}>
                    {moodEmoji}
                  </span>
                )}
                {onDelete && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(entry);
                    }}
                    class="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-destructive transition-all"
                    title="Delete entry"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="h-4 w-4"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Entry Preview */}
            <p class="text-sm text-muted-foreground line-clamp-2">
              {preview || "Empty entry"}
            </p>

            {/* Entry Summary (if available) */}
            {entry.summary && (
              <p class="mt-1 text-xs text-muted-foreground/70 italic line-clamp-1">
                {entry.summary}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
