import { get, set, del, keys } from "idb-keyval";

export interface Entry {
  id: string;
  content: string; // Markdown text
  mood?: "positive" | "neutral" | "negative";
  moodScore?: number; // 0-1 confidence
  summary?: string; // AI-generated summary
  createdAt: number; // Unix timestamp
  updatedAt: number; // Unix timestamp
}

/**
 * Generate a unique ID for new entries
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

/**
 * Save an entry to IndexedDB
 * Falls back to localStorage if IndexedDB fails
 */
export async function saveEntry(entry: Entry): Promise<void> {
  try {
    await set(`entry:${entry.id}`, entry);
  } catch (error) {
    console.error("Failed to save entry:", error);
    // Fallback to localStorage if IndexedDB fails
    localStorage.setItem(`entry:${entry.id}`, JSON.stringify(entry));
    throw new Error("Storage failed. Please check browser settings.");
  }
}

/**
 * Get a single entry by ID
 */
export async function getEntry(id: string): Promise<Entry | undefined> {
  try {
    return await get(`entry:${id}`);
  } catch (error) {
    console.error("Failed to get entry:", error);
    // Fallback to localStorage
    const stored = localStorage.getItem(`entry:${id}`);
    return stored ? JSON.parse(stored) : undefined;
  }
}

/**
 * List all entries, sorted by creation date (newest first)
 * Optionally limit the number of results
 */
export async function listEntries(limit?: number): Promise<Entry[]> {
  try {
    const allKeys = await keys();
    const entryKeys = allKeys.filter(
      (k) => typeof k === "string" && k.startsWith("entry:")
    );

    const entries = await Promise.all(
      entryKeys.map((key) => get(key as string))
    );

    const sorted = entries
      .filter((e): e is Entry => e !== undefined)
      .sort((a, b) => b.createdAt - a.createdAt);

    return limit ? sorted.slice(0, limit) : sorted;
  } catch (error) {
    console.error("Failed to list entries:", error);
    // Fallback: try to get entries from localStorage
    const localEntries: Entry[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("entry:")) {
        try {
          const entry = JSON.parse(localStorage.getItem(key) || "");
          if (entry) localEntries.push(entry);
        } catch {
          // Skip invalid entries
        }
      }
    }
    return localEntries.sort((a, b) => b.createdAt - a.createdAt);
  }
}

/**
 * Delete an entry by ID
 */
export async function deleteEntry(id: string): Promise<void> {
  try {
    await del(`entry:${id}`);
    localStorage.removeItem(`entry:${id}`); // Clean fallback too
  } catch (error) {
    console.error("Failed to delete entry:", error);
    throw error;
  }
}

/**
 * Search entries by content or summary
 */
export async function searchEntries(query: string): Promise<Entry[]> {
  const allEntries = await listEntries();
  const lowerQuery = query.toLowerCase();

  return allEntries.filter(
    (entry) =>
      entry.content.toLowerCase().includes(lowerQuery) ||
      entry.summary?.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get entries count (for free tier limit checking)
 */
export async function getEntriesCount(): Promise<number> {
  const entries = await listEntries();
  return entries.length;
}

/**
 * Get entries within a date range (for analytics)
 */
export async function getEntriesByDateRange(
  startDate: number,
  endDate: number
): Promise<Entry[]> {
  const entries = await listEntries();
  return entries.filter(
    (entry) => entry.createdAt >= startDate && entry.createdAt <= endDate
  );
}

/**
 * Create a new entry with default values
 */
export function createNewEntry(content: string = ""): Entry {
  const now = Date.now();
  return {
    id: generateId(),
    content,
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Update an existing entry
 */
export async function updateEntry(
  id: string,
  updates: Partial<Omit<Entry, "id" | "createdAt">>
): Promise<Entry | undefined> {
  const entry = await getEntry(id);
  if (!entry) return undefined;

  const updatedEntry: Entry = {
    ...entry,
    ...updates,
    updatedAt: Date.now(),
  };

  await saveEntry(updatedEntry);
  return updatedEntry;
}
