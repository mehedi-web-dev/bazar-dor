"use client";

import React, { useState } from "react";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";

const SignInPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = formData.get("email")?.toString().trim() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    if (!email || !password) {
      toast.error("ইমেইল এবং পাসওয়ার্ড লিখুন।");
      return;
    }

    try {
      setLoading(true);

      const result = await signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (result.error) {
        toast.error(result.error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "সাইন ইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider) => {
    try {
      setSocialLoading(provider);

      const result = await signIn.social({
        provider,
        callbackURL: "/",
      });

      if (result?.error) {
        toast.error(result.error.message || "Social sign-in শুরু করা যায়নি।");
      }
    } catch {
      toast.error("Social sign-in ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSocialLoading("");
    }
  };

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-10 text-[#26352b]">
      <div className="mx-auto w-full max-w-6xl justify-center items-center flex flex-col">
        {/* Heading */}
        <header className="mb-5 text-center">
          <h1 className="text-2xl font-bold tracking-tight">সাইন ইন</h1>

          <Description className="mt-2 text-xs leading-5 text-gray-500">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </Description>
        </header>

        {/* Sign-in Card */}
        <section className="rounded-[14px] w-full sm:w-2xl justify-center items-center border border-[#dfe8df] bg-[#fbfcfb] p-4.5 shadow-sm">
          <Form onSubmit={onSubmit}>
            <FieldGroup className="gap-3">
              {/* Email */}
              <TextField name="email" type="email" isRequired>
                <Label className="mb-1 mt-1 block text-xs font-medium">
                  ইমেইল
                </Label>

                <Input
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="h-9 w-full rounded-md border border-[#e0e8e0] bg-transparent px-3 text-xs outline-none focus:border-green-600"
                />

                <FieldError />
              </TextField>

              {/* Password */}
              <TextField name="password" type="password" isRequired>
                <Label className="mb-1 mt-1 block text-xs font-medium">
                  পাসওয়ার্ড
                </Label>

                <Input
                  placeholder="আপনার পাসওয়ার্ড লিখুন"
                  autoComplete="current-password"
                  className="h-9 w-full rounded-md border border-[#e0e8e0] bg-transparent px-3 text-xs outline-none focus:border-green-600"
                />

                <FieldError />
              </TextField>
            </FieldGroup>

            {/* Submit Button */}
            <Button
              type="submit"
              isDisabled={loading || !!socialLoading}
              className="mt-3 h-9 w-full rounded-md bg-[#078b43] text-xs font-semibold text-white shadow-md hover:bg-[#067638]"
            >
              {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
            </Button>
          </Form>

          {/* Divider */}
          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#dce5dc]" />

            <span className="text-xs text-gray-500">অথবা</span>

            <div className="h-px flex-1 bg-[#dce5dc]" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ">
            <Button
              type="button"
              variant="secondary"
              isDisabled={loading || !!socialLoading}
              className="h-9 w-full rounded-md border border-[#e0e8e0] bg-transparent px-2 text-[11px] font-medium hover:bg-gray-100"
              onPress={() => handleSocialSignIn("google")}
            >
              <Icon icon="devicon:google" />
              {socialLoading === "google"
                ? "অপেক্ষা করুন..."
                : "Google দিয়ে চালিয়ে যান"}
            </Button>

            <Button
              type="button"
              variant="secondary"
              isDisabled={loading || !!socialLoading}
              className="h-9 w-full rounded-md border border-[#e0e8e0] bg-transparent px-2 text-[11px] font-medium hover:bg-gray-100"
              onPress={() => handleSocialSignIn("github")}
            >
              <Icon icon="mdi:github" />
              {socialLoading === "github"
                ? "অপেক্ষা করুন..."
                : "GitHub দিয়ে চালিয়ে যান"}
            </Button>
          </div>

          {/* Sign-up Link */}
          <p className="mt-4 text-center text-xs text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-green-700 hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </section>

        {/* Back to Home */}
        <div className="mt-5 text-center">
          <Link href="/" className="text-xs text-gray-500 hover:text-green-700">
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
