import { createRoute } from "honox/factory";

export default createRoute((c) => {
  return c.render(
    <div class="flex flex-col min-h-screen">
      {/* Header */}
      <header class="border-b border-border">
        <div class="container mx-auto px-4 py-4 flex items-center justify-between">
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
          <a
            href="/app"
            class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Open App
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main class="flex-1 py-16">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h1 class="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p class="text-xl text-muted-foreground">
              Start free, upgrade when you need more
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div class="bg-card rounded-xl border border-border p-8">
              <h2 class="text-2xl font-bold mb-2">Free</h2>
              <div class="mb-4">
                <span class="text-4xl font-bold">$0</span>
                <span class="text-muted-foreground">/forever</span>
              </div>
              <p class="text-muted-foreground mb-6">
                Perfect for getting started with private journaling.
              </p>
              <ul class="space-y-3 mb-8">
                <li class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-5 w-5 text-green-500"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Up to 50 journal entries</span>
                </li>
                <li class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-5 w-5 text-green-500"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>AI sentiment analysis</span>
                </li>
                <li class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-5 w-5 text-green-500"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Basic search</span>
                </li>
                <li class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-5 w-5 text-green-500"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Offline access (PWA)</span>
                </li>
                <li class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-5 w-5 text-green-500"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>100% local storage</span>
                </li>
              </ul>
              <a
                href="/app"
                class="w-full inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Get Started Free
              </a>
            </div>

            {/* Pro Tier */}
            <div class="bg-card rounded-xl border-2 border-primary p-8 relative">
              <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                Best Value
              </div>
              <h2 class="text-2xl font-bold mb-2">Pro</h2>
              <div class="mb-4">
                <span class="text-4xl font-bold">$9.80</span>
                <span class="text-muted-foreground">/one-time</span>
              </div>
              <p class="text-muted-foreground mb-6">
                Everything in Free, plus advanced features.
              </p>
              <ul class="space-y-3 mb-8">
                <li class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-5 w-5 text-green-500"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>
                    <strong>Unlimited</strong> journal entries
                  </span>
                </li>
                <li class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-5 w-5 text-green-500"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>AI summarization</span>
                </li>
                <li class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-5 w-5 text-green-500"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Encrypted backup export</span>
                </li>
                <li class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-5 w-5 text-green-500"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>PDF export</span>
                </li>
                <li class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-5 w-5 text-green-500"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Advanced analytics dashboard</span>
                </li>
                <li class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-5 w-5 text-green-500"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Priority feature requests</span>
                </li>
              </ul>
              <button
                type="button"
                class="w-full inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Upgrade to Pro
              </button>
            </div>
          </div>

          {/* FAQ Section */}
          <div class="max-w-2xl mx-auto mt-16">
            <h2 class="text-2xl font-bold text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div class="space-y-6">
              <div>
                <h3 class="font-semibold mb-2">
                  Why is there a one-time payment instead of subscription?
                </h3>
                <p class="text-muted-foreground">
                  Since all data is stored locally and we don't operate servers
                  for your data, we don't have recurring costs. A one-time
                  payment is fair for both you and us.
                </p>
              </div>
              <div>
                <h3 class="font-semibold mb-2">
                  What happens if I reach 50 entries on Free?
                </h3>
                <p class="text-muted-foreground">
                  You can still read and edit existing entries. To create new
                  ones, you'll need to either delete some entries or upgrade to
                  Pro.
                </p>
              </div>
              <div>
                <h3 class="font-semibold mb-2">
                  Can I get a refund?
                </h3>
                <p class="text-muted-foreground">
                  Yes, we offer a 30-day money-back guarantee. If you're not
                  satisfied, contact us for a full refund.
                </p>
              </div>
              <div>
                <h3 class="font-semibold mb-2">
                  Is my data really private?
                </h3>
                <p class="text-muted-foreground">
                  Absolutely. All your journal entries are stored in your
                  browser's local storage. We never see or have access to your
                  data. Even AI analysis runs entirely on your device.
                </p>
              </div>
            </div>
          </div>
        </div>
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
    { title: "Pricing - PrivateJournal" }
  );
});
