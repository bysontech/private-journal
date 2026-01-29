import { useState, useEffect, useCallback } from "hono/jsx";
import type { Entry } from "../lib/db";
import {
  listEntries,
  saveEntry,
  deleteEntry,
  createNewEntry,
  updateEntry,
} from "../lib/db";
import Editor from "./Editor";
import EntryList from "./EntryList";

type View = "list" | "edit" | "new";

export default function Journal() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<Entry | undefined>();
  const [view, setView] = useState<View>("list");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load entries on mount
  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const loadedEntries = await listEntries();
      setEntries(loadedEntries);
    } catch (err) {
      console.error("Failed to load entries:", err);
      setError("Failed to load entries. Please refresh the page.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleNewEntry = useCallback(() => {
    setSelectedEntry(undefined);
    setView("new");
  }, []);

  const handleSelectEntry = useCallback((entry: Entry) => {
    setSelectedEntry(entry);
    setView("edit");
  }, []);

  const handleSave = useCallback(
    async (content: string) => {
      try {
        if (view === "new") {
          // Create new entry
          const newEntry = createNewEntry(content);
          await saveEntry(newEntry);
          setEntries((prev) => [newEntry, ...prev]);
          setSelectedEntry(newEntry);
          setView("edit");
        } else if (selectedEntry) {
          // Update existing entry
          const updated = await updateEntry(selectedEntry.id, { content });
          if (updated) {
            setEntries((prev) =>
              prev.map((e) => (e.id === updated.id ? updated : e))
            );
            setSelectedEntry(updated);
          }
        }
      } catch (err) {
        console.error("Failed to save entry:", err);
        setError("Failed to save entry. Please try again.");
      }
    },
    [view, selectedEntry]
  );

  const handleDelete = useCallback(
    async (entry: Entry) => {
      if (!confirm("Are you sure you want to delete this entry?")) return;

      try {
        await deleteEntry(entry.id);
        setEntries((prev) => prev.filter((e) => e.id !== entry.id));
        if (selectedEntry?.id === entry.id) {
          setSelectedEntry(undefined);
          setView("list");
        }
      } catch (err) {
        console.error("Failed to delete entry:", err);
        setError("Failed to delete entry. Please try again.");
      }
    },
    [selectedEntry]
  );

  const handleCancel = useCallback(() => {
    setView("list");
    setSelectedEntry(undefined);
  }, []);

  // Show error toast
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div class="flex flex-col h-screen bg-background">
      {/* Header */}
      <header class="flex items-center justify-between px-4 py-3 border-b border-border">
        <div class="flex items-center gap-2">
          <a href="/" class="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-6 w-6"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
            <span class="font-bold text-xl">PrivateJournal</span>
          </a>
        </div>
        <button
          type="button"
          onClick={handleNewEntry}
          class="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
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
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
          New Entry
        </button>
      </header>

      {/* Main Content */}
      <div class="flex flex-1 overflow-hidden">
        {/* Sidebar - Entry List */}
        <aside class="w-80 border-r border-border overflow-y-auto hidden md:block">
          <EntryList
            entries={entries}
            selectedId={selectedEntry?.id}
            onSelect={handleSelectEntry}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        </aside>

        {/* Main Panel */}
        <main class="flex-1 overflow-y-auto">
          {view === "list" && !selectedEntry && (
            <div class="flex flex-col items-center justify-center h-full p-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-16 w-16 text-muted-foreground/30 mb-4"
              >
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                <path d="m15 5 4 4" />
              </svg>
              <h2 class="text-xl font-semibold text-muted-foreground mb-2">
                Select an entry or create a new one
              </h2>
              <p class="text-sm text-muted-foreground/70 mb-6">
                Your journal entries are stored locally on this device
              </p>
              <button
                type="button"
                onClick={handleNewEntry}
                class="flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
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
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
                Write your first entry
              </button>
            </div>
          )}

          {(view === "new" || view === "edit") && (
            <Editor
              entry={view === "edit" ? selectedEntry : undefined}
              onSave={handleSave}
              onCancel={handleCancel}
              isLoading={isLoading}
            />
          )}
        </main>

        {/* Mobile Entry List (shown as overlay) */}
        <div class="md:hidden fixed inset-0 bg-background z-50 hidden">
          <EntryList
            entries={entries}
            selectedId={selectedEntry?.id}
            onSelect={handleSelectEntry}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Error Toast */}
      {error && (
        <div class="fixed bottom-4 right-4 max-w-md p-4 bg-destructive text-destructive-foreground rounded-lg shadow-lg animate-in slide-in-from-bottom">
          <div class="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-5 w-5"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}
    </div>
  );
}
