import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-paper px-6 py-24 text-center">
      <p className="text-sm font-semibold tracking-[0.2em] text-olympic-yellow uppercase">
        404
      </p>
      <h1 className="font-serif text-4xl text-ink sm:text-5xl">
        This page has lost its colour.
      </h1>
      <p className="max-w-md text-base text-muted">
        We couldn&apos;t find the page you were looking for. It may have been
        moved, renamed, or never existed.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-sm bg-olympic-yellow px-7 py-3.5 text-sm font-semibold tracking-wide text-espresso uppercase transition-colors hover:bg-yellow-deep"
      >
        Back to Home
      </Link>
    </div>
  );
}
