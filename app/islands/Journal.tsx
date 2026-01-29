import { useState, useEffect, useCallback } from "hono/jsx";
import type { Entry } from "../lib/db";
import {
  listEntries,
  saveEntry,
  deleteEntry as deleteEntryFromDb,
  createNewEntry,
  updateEntry,
  searchEntries,
} from "../lib/db";
import Editor from "./Editor";
import EntryList from "./EntryList";
import SearchBar from "./SearchBar";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

type View = "list" | "edit" | "new";

export default function Journal() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<Entry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<Entry | undefined>();
  const [view, setView] = useState<View>("list");
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<Entry | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Mobile sidebar state
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Load entries on mount
  useEffect(() => {
    loadEntries();
  }, []);

  // Update filtered entries when entries or search query changes
  useEffect(() => {
    if (searchQuery.trim()) {
      handleSearch(searchQuery);
    } else {
      setFilteredEntries(entries);
    }
  }, [entries]);

  const loadEntries = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const loadedEntries = await listEntries();
      setEntries(loadedEntries);
      setFilteredEntries(loadedEntries);
    } catch (err) {
      console.error("Failed to load entries:", err);
      setError("Failed to load entries. Please refresh the page.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setFilteredEntries(entries);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchEntries(query);
      setFilteredEntries(results);
    } catch (err) {
      console.error("Search failed:", err);
      // Fall back to client-side filtering
      const lowerQuery = query.toLowerCase();
      setFilteredEntries(
        entries.filter(
          (e) =>
            e.content.toLowerCase().includes(lowerQuery) ||
            e.summary?.toLowerCase().includes(lowerQuery)
        )
      );
    } finally {
      setIsSearching(false);
    }
  }, [entries]);

  const handleNewEntry = useCallback(() => {
    setSelectedEntry(undefined);
    setView("new");
    setShowMobileSidebar(false);
  }, []);

  const handleSelectEntry = useCallback((entry: Entry) => {
    setSelectedEntry(entry);
    setView("edit");
    setShowMobileSidebar(false);
  }, []);

  const handleSave = useCallback(
    async (content: string) => {
      try {
        if (view === "new") {
          const newEntry = createNewEntry(content);
          await saveEntry(newEntry);
          setEntries((prev) => [newEntry, ...prev]);
          setSelectedEntry(newEntry);
          setView("edit");
        } else if (selectedEntry) {
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

  const handleDeleteRequest = useCallback((entry: Entry) => {
    setEntryToDelete(entry);
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (!entryToDelete) return;

    setIsDeleting(true);
    try {
      await deleteEntryFromDb(entryToDelete.id);
      setEntries((prev) => prev.filter((e) => e.id !== entryToDelete.id));
      if (selectedEntry?.id === entryToDelete.id) {
        setSelectedEntry(undefined);
        setView("list");
      }
      setDeleteDialogOpen(false);
      setEntryToDelete(null);
    } catch (err) {
      console.error("Failed to delete entry:", err);
      setError("Failed to delete entry. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }, [entryToDelete, selectedEntry]);

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

  const hasEntries = entries.length > 0;
  const hasFilteredEntries = filteredEntries.length > 0;
  const isSearchActive = searchQuery.trim().length > 0;

  return (
    <div class="flex flex-col h-screen bg-background">
      {/* Header */}
      <header class="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div class="flex items-center gap-2">
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setShowMobileSidebar(!showMobileSidebar)}
            class="md:hidden p-2 -ml-2 hover:bg-accent rounded-md transition-colors"
            aria-label="Toggle sidebar"
          >
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
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>

          <a href="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-5 w-5 sm:h-6 sm:w-6"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
            <span class="font-bold text-lg sm:text-xl hidden sm:inline">PrivateJournal</span>
          </a>
        </div>

        <button
          type="button"
          onClick={handleNewEntry}
          class="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
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
          <span class="hidden sm:inline">New Entry</span>
          <span class="sm:hidden">New</span>
        </button>
      </header>

      {/* Main Content */}
      <div class="flex flex-1 overflow-hidden">
        {/* Sidebar - Entry List (Desktop) */}
        <aside class="w-72 lg:w-80 border-r border-border overflow-hidden flex-col hidden md:flex">
          {/* Search Bar */}
          <div class="p-3 border-b border-border">
            <SearchBar
              onSearch={handleSearch}
              resultCount={isSearchActive ? filteredEntries.length : undefined}
              isSearching={isSearching}
            />
          </div>

          {/* Entry List */}
          <div class="flex-1 overflow-y-auto">
            {!hasEntries && !isLoading ? (
              <EmptyState type="no-entries" onNewEntry={handleNewEntry} />
            ) : isSearchActive && !hasFilteredEntries ? (
              <EmptyState type="no-results" searchQuery={searchQuery} />
            ) : (
              <EntryList
                entries={filteredEntries}
                selectedId={selectedEntry?.id}
                onSelect={handleSelectEntry}
                onDelete={handleDeleteRequest}
                isLoading={isLoading}
              />
            )}
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {showMobileSidebar && (
          <div class="md:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div
              class="fixed inset-0 bg-black/50"
              onClick={() => setShowMobileSidebar(false)}
            />

            {/* Sidebar */}
            <aside class="relative w-72 max-w-[80vw] bg-background border-r border-border flex flex-col animate-in slide-in-from-left">
              {/* Search Bar */}
              <div class="p-3 border-b border-border">
                <SearchBar
                  onSearch={handleSearch}
                  resultCount={isSearchActive ? filteredEntries.length : undefined}
                  isSearching={isSearching}
                />
              </div>

              {/* Entry List */}
              <div class="flex-1 overflow-y-auto">
                {!hasEntries && !isLoading ? (
                  <EmptyState type="no-entries" onNewEntry={handleNewEntry} />
                ) : isSearchActive && !hasFilteredEntries ? (
                  <EmptyState type="no-results" searchQuery={searchQuery} />
                ) : (
                  <EntryList
                    entries={filteredEntries}
                    selectedId={selectedEntry?.id}
                    onSelect={handleSelectEntry}
                    onDelete={handleDeleteRequest}
                    isLoading={isLoading}
                  />
                )}
              </div>
            </aside>
          </div>
        )}

        {/* Main Panel */}
        <main class="flex-1 overflow-y-auto">
          {view === "list" && !selectedEntry && (
            <MainEmptyState
              hasEntries={hasEntries}
              onNewEntry={handleNewEntry}
            />
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
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />

      {/* Error Toast */}
      {error && (
        <div class="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 max-w-md p-4 bg-destructive text-destructive-foreground rounded-lg shadow-lg animate-in slide-in-from-bottom z-50">
          <div class="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-5 w-5 flex-shrink-0"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
            <span class="text-sm">{error}</span>
            <button
              type="button"
              onClick={() => setError(null)}
              class="ml-auto p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Dismiss"
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
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Empty state for sidebar
function EmptyState({
  type,
  searchQuery,
  onNewEntry,
}: {
  type: "no-entries" | "no-results";
  searchQuery?: string;
  onNewEntry?: () => void;
}) {
  if (type === "no-results") {
    return (
      <div class="flex flex-col items-center justify-center p-6 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-10 w-10 text-muted-foreground/40 mb-3"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
          <path d="M8 8h6" />
        </svg>
        <p class="text-sm font-medium text-muted-foreground mb-1">
          No results found
        </p>
        <p class="text-xs text-muted-foreground/70">
          No entries match "{searchQuery}"
        </p>
      </div>
    );
  }

  return (
    <div class="flex flex-col items-center justify-center p-6 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-10 w-10 text-muted-foreground/40 mb-3"
      >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
      <p class="text-sm font-medium text-muted-foreground mb-1">
        No entries yet
      </p>
      <p class="text-xs text-muted-foreground/70 mb-3">
        Start writing your journal
      </p>
      {onNewEntry && (
        <button
          type="button"
          onClick={onNewEntry}
          class="text-xs text-primary hover:underline"
        >
          Create your first entry
        </button>
      )}
    </div>
  );
}

// Main panel empty state
function MainEmptyState({
  hasEntries,
  onNewEntry,
}: {
  hasEntries: boolean;
  onNewEntry: () => void;
}) {
  return (
    <div class="flex flex-col items-center justify-center h-full p-6 sm:p-8 text-center">
      <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4 sm:mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground/50"
        >
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          <path d="m15 5 4 4" />
        </svg>
      </div>

      <h2 class="text-lg sm:text-xl font-semibold text-foreground mb-2">
        {hasEntries ? "Select an entry" : "Start your journal"}
      </h2>

      <p class="text-sm text-muted-foreground max-w-sm mb-6">
        {hasEntries
          ? "Choose an entry from the sidebar to view or edit, or create a new one."
          : "Your private journal awaits. All entries are stored locally on this device and never leave your browser."}
      </p>

      <button
        type="button"
        onClick={onNewEntry}
        class="flex items-center gap-2 px-5 sm:px-6 py-2.5 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all shadow-sm"
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
        {hasEntries ? "New Entry" : "Write your first entry"}
      </button>

      {/* Privacy note */}
      <div class="mt-8 flex items-center gap-2 text-xs text-muted-foreground/60">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-3.5 w-3.5"
        >
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span>100% private • Stored locally • No cloud sync</span>
      </div>
    </div>
  );
}
