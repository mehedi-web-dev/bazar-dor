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

import { signIn, signUp } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Link from "next/link";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    const confirmPassword = formData.get("confirmPassword")?.toString() ?? "";

    // Validation
    if (name.length < 3) {
      toast.error("নাম কমপক্ষে ৩ অক্ষরের হতে হবে।");
      return;
    }

    if (!email) {
      toast.error("ইমেইল লিখুন।");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না।");
      return;
    }

    try {
      setLoading(true);

      const result = await signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (result.error) {
        toast.error(result.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
        return;
      }

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");

      form.reset();

      // Toast দেখানোর জন্য redirect-এর আগে সামান্য সময়
      setTimeout(() => {
        window.location.assign("/");
      }, 1200);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
      );
    } finally {
      setLoading(false);
    }
  };

  // Google and GitHub sign-in
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
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-12 text-[#26352b]">
      <div className="mx-auto w-full max-w-82.5">
        {/* Header */}
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <Description className="mt-2 text-xs text-gray-500">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দামে দেখুন।
          </Description>
        </header>

        {/* Signup Form */}
        <div className="rounded-[14px] border border-[#dfe8df] bg-[#fbfcfb] p-5 shadow-sm">
          <Form onSubmit={onSubmit}>
            <FieldGroup className="gap-3">
              {/* Name */}
              <TextField
                name="name"
                isRequired
                validate={(value) =>
                  value.trim().length < 3
                    ? "নাম কমপক্ষে ৩ অক্ষরের হতে হবে"
                    : null
                }
              >
                <Label className="mb-1 block text-xs font-medium">নাম</Label>

                <Input
                  placeholder="যেমন: রহিম উদ্দিন"
                  className="h-9 w-full rounded-md border border-[#e0e8e0] bg-transparent px-3 text-xs outline-none focus:border-green-600"
                />

                <FieldError />
              </TextField>

              {/* Email */}
              <TextField name="email" type="email" isRequired>
                <Label className="mb-1 block text-xs font-medium">ইমেইল</Label>

                <Input
                  placeholder="you@example.com"
                  className="h-9 w-full rounded-md border border-[#e0e8e0] bg-transparent px-3 text-xs outline-none focus:border-green-600"
                />

                <FieldError />
              </TextField>

              {/* Password */}
              <TextField name="password" type="password" isRequired>
                <Label className="mb-1 block text-xs font-medium">
                  পাসওয়ার্ড
                </Label>

                <Input
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  className="h-9 w-full rounded-md border border-[#e0e8e0] bg-transparent px-3 text-xs outline-none focus:border-green-600"
                />

                <FieldError />
              </TextField>

              {/* Confirm Password */}
              <TextField name="confirmPassword" type="password" isRequired>
                <Label className="mb-1 block text-xs font-medium">
                  পাসওয়ার্ড নিশ্চিত করুন
                </Label>

                <Input
                  placeholder="আবার লিখুন"
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
              {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
            </Button>
          </Form>

          {/* Divider */}
          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#dce5dc]" />

            <span className="text-xs text-gray-500">অথবা</span>

            <div className="h-px flex-1 bg-[#dce5dc]" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="secondary"
              isDisabled={loading || !!socialLoading}
              className="h-9 rounded-md border border-[#e0e8e0] bg-transparent px-2 text-[11px] font-medium hover:bg-gray-100"
              onPress={() => handleSocialSignIn("google")}
            >
              <span className="font-bold text-blue-600">G</span>

              {socialLoading === "google"
                ? "অপেক্ষা করুন..."
                : "Google দিয়ে চালিয়ে যান"}
            </Button>

            <Button
              type="button"
              variant="secondary"
              isDisabled={loading || !!socialLoading}
              className="h-9 rounded-md border border-[#e0e8e0] bg-transparent px-2 text-[11px] font-medium hover:bg-gray-100"
              onPress={() => handleSocialSignIn("github")}
            >
              <span className="font-bold">●</span>

              {socialLoading === "github"
                ? "অপেক্ষা করুন..."
                : "GitHub দিয়ে চালিয়ে যান"}
            </Button>
          </div>

          {/* Sign In Link */}
          <p className="mt-4 text-center text-xs text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <a
              href="/sign-in"
              className="font-medium text-green-700 hover:underline"
            >
              সাইন ইন করুন
            </a>
          </p>
        </div>

        {/* Home Link */}
        <p className="mt-5 text-center text-xs text-gray-500">
          <Link href="/" className="hover:underline">
            – হোম পেজে ফিরে যান
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Page;
