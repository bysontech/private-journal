import type { Child } from "hono/jsx";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: Child;
}

interface DialogContentProps {
  children: Child;
  class?: string;
}

interface DialogHeaderProps {
  children: Child;
}

interface DialogFooterProps {
  children: Child;
}

interface DialogTitleProps {
  children: Child;
}

interface DialogDescriptionProps {
  children: Child;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null;

  const handleBackdropClick = (e: Event) => {
    if (e.target === e.currentTarget) {
      onOpenChange(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onOpenChange(false);
    }
  };

  return (
    <div
      class="fixed inset-0 z-50 flex items-center justify-center"
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop */}
      <div
        class="fixed inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in-0"
        onClick={handleBackdropClick}
      />
      {/* Content Container */}
      <div class="relative z-50">{children}</div>
    </div>
  );
}

export function DialogContent({ children, class: className }: DialogContentProps) {
  return (
    <div
      class={`
        relative bg-background rounded-lg shadow-lg border border-border
        w-full max-w-md mx-4 p-6
        animate-in fade-in-0 zoom-in-95
        ${className || ""}
      `}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>
  );
}

export function DialogHeader({ children }: DialogHeaderProps) {
  return <div class="flex flex-col space-y-1.5 mb-4">{children}</div>;
}

export function DialogFooter({ children }: DialogFooterProps) {
  return (
    <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6">
      {children}
    </div>
  );
}

export function DialogTitle({ children }: DialogTitleProps) {
  return (
    <h2 class="text-lg font-semibold leading-none tracking-tight">{children}</h2>
  );
}

export function DialogDescription({ children }: DialogDescriptionProps) {
  return <p class="text-sm text-muted-foreground">{children}</p>;
}
