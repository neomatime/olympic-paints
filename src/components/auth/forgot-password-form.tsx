"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthConfirmation, AuthIntro, emailPattern, focusFirstInvalid, useMockSubmit } from "./auth-parts";

export function ForgotPasswordForm() {
  const [error, setError] = useState<string | undefined>();
  const { status, submit, reset } = useMockSubmit();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();
    const next = !email ? "Enter your email address." : !emailPattern.test(email) ? "Enter a valid email address." : undefined;
    setError(next);
    if (next) {
      focusFirstInvalid(form, { email: next }, ["email"]);
      return;
    }
    submit();
  }

  if (status === "done") {
    return (
      <AuthConfirmation>
        <AuthIntro
          eyebrow="Password reset"
          title="Check your email"
          description="If an account exists for this email address, password reset instructions have been sent."
        />
        <div className="mt-10 flex flex-col gap-4">
          <Button href="/login" variant="primary" className="w-full">
            Back to Sign In
          </Button>
          <button
            type="button"
            onClick={reset}
            className="text-sm font-medium text-ink underline underline-offset-4 hover:text-ink/70 self-center"
          >
            Use a different email address
          </button>
        </div>
      </AuthConfirmation>
    );
  }

  return (
    <>
      <AuthIntro
        eyebrow="Your Account"
        title="Reset your password"
        description="Enter the email address you use for your account and we'll send you instructions to reset your password."
      />

      <form className="mt-10 space-y-5" onSubmit={handleSubmit} noValidate>
        <Input
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          error={error}
        />
        <Button type="submit" variant="primary" className="w-full" disabled={status === "submitting"} aria-disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Reset Password"}
        </Button>
      </form>

      <p className="mt-10 pt-8 border-t border-ink/10 text-sm">
        <Link href="/login" className="font-medium text-ink underline underline-offset-4 hover:text-ink/70">
          ← Back to Sign In
        </Link>
      </p>
    </>
  );
}
