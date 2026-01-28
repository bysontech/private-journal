import { createRoute } from "honox/factory";

export default createRoute((c) => {
  return c.render(
    <div class="flex flex-col min-h-screen">
      {/* Header */}
      <header class="border-b border-border">
        <div class="container mx-auto px-4 py-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
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
          </div>
          <nav class="flex items-center gap-6">
            <a
              href="/pricing"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </a>
            <a
              href="/app"
              class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Open App
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main class="flex-1">
        <section class="container mx-auto px-4 py-24 text-center">
          <h1 class="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            Your thoughts, <span class="text-primary">completely private</span>
          </h1>
          <p class="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A privacy-first journal with local AI analysis. All your data stays
            on your device. No cloud, no tracking, no compromise.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/app"
              class="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-lg font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Start Writing
            </a>
            <a
              href="#features"
              class="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-lg font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Learn More
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" class="border-t border-border bg-muted/50 py-24">
          <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12">
              Privacy by Design
            </h2>
            <div class="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div class="bg-card rounded-lg p-6 border border-border">
                <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-6 w-6 text-primary"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h3 class="font-semibold text-lg mb-2">100% Local Storage</h3>
                <p class="text-muted-foreground">
                  Your journal entries never leave your device. Everything is
                  stored in your browser's IndexedDB.
                </p>
              </div>

              {/* Feature 2 */}
              <div class="bg-card rounded-lg p-6 border border-border">
                <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-6 w-6 text-primary"
                  >
                    <path d="M12 8V4H8" />
                    <rect width="16" height="12" x="4" y="8" rx="2" />
                    <path d="M2 14h2" />
                    <path d="M20 14h2" />
                    <path d="M15 13v2" />
                    <path d="M9 13v2" />
                  </svg>
                </div>
                <h3 class="font-semibold text-lg mb-2">Local AI Analysis</h3>
                <p class="text-muted-foreground">
                  Sentiment analysis and summarization run entirely in your
                  browser using transformers.js. No data sent to external APIs.
                </p>
              </div>

              {/* Feature 3 */}
              <div class="bg-card rounded-lg p-6 border border-border">
                <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-6 w-6 text-primary"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" x2="12" y1="3" y2="15" />
                  </svg>
                </div>
                <h3 class="font-semibold text-lg mb-2">Encrypted Backups</h3>
                <p class="text-muted-foreground">
                  Export your journal with AES-256 encryption. Import on any
                  device with your password.
                </p>
              </div>

              {/* Feature 4 */}
              <div class="bg-card rounded-lg p-6 border border-border">
                <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-6 w-6 text-primary"
                  >
                    <path d="M12 2v8" />
                    <circle cx="12" cy="14" r="4" />
                    <path d="M12 18v4" />
                    <path d="m4.93 10.93 2.83 2.83" />
                    <path d="m16.24 13.76 2.83 2.83" />
                    <path d="m2 18 2.83-2.83" />
                    <path d="m19.17 15.17 2.83-2.83" />
                  </svg>
                </div>
                <h3 class="font-semibold text-lg mb-2">Works Offline</h3>
                <p class="text-muted-foreground">
                  Install as a PWA and write anywhere, anytime. No internet
                  connection required.
                </p>
              </div>

              {/* Feature 5 */}
              <div class="bg-card rounded-lg p-6 border border-border">
                <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-6 w-6 text-primary"
                  >
                    <line x1="12" x2="12" y1="20" y2="10" />
                    <line x1="18" x2="18" y1="20" y2="4" />
                    <line x1="6" x2="6" y1="20" y2="16" />
                  </svg>
                </div>
                <h3 class="font-semibold text-lg mb-2">Mood Tracking</h3>
                <p class="text-muted-foreground">
                  Visualize your emotional trends over time with beautiful
                  charts and insights.
                </p>
              </div>

              {/* Feature 6 */}
              <div class="bg-card rounded-lg p-6 border border-border">
                <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-6 w-6 text-primary"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" x2="8" y1="13" y2="13" />
                    <line x1="16" x2="8" y1="17" y2="17" />
                    <line x1="10" x2="8" y1="9" y2="9" />
                  </svg>
                </div>
                <h3 class="font-semibold text-lg mb-2">PDF Export</h3>
                <p class="text-muted-foreground">
                  Export your entries as beautifully formatted PDF documents for
                  archiving or printing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section class="py-24">
          <div class="container mx-auto px-4 text-center">
            <h2 class="text-3xl font-bold mb-4">
              Start your private journal today
            </h2>
            <p class="text-xl text-muted-foreground mb-8">
              Free to use. No account required.
            </p>
            <a
              href="/app"
              class="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-lg font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Open App
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer class="border-t border-border py-8">
        <div class="container mx-auto px-4">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4">
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
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
              <span class="font-semibold">PrivateJournal</span>
            </div>
            <nav class="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="/privacy" class="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" class="hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </div>,
    { title: "PrivateJournal - Privacy-First Local AI Journal" }
  );
});
