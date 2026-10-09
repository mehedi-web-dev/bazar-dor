import React from "react";

const TodaysDownPrice = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    {
      cache: "force-cache",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  const downPriceProducts = data
    .filter((product) => product.change?.dir === "down")
    .slice(0, 6);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-5 lg:px-6">
      <h2 className="mb-5 flex items-center gap-2 text-lg font-extrabold text-slate-800 sm:text-xl">
        <span className="text-green-600">▼</span>
        আজ দাম কমেছে
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {downPriceProducts.map((product) => (
          <article
            key={product.id}
            className="group rounded-2xl border border-slate-200 bg-white/80 p-4 transition-all duration-200 hover:border-green-600 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                <span className="text-2xl">
                  {product.categoryIcon || product.image || "🛒"}
                </span>
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-base font-bold text-slate-900">
                  {product.nameBn}
                </h3>

                <p className="mt-0.5 text-xs text-slate-500">
                  প্রতি{" "}
                  {product.unit === "kg"
                    ? "কেজি"
                    : product.unit === "piece"
                      ? "পিস"
                      : product.unit === "litre"
                        ? "লিটার"
                        : product.unit}
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-end justify-between gap-2">
              <div>
                <p className="text-xs text-slate-500">আজকের দাম</p>

                <p className="mt-1 text-lg font-extrabold leading-none text-slate-900">
                  {product.today}{" "}
                  <span className="text-sm font-medium">টাকা</span>
                </p>
              </div>

              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                ▼ {product.change?.pct}%
              </span>
            </div>
          </article>
        ))}
      </div>

      {downPriceProducts.length === 0 && (
        <p className="rounded-xl border border-slate-200 bg-white p-5 text-center text-sm text-slate-500">
          বর্তমানে দাম কমেছে এমন কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
};

export default TodaysDownPrice;
