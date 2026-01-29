import { useState, useEffect, useRef } from "hono/jsx";

interface SearchBarProps {
  onSearch: (query: string) => void;
  resultCount?: number;
  isSearching?: boolean;
  placeholder?: string;
}

export default function SearchBar({
  onSearch,
  resultCount,
  isSearching = false,
  placeholder = "Search entries...",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Debounce search input
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      onSearch(query);
    }, 200);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery("");
    onSearch("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    // Escape to clear
    if (e.key === "Escape") {
      handleClear();
    }
  };

  const hasQuery = query.length > 0;

  return (
    <div class="relative">
      {/* Search Input */}
      <div
        class={`
          flex items-center gap-2 px-3 py-2 border rounded-lg transition-all
          ${isFocused ? "border-ring ring-2 ring-ring/20" : "border-input"}
          ${isSearching ? "bg-muted/50" : "bg-background"}
        `}
      >
        {/* Search Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class={`h-4 w-4 flex-shrink-0 transition-colors ${
            isFocused ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          class="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          aria-label="Search entries"
        />

        {/* Loading Spinner */}
        {isSearching && (
          <div class="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
        )}

        {/* Clear Button */}
        {hasQuery && !isSearching && (
          <button
            type="button"
            onClick={handleClear}
            class="p-0.5 rounded hover:bg-muted transition-colors"
            aria-label="Clear search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-4 w-4 text-muted-foreground hover:text-foreground"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Result Count */}
      {hasQuery && resultCount !== undefined && (
        <div class="absolute left-0 right-0 mt-1 text-xs text-muted-foreground px-1">
          {resultCount === 0 ? (
            <span>No entries found</span>
          ) : (
            <span>
              {resultCount} {resultCount === 1 ? "entry" : "entries"} found
            </span>
          )}
        </div>
      )}
    </div>
  );
}
