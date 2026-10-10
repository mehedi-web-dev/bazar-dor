"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const CategoryLink = ({ item }) => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleClick = (e) => {
    if (isPending) {
      e.preventDefault();
      return;
    }

    if (!session?.user) {
      e.preventDefault();
      router.push("/sign-up");
    }
  };

  return (
    <Link
      href={`/category/${item.slug}`}
      onClick={handleClick}
      aria-disabled={isPending}
      className="group flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-green-50 hover:text-green-700 focus-visible:outline-2 focus-visible:outline-green-600"
    >
      <span className="text-sm transition-transform duration-200 group-hover:scale-110">
        {item.icon}
      </span>

      <span>{item.nameBn}</span>
    </Link>
  );
};

export default CategoryLink;
