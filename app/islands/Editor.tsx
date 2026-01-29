import { useState, useCallback } from "hono/jsx";
import type { Entry } from "../lib/db";

interface EditorProps {
  entry?: Entry;
  onSave: (content: string) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function Editor({
  entry,
  onSave,
  onCancel,
  isLoading = false,
}: EditorProps) {
  const [content, setContent] = useState(entry?.content ?? "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = useCallback(async () => {
    if (!content.trim() || isSaving) return;

    setIsSaving(true);
    try {
      await onSave(content);
    } finally {
      setIsSaving(false);
    }
  }, [content, onSave, isSaving]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Ctrl/Cmd + S to save
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
      // Escape to cancel
      if (e.key === "Escape" && onCancel) {
        onCancel();
      }
    },
    [handleSave, onCancel]
  );

  const isNewEntry = !entry;
  const hasChanges = content !== (entry?.content ?? "");
  const canSave = content.trim().length > 0 && hasChanges && !isSaving;

  return (
    <div class="flex flex-col h-full">
      {/* Editor Header */}
      <div class="flex items-center justify-between px-4 py-3 border-b border-border">
        <h2 class="text-lg font-semibold">
          {isNewEntry ? "New Entry" : "Edit Entry"}
        </h2>
        <div class="flex items-center gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              class="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              disabled={isSaving}
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={!canSave || isLoading}
            class="px-4 py-1.5 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div class="flex-1 p-4">
        <textarea
          value={content}
          onInput={(e) => setContent((e.target as HTMLTextAreaElement).value)}
          onKeyDown={handleKeyDown}
          placeholder="Write about your day..."
          class="w-full h-full min-h-[300px] p-4 text-base leading-relaxed bg-background border border-input rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent placeholder:text-muted-foreground"
          disabled={isLoading || isSaving}
          autoFocus={isNewEntry}
        />
      </div>

      {/* Editor Footer */}
      <div class="flex items-center justify-between px-4 py-2 border-t border-border text-sm text-muted-foreground">
        <span>{content.length} characters</span>
        <span class="text-xs">
          Press <kbd class="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+S</kbd>{" "}
          to save
        </span>
      </div>
    </div>
  );
}
