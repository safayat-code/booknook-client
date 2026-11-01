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

function LoginForm() {
  usePageTitle("Login");
  const router = useRouter();
  const params = useSearchParams();
  const redirect = safeRedirect(params.get("redirect"));
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    const { error } = await authClient.signIn.email({
      email: f.get("email").trim(),
      password: f.get("password"),
    });
    setBusy(false);
    if (error) {
      toast.error(error.message || "Email or password is wrong. Check both and try again.");
      return;
    }
    toast.success("Welcome back to BookNook.");
    router.replace(redirect);
  }

  async function handleGoogle() {
    const { error } = await authClient.signIn.social({ provider: "google", callbackURL: redirect });
    if (error) toast.error(error.message || "Google sign in did not work. Try again.");
  }

  return (
    <AuthShell title="Log in" subtitle="Pick up where you left off.">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <label className="form-control">
          <span className="label-text mb-1 font-medium">Email</span>
          <input name="email" type="email" required autoComplete="email" className="input input-bordered" />
        </label>
        <label className="form-control">
          <span className="label-text mb-1 font-medium">Password</span>
          <div className="relative">
            <input name="password" type={show ? "text" : "password"} required autoComplete="current-password" className="input input-bordered w-full pr-12" />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60" aria-label={show ? "Hide password" : "Show password"}>
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </label>
        <button
          type="button"
          onClick={() => toast("Password reset is not available yet. Contact hello@booknook.app for help.", { icon: "ℹ️" })}
          className="link link-hover w-fit text-sm"
        >
          Forgot password?
        </button>
        <button type="submit" disabled={busy} className="btn btn-primary">
          {busy ? <span className="loading loading-spinner loading-sm" /> : "Log in"}
        </button>
      </form>
      <div className="divider my-6">or</div>
      <button type="button" onClick={handleGoogle} className="btn btn-outline w-full">
        <GoogleIcon /> Continue with Google
      </button>
      <p className="mt-6 text-center text-sm">
        New to BookNook?{" "}
        <Link href={`/register${redirect !== "/" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`} className="link link-primary">
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<Spinner full />}>
      <LoginForm />
    </Suspense>
  );
}
