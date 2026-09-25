import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset the password for your Olympic Paints account.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
