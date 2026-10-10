"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const PriceProductCard = ({ product, children, className }) => {
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
      href={`/products/${product.slug}`}
      onClick={handleClick}
      aria-disabled={isPending}
      className={className}
    >
      {children}
    </Link>
  );
};

export default PriceProductCard;
