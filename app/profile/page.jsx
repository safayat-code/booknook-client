"use client";
import { authClient } from "@/lib/auth-client";
import { usePageTitle } from "@/lib/hooks";
import { formatDate } from "@/lib/format";
import PrivateRoute from "@/components/PrivateRoute";
import Avatar from "@/components/Avatar";

function Profile() {
  usePageTitle("My Profile");
  const { data } = authClient.useSession();
  const user = data.user;
  return (
    <div className="page-wrap max-w-xl">
      <h1 className="section-title">My profile</h1>
      <div className="mt-8 flex flex-col items-center gap-4 rounded-box border border-base-300 p-8 text-center">
        <Avatar user={user} size={96} />
        <div>
          <p className="font-display text-2xl">{user.name}</p>
          <p className="text-base-content/70">{user.email}</p>
        </div>
        <p className="text-sm text-base-content/60">Member since {formatDate(user.createdAt)}</p>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  );
}
