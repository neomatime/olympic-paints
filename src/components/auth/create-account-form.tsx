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

type Field = "firstName" | "lastName" | "email" | "password" | "confirmPassword" | "terms";
type Errors = Partial<Record<Field, string>>;

const MIN_PASSWORD = 8;

export function CreateAccountForm() {
  const [errors, setErrors] = useState<Errors>({});
  const { status, submit } = useMockSubmit();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const password = String(data.get("password") ?? "");
    const confirmPassword = String(data.get("confirmPassword") ?? "");

    const next: Errors = {};
    if (!value("firstName")) next.firstName = "Enter your first name.";
    if (!value("lastName")) next.lastName = "Enter your last name.";
    if (!value("email")) next.email = "Enter your email address.";
    else if (!emailPattern.test(value("email"))) next.email = "Enter a valid email address.";
    if (password.length < MIN_PASSWORD) next.password = `Use at least ${MIN_PASSWORD} characters.`;
    if (!confirmPassword) next.confirmPassword = "Confirm your password.";
    else if (confirmPassword !== password) next.confirmPassword = "Passwords don't match.";
    if (!data.get("terms")) next.terms = "Please accept the Terms & Conditions and Privacy Policy.";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      focusFirstInvalid(form, next, ["firstName", "lastName", "email", "password", "confirmPassword", "terms"]);
      return;
    }
    submit();
  }

  if (status === "done") {
    return (
      <AuthConfirmation>
        <AuthIntro eyebrow="Account created" title="Welcome to Olympic Paints" description="Your account has been created." />
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
      <AuthIntro
        eyebrow="Your Account"
        title="Create an account"
        description="Save your favourite colours and check out faster."
      />

      <form className="mt-10 space-y-5" onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input label="First name" name="firstName" autoComplete="given-name" required error={errors.firstName} />
          <Input label="Last name" name="lastName" autoComplete="family-name" required error={errors.lastName} />
        </div>
        <Input
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          error={errors.email}
        />
        <PasswordInput
          label="Password"
          name="password"
          autoComplete="new-password"
          required
          hint={`At least ${MIN_PASSWORD} characters.`}
          error={errors.password}
        />
        <PasswordInput
          label="Confirm password"
          name="confirmPassword"
          autoComplete="new-password"
          required
          error={errors.confirmPassword}
        />

        <Checkbox
          name="terms"
          required
          error={errors.terms}
          label={
            <>
              I accept the{" "}
              <Link href="/terms" target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-ink">
                Terms &amp; Conditions<span className="sr-only"> (opens in a new tab)</span>
              </Link>{" "}
              and{" "}
              <Link href="/privacy" target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-ink">
                Privacy Policy<span className="sr-only"> (opens in a new tab)</span>
              </Link>
              .
            </>
          }
        />

        <Button type="submit" variant="primary" className="w-full" disabled={status === "submitting"} aria-disabled={status === "submitting"}>
          {status === "submitting" ? "Creating account…" : "Create Account"}
        </Button>
      </form>

      <p className="mt-10 pt-8 border-t border-ink/10 text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-ink underline underline-offset-4 hover:text-ink/70">
          Sign in
        </Link>
      </p>
    </>
  );
}
