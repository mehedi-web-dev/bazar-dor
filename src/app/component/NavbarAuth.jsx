"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const NavbarAuth = () => {
  const { data: session, isPending } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const user = session?.user;

  const handleSignOut = async () => {
    try {
      setSigningOut(true);

      const result = await authClient.signOut();

      if (result.error) {
        toast.error(result.error.message || "সাইন আউট করা যায়নি।");
        return;
      }

      setDropdownOpen(false);
      toast.success("সফলভাবে সাইন আউট হয়েছে!");
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
    } finally {
      setSigningOut(false);
    }
  };

  if (isPending) {
    return <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-100" />;
  }

  // User login না থাকলে
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/sign-in"
          className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          সাইন ইন
        </Link>

        <Link
          href="/sign-up"
          className="rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  // User login করা থাকলে
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-gray-100"
      >
        {user.image ? (
          <img
            src={user.image}
            alt={user.name || "User"}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-semibold text-green-800">
            {(user.name || user.email || "U").charAt(0).toUpperCase()}
          </div>
        )}

        <span className="max-w-28 truncate text-sm font-medium">
          {user.name || "User"}
        </span>

        <span className="text-xs text-gray-500">⌄</span>
      </button>

      {dropdownOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setDropdownOpen(false)}
          />

          <div className="absolute right-0 top-full z-50 mt-3 w-70 max-w-[calc(100vw-2rem)] rounded-2xl border border-[#dfe8df] bg-[#fbfcfb] p-4 shadow-xl">
            <div className="border-b border-gray-100 pb-3">
              <p className="truncate text-sm font-semibold text-gray-900">
                {user.name || "User"}
              </p>

              <p className="mt-1 truncate text-xs text-gray-500">
                {user.email}
              </p>
            </div>

            <Link
              href="/profile"
              onClick={() => setDropdownOpen(false)}
              className="mt-2 flex items-center gap-2 rounded-lg px-2 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
            >
              <span>👤</span>
              আমার প্রোফাইল
            </Link>

            <button
              type="button"
              disabled={signingOut}
              onClick={handleSignOut}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
              <span>↪</span>
              {signingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NavbarAuth;
