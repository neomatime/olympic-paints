import type { Metadata } from "next";
import { CreateAccountForm } from "@/components/auth/create-account-form";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your Olympic Paints account.",
};

export default function CreateAccountPage() {
  return <CreateAccountForm />;
}
