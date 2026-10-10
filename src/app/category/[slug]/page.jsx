
import Link from "next/link";
import { notFound } from "next/navigation";

import CategoryProductList from "@/app/component/CategoryProductList";

const CategoryDetails = async ({ params }) => {
  const { slug } = await params;

  const [categoryRes, productRes] = await Promise.all([
    fetch(
      "https://api.api-store.workers.dev/api/bazardor/categories",
      { cache: "force-cache" }
    ),
    fetch(
      "https://api.api-store.workers.dev/api/bazardor/products",
      { cache: "force-cache" }
    ),
  ]);

  if (!categoryRes.ok || !productRes.ok) {
    throw new Error("Failed to fetch category data");
  }

  const categories = await categoryRes.json();
  const products = await productRes.json();

  const category = categories.find(
    (item) => item.slug === slug
  );

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(
    (product) => product.category === category.slug
  );

  return (
    <main className="min-h-screen bg-[#f0f5f0]">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-5 lg:px-6">

        {/* Breadcrumb */}
        <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs text-slate-500 sm:text-sm">
          <Link href="/" className="transition hover:text-green-700">
            হোম
          </Link>

          <span>›</span>

          <span className="font-medium text-slate-800">
            {category.nameBn}
          </span>
        </nav>

        {/* Category header */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white/80 p-5 sm:p-7">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-3xl">
              {category.icon || "🛒"}
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                {category.nameBn}
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                {categoryProducts.length.toLocaleString("bn-BD")}
                টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>
        </section>

        {/* Sorting and product cards */}
        <CategoryProductList products={categoryProducts} />

      </div>
    </main>
  );
};

export default function CategoryPage({ params }) {
  return <CategoryDetails params={params} />;
}

