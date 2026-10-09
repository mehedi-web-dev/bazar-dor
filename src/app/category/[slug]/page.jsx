
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const CategoryDetails = async ({ params }) => {
  const { slug } = await params;

  // Fetch categories and products
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

  // Find selected category
  const category = categories.find(
    (item) => item.slug === slug
  );

  if (!category) {
    notFound();
  }

  // Filter products by category
  const categoryProducts = products.filter(
    (product) => product.category === slug
  );

  return (
    <main className="min-h-screen bg-[#f0f5f0]">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-5 lg:px-6">

        {/* Breadcrumb */}
        <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>
          <span>›</span>
          <span className="font-semibold text-slate-800">
            {category.nameBn}
          </span>
        </nav>

        {/* Category Heading */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white/80 p-5 sm:p-7">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-3xl">
              {category.icon}
            </div>

            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                {category.nameBn}
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                মোট {categoryProducts.length.toLocaleString("bn-BD")}
                টি পণ্য পাওয়া গেছে
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section>
          <h2 className="mb-4 text-lg font-extrabold text-slate-800">
            সকল {category.nameBn} পণ্য
          </h2>

          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {categoryProducts.map((product) => {
                const isUp = product.change?.dir === "up";
                const isDown = product.change?.dir === "down";

                const unit =
                  product.unit === "kg"
                    ? "কেজি"
                    : product.unit === "litre"
                      ? "লিটার"
                      : product.unit === "piece"
                        ? "পিস"
                        : product.unit;

                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="block min-w-0 rounded-2xl border border-slate-200 bg-white/80 p-4 transition-all duration-200 hover:border-green-600 hover:shadow-md sm:p-5"
                  >
                    {/* Product information */}
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-3xl">
                        {product.categoryIcon || product.image || "🛒"}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-base font-bold text-slate-900 sm:text-lg">
                          {product.nameBn}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          প্রতি {unit}
                        </p>
                      </div>
                    </div>

                 
                    <div className="mt-4 flex items-end justify-between gap-2">
                      <div>
                        <p className="text-xs text-slate-500">
                          আজকের দাম
                        </p>

                        <p className="mt-1 text-xl font-extrabold text-slate-900">
                          {product.today.toLocaleString("bn-BD")}{" "}
                          <span className="text-sm font-medium">
                            টাকা
                          </span>
                        </p>
                      </div>

                      {product.change && (
                        <span
                          className={`shrink-0 rounded-full px-2.5 py-1.5 text-xs font-semibold ${
                            isUp
                              ? "bg-red-50 text-red-600"
                              : isDown
                                ? "bg-green-50 text-green-700"
                                : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {isUp ? "▲" : isDown ? "▼" : "●"}{" "}
                          {product.change.pct}%
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default function CategoryPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-slate-500">
          ক্যাটাগরির পণ্য লোড হচ্ছে...
        </div>
      }
    >
      <CategoryDetails params={params} />
    </Suspense>
  );
}
