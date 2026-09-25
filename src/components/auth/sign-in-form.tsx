"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "./password-input";
import {
  AuthConfirmation,
  AuthIntro,
  Checkbox,
  MyAccountPreview,
  emailPattern,
  focusFirstInvalid,
  useMockSubmit,
} from "./auth-parts";

type Errors = { email?: string; password?: string };

export function SignInForm() {
  const [errors, setErrors] = useState<Errors>({});
  const { status, submit } = useMockSubmit();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    const next: Errors = {};
    if (!email) next.email = "Enter your email address.";
    else if (!emailPattern.test(email)) next.email = "Enter a valid email address.";
    if (!password) next.password = "Enter your password.";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      focusFirstInvalid(form, next, ["email", "password"]);
      return;
    }
    submit();
  }

  if (status === "done") {
    return (
      <AuthConfirmation>
        <AuthIntro eyebrow="Signed in" title="Welcome back" description="You're signed in to your Olympic Paints account." />
        <div className="mt-10 flex flex-col gap-3">
          <Button href="/products" variant="primary" className="w-full">
            Continue Shopping
          </Button>
          <MyAccountPreview />
        </div>
      </AuthConfirmation>
    );
  }

  return (
    <>
      <AuthIntro eyebrow="Your Account" title="Welcome back" description="Sign in to access your Olympic Paints account." />

      <form className="mt-10 space-y-5" onSubmit={handleSubmit} noValidate>
        <Input
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          error={errors.email}
        />
        <PasswordInput label="Password" name="password" autoComplete="current-password" required error={errors.password} />

        <div className="flex items-center justify-between gap-4">
          <Checkbox name="remember" label="Remember me" />
          <Link href="/forgot-password" className="text-sm font-medium text-ink underline underline-offset-4 hover:text-ink/70">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" variant="primary" className="w-full" disabled={status === "submitting"} aria-disabled={status === "submitting"}>
          {status === "submitting" ? "Signing in…" : "Sign In"}
        </Button>
      </form>

      <div className="mt-10 pt-8 border-t border-ink/10">
        <p className="text-sm text-muted">New to Olympic Paints?</p>
        <Button href="/register" variant="ghost" className="mt-4 w-full">
          Create Account
        </Button>
      </div>
    </>
  );
}
