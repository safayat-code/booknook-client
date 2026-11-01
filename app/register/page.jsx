"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { usePageTitle } from "@/lib/hooks";
import { safeRedirect } from "@/lib/format";
import AuthShell from "@/components/AuthShell";
import GoogleIcon from "@/components/GoogleIcon";
import Spinner from "@/components/Spinner";

function passwordProblem(pw) {
  if (pw.length < 6) return "Password must be at least 6 characters long.";
  if (!/[A-Z]/.test(pw)) return "Password must include an uppercase letter.";
  if (!/[a-z]/.test(pw)) return "Password must include a lowercase letter.";
  return "";
}

function RegisterForm() {
  usePageTitle("Register");
  const router = useRouter();
  const params = useSearchParams();
  const redirect = safeRedirect(params.get("redirect"));
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState(false);
  const [pwError, setPwError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const password = f.get("password");
    const problem = passwordProblem(password);
    setPwError(problem);
    if (problem) {
      toast.error(problem);
      return;
    }
    setBusy(true);
    const { error } = await authClient.signUp.email({
      name: f.get("name").trim(),
      email: f.get("email").trim(),
      image: f.get("photo").trim() || undefined,
      password,
    });
    setBusy(false);
    if (error) {
      toast.error(error.message || "Registration did not work. Check your details and try again.");
      return;
    }
    toast.success("Account created. Log in to start borrowing.");
    router.push(`/login${redirect !== "/" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`);
  }

  async function handleGoogle() {
    const { error } = await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    if (error) toast.error(error.message || "Google sign in did not work. Try again.");
  }

  return (
    <AuthShell title="Create your account" subtitle="Join BookNook to add and borrow books.">
      <form onSubmit={handleSubmit} className="grid gap-4" noValidate={false}>
        <label className="form-control">
          <span className="label-text mb-1 font-medium">Name</span>
          <input name="name" required autoComplete="name" className="input input-bordered" />
        </label>
        <label className="form-control">
          <span className="label-text mb-1 font-medium">Email</span>
          <input name="email" type="email" required autoComplete="email" className="input input-bordered" />
        </label>
        <label className="form-control">
          <span className="label-text mb-1 font-medium">Photo URL</span>
          <input name="photo" type="url" placeholder="https://..." className="input input-bordered" />
        </label>
        <label className="form-control">
          <span className="label-text mb-1 font-medium">Password</span>
          <div className="relative">
            <input
              name="password"
              type={show ? "text" : "password"}
              required
              autoComplete="new-password"
              onChange={() => pwError && setPwError("")}
              className={`input input-bordered w-full pr-12 ${pwError ? "input-error" : ""}`}
            />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60" aria-label={show ? "Hide password" : "Show password"}>
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {pwError ? (
            <span className="mt-1 text-sm text-error" role="alert">{pwError}</span>
          ) : (
            <span className="mt-1 text-xs text-base-content/60">At least 6 characters, with an uppercase and a lowercase letter.</span>
          )}
        </label>
        <button type="submit" disabled={busy} className="btn btn-primary">
          {busy ? <span className="loading loading-spinner loading-sm" /> : "Register"}
        </button>
      </form>
      <div className="divider my-6">or</div>
      <button type="button" onClick={handleGoogle} className="btn btn-outline w-full">
        <GoogleIcon /> Continue with Google
      </button>
      <p className="mt-6 text-center text-sm">
        Already have an account? <Link href="/login" className="link link-primary">Log in</Link>
      </p>
    </AuthShell>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<Spinner full />}>
      <RegisterForm />
    </Suspense>
  );
}
