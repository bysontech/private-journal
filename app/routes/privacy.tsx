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
          <article class="prose prose-slate dark:prose-invert max-w-3xl mx-auto">
            <h1>Privacy Policy</h1>
            <p class="lead">
              Last updated: January 2026
            </p>

            <h2>Our Commitment to Privacy</h2>
            <p>
              PrivateJournal is built with privacy as its core principle. Unlike
              traditional journaling apps, we don't collect, store, or have
              access to your personal journal entries. Everything stays on your
              device.
            </p>

            <h2>Data Storage</h2>
            <h3>Local Storage Only</h3>
            <p>
              All your journal entries, settings, and preferences are stored
              locally in your browser using IndexedDB. This data never leaves
              your device unless you explicitly export it.
            </p>

            <h3>No Cloud Sync</h3>
            <p>
              We do not offer cloud synchronization. This is a deliberate design
              choice to ensure your private thoughts remain private. Your data
              exists only on the device where you created it.
            </p>

            <h2>AI Processing</h2>
            <h3>Local AI Only</h3>
            <p>
              Sentiment analysis and text summarization are performed entirely
              on your device using transformers.js. Your journal content is
              never sent to external AI services or APIs.
            </p>

            <h3>Model Downloads</h3>
            <p>
              AI models are downloaded from a CDN (jsdelivr.net) when you first
              use AI features. Only the model files are downloaded - your journal
              content is never uploaded.
            </p>

            <h2>Data We Collect</h2>
            <h3>What We Don't Collect</h3>
            <ul>
              <li>Journal entries or content</li>
              <li>Personal information</li>
              <li>Usage analytics</li>
              <li>Location data</li>
              <li>Device identifiers</li>
            </ul>

            <h3>What We May Collect</h3>
            <ul>
              <li>
                <strong>Hosting analytics:</strong> Basic page view counts from
                Cloudflare Pages (anonymized, no personal data)
              </li>
              <li>
                <strong>Error reports:</strong> If you choose to report a bug,
                we may collect technical information about the error
              </li>
            </ul>

            <h2>Third-Party Services</h2>
            <h3>Cloudflare Pages</h3>
            <p>
              Our website is hosted on Cloudflare Pages. Cloudflare may collect
              basic analytics data. See{" "}
              <a
                href="https://www.cloudflare.com/privacypolicy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cloudflare's Privacy Policy
              </a>
              .
            </p>

            <h3>Payment Processing</h3>
            <p>
              If you purchase Pro features, payment is processed by Stripe. We
              do not store your payment information. See{" "}
              <a
                href="https://stripe.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Stripe's Privacy Policy
              </a>
              .
            </p>

            <h2>Data Export and Deletion</h2>
            <h3>Export</h3>
            <p>
              You can export all your journal entries at any time using the
              Export feature. Pro users can create encrypted backups protected
              with a password you choose.
            </p>

            <h3>Deletion</h3>
            <p>
              You have complete control over your data. You can delete
              individual entries or clear all data from your browser at any
              time. Since data is stored locally, we cannot delete it for you -
              you have full control.
            </p>

            <h2>Security</h2>
            <ul>
              <li>All data is stored in your browser's secure IndexedDB</li>
              <li>Export files can be encrypted with AES-256-GCM</li>
              <li>No server-side storage means no server-side breaches</li>
              <li>Content sanitization prevents XSS attacks</li>
            </ul>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will
              notify you of any changes by posting the new policy on this page
              and updating the "Last updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at privacy@privatejournal.app.
            </p>
          </article>
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
              <a href="/privacy" class="text-foreground">
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
    { title: "Privacy Policy - PrivateJournal" }
  );
});
