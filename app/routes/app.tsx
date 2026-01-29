import { createRoute } from "honox/factory";
import Journal from "../islands/Journal";

export default createRoute((c) => {
  return c.render(
    <div class="min-h-screen bg-background">
      {/* Journal App (Island - hydrated on client) */}
      <Journal />

      {/* No-JS Fallback */}
      <noscript>
        <div class="fixed inset-0 flex items-center justify-center bg-background">
          <div class="max-w-md p-6 bg-destructive/10 border border-destructive text-destructive rounded-lg">
            <h2 class="font-semibold mb-2">JavaScript Required</h2>
            <p>
              PrivateJournal requires JavaScript to function. Please enable
              JavaScript in your browser settings to use this app.
            </p>
          </div>
        </div>
      </noscript>
    </div>,
    { title: "Journal - PrivateJournal" }
  );
});
