"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

function ProfileForm({ user, onUpdate, updating, signingOut }) {
  const [name, setName] = useState(user.name || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(name);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FieldGroup className="w-full gap-3">
        <TextField
          name="name"
          isRequired
          value={name}
          onChange={setName}
          validate={(value) =>
            value.trim().length < 3 ? "নাম কমপক্ষে ৩ অক্ষরের হতে হবে।" : null
          }
        >
          <Label className="mb-1 block text-sm font-medium">নাম</Label>

          <Input
            placeholder="আপনার নাম লিখুন"
            autoComplete="name"
            className="h-11 w-full rounded-lg border border-[#dfe8df] bg-transparent px-3 text-sm outline-none focus:border-green-600"
          />

          <FieldError />
        </TextField>

        <Button
          type="submit"
          isDisabled={updating || signingOut}
          className="mt-1 h-11 w-full rounded-lg bg-[#078b43] text-sm font-semibold text-white shadow-md hover:bg-[#067638]"
        >
          {updating ? "আপডেট হচ্ছে..." : "আপডেট"}
        </Button>
      </FieldGroup>
    </Form>
  );
}

const ProfilePage = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [updating, setUpdating] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const user = session?.user;

  const handleUpdate = async (newName) => {
    const trimmedName = newName.trim();

    if (trimmedName.length < 3) {
      toast.error("নাম কমপক্ষে ৩ অক্ষরের হতে হবে।");
      return;
    }

    if (trimmedName === user?.name) {
      toast.info("আপনার নামে কোনো পরিবর্তন করা হয়নি।");
      return;
    }

    try {
      setUpdating(true);

      const result = await authClient.updateUser({
        name: trimmedName,
      });

      if (result.error) {
        toast.error(result.error.message || "নাম আপডেট করা যায়নি।");
        return;
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
    } catch {
      toast.error("প্রোফাইল আপডেট করতে সমস্যা হয়েছে।");
    } finally {
      setUpdating(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setSigningOut(true);

      const result = await authClient.signOut();

      if (result.error) {
        toast.error(result.error.message || "সাইন আউট করা যায়নি।");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে!");

      router.replace("/sign-in");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
    } finally {
      setSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0]">
        <p className="text-sm text-gray-500">প্রোফাইল লোড হচ্ছে...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0] px-4">
        <div className="text-center">
          <p className="mb-4 text-sm text-gray-600">
            প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।
          </p>

          <Link
            href="/sign-in"
            className="inline-block rounded-lg bg-[#078b43] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#067638]"
          >
            সাইন ইন
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-10 text-[#26352b] sm:py-16">
      <div className="mx-auto w-full max-w-[810px]">
        {/* Page Heading */}
        <header className="mb-7">
          <h1 className="text-2xl font-bold tracking-tight">আমার প্রোফাইল</h1>

          <Description className="mt-1 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </Description>
        </header>

        {/* User Information Card */}
        <section className="mb-6 flex flex-col gap-4 rounded-[18px] border border-[#dfe8df] bg-[#fbfcfb] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex min-w-0 items-center gap-4">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "Profile"}
                className="h-[78px] w-[78px] shrink-0 rounded-[18px] bg-gray-100 object-cover"
              />
            ) : (
              <div className="flex h-[78px] w-[78px] shrink-0 items-center justify-center rounded-[18px] bg-[#e5f2e8] text-3xl font-semibold text-green-800">
                {(user.name || user.email || "U").charAt(0).toUpperCase()}
              </div>
            )}

            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold sm:text-xl">
                {user.name || "নাম দেওয়া হয়নি"}
              </h2>

              <p className="mt-1 break-all text-sm text-gray-500 sm:text-base">
                {user.email}
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="secondary"
            isDisabled={signingOut || updating}
            onPress={handleSignOut}
            className="h-11 shrink-0 rounded-lg border border-red-500 bg-transparent px-4 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            {signingOut ? "সাইন আউট হচ্ছে..." : "↪ সাইন আউট"}
          </Button>
        </section>

        {/* Update Profile Card */}
        <section className="rounded-[18px] border border-[#dfe8df] bg-[#fbfcfb] p-5 sm:p-7">
          <h2 className="mb-8 text-lg font-semibold">তথ্য</h2>

          <ProfileForm
            key={user.id}
            user={user}
            onUpdate={handleUpdate}
            updating={updating}
            signingOut={signingOut}
          />
        </section>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-green-700">
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
