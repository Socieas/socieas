import { redirect } from "next/navigation";

export default function SignupPage() {
  redirect("/products/lens/login?mode=signup");
}