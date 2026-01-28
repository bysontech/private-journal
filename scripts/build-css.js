import { execSync } from "child_process";
import { mkdirSync } from "fs";

// Ensure static directory exists
try {
  mkdirSync("./dist/static", { recursive: true });
} catch {
  // Directory may already exist
}

// Build CSS with Tailwind
execSync(
  "npx tailwindcss -i ./app/global.css -o ./dist/static/style.css --minify",
  { stdio: "inherit" }
);

console.log("CSS built successfully!");
