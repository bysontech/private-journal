import { createRoute } from "honox/factory";

export default createRoute((c) => {
  return c.render(
    <div class="min-h-screen bg-background">
      {/* App Header */}
      <header class="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div class="container mx-auto px-4 py-3 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <a href="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
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
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
              <span class="font-semibold">PrivateJournal</span>
            </a>
          </div>
          <div class="flex items-center gap-2">
            <button
              type="button"
              id="theme-toggle"
              class="inline-flex items-center justify-center rounded-md h-9 w-9 hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label="Toggle theme"
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
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main App Content */}
      <main class="container mx-auto px-4 py-6">
        <div id="journal-app" class="max-w-4xl mx-auto">
          {/* Loading State - will be replaced by React hydration */}
          <div class="flex flex-col items-center justify-center py-12">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p class="text-muted-foreground">Loading journal...</p>
          </div>

          {/* No-JS Fallback */}
          <noscript>
            <div class="bg-destructive/10 border border-destructive text-destructive rounded-lg p-4 mt-4">
              <h2 class="font-semibold mb-2">JavaScript Required</h2>
              <p>
                PrivateJournal requires JavaScript to function. Please enable
                JavaScript in your browser settings to use this app.
              </p>
            </div>
          </noscript>
        </div>
      </main>

      {/* Client-side hydration script */}
      <script type="module" src="/app/client.tsx"></script>
    </div>,
    { title: "Journal - PrivateJournal" }
  );
});
