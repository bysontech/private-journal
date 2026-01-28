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
            <h1>Terms of Service</h1>
            <p class="lead">
              Last updated: January 2026
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using PrivateJournal ("the Service"), you agree to
              be bound by these Terms of Service. If you do not agree to these
              terms, please do not use the Service.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              PrivateJournal is a privacy-first journaling application that
              stores all data locally in your browser. The Service includes:
            </p>
            <ul>
              <li>Journal entry creation and management</li>
              <li>Local AI-powered sentiment analysis and summarization</li>
              <li>Data export and import functionality</li>
              <li>Offline access through Progressive Web App technology</li>
            </ul>

            <h2>3. User Responsibilities</h2>
            <h3>3.1 Data Management</h3>
            <p>
              You are solely responsible for:
            </p>
            <ul>
              <li>Managing and backing up your journal entries</li>
              <li>Maintaining access to your device</li>
              <li>Keeping your export passwords secure</li>
              <li>Any data loss due to browser data clearing or device loss</li>
            </ul>

            <h3>3.2 Acceptable Use</h3>
            <p>
              You agree not to use the Service to:
            </p>
            <ul>
              <li>Store illegal content</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Attempt to reverse engineer or modify the application</li>
              <li>Distribute the application without authorization</li>
            </ul>

            <h2>4. Intellectual Property</h2>
            <h3>4.1 Our Content</h3>
            <p>
              The Service, including its design, code, and features, is owned by
              PrivateJournal and is protected by copyright and other
              intellectual property laws.
            </p>

            <h3>4.2 Your Content</h3>
            <p>
              You retain full ownership of all journal entries and content you
              create. Since your data is stored locally, we have no access to or
              rights over your content.
            </p>

            <h2>5. Pro Features</h2>
            <h3>5.1 Purchase</h3>
            <p>
              Pro features are available for a one-time payment. Upon purchase,
              you will receive a license key that unlocks Pro features.
            </p>

            <h3>5.2 Refunds</h3>
            <p>
              We offer a 30-day money-back guarantee. Contact us within 30 days
              of purchase for a full refund if you are not satisfied.
            </p>

            <h3>5.3 License</h3>
            <p>
              Your Pro license is for personal use and may be used on multiple
              devices that you own. The license is non-transferable.
            </p>

            <h2>6. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND,
              EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT:
            </p>
            <ul>
              <li>The Service will be uninterrupted or error-free</li>
              <li>Data will never be lost or corrupted</li>
              <li>AI features will be accurate or reliable</li>
              <li>The Service will meet your specific requirements</li>
            </ul>

            <h2>7. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, PRIVATEJOURNAL SHALL NOT
              BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
              PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF DATA,
              REGARDLESS OF THE CAUSE OF ACTION.
            </p>

            <h2>8. Data Loss</h2>
            <p>
              Because all data is stored locally in your browser:
            </p>
            <ul>
              <li>
                We cannot recover lost data under any circumstances
              </li>
              <li>
                Clearing browser data will permanently delete your entries
              </li>
              <li>
                We strongly recommend regular encrypted backups
              </li>
            </ul>

            <h2>9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes
              will be posted on this page with an updated date. Continued use of
              the Service after changes constitutes acceptance of the new terms.
            </p>

            <h2>10. Termination</h2>
            <p>
              You may stop using the Service at any time. Since your data is
              stored locally, simply deleting your browser data or uninstalling
              the PWA will remove all traces of the Service.
            </p>

            <h2>11. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with
              the laws of the jurisdiction in which PrivateJournal operates,
              without regard to its conflict of law provisions.
            </p>

            <h2>12. Contact</h2>
            <p>
              For questions about these Terms of Service, please contact us at
              legal@privatejournal.app.
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
              <a href="/privacy" class="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" class="text-foreground">
                Terms of Service
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </div>,
    { title: "Terms of Service - PrivateJournal" }
  );
});
