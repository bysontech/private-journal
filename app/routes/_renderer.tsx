import { jsxRenderer } from "hono/jsx-renderer";
import { Style } from "hono/css";
import { Script } from "honox/server";

declare module "hono" {
  interface ContextRenderer {
    (
      content: string | Promise<string>,
      props?: { title?: string }
    ): Response | Promise<Response>;
  }
}

export default jsxRenderer(({ children, title }) => {
  const isProd = import.meta.env.PROD;

  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Privacy-first journal app with local AI analysis. All your data stays on your device."
        />
        <title>{title ?? "PrivateJournal"}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/pwa-192x192.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        {isProd ? (
          <link rel="stylesheet" href="/static/style.css" />
        ) : (
          <>
            <Script src="/app/client.tsx" async />
            <Style />
          </>
        )}
      </head>
      <body class="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
});
