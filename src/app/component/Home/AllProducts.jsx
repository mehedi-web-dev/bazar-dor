import React from "react";

const AllProducts = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    { cache: "force-cache" },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  return (
    <section
      id="products"
      className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-5 lg:px-6"
    >
      {/* Heading */}
      <div className="mb-5">
        <h2 className="flex items-center gap-3 text-xl font-extrabold text-slate-900 sm:text-2xl">
          <span className="text-2xl">🛒</span>
          সকল পণ্য
        </h2>

        <p className="mt-3 text-sm text-slate-600 sm:text-base">
          মোট {data.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      {/* Responsive Product Grid */}
      <div className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((product) => {
          const isUp = product.change?.dir === "up";
          const isDown = product.change?.dir === "down";

          return (
            <article
              key={product.id}
              className="min-w-0 rounded-2xl border border-slate-200 bg-white/80 p-4 transition-all duration-200 hover:border-green-600 hover:shadow-md sm:p-5"
            >
              {/* Product Information */}
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100">
                  <span className="text-3xl">
                    {product.categoryIcon || product.image || "🛒"}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-lg font-bold text-slate-900">
                    {product.nameBn}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
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

              {/* Current Price */}
              <div className="mt-4 flex items-end justify-between gap-2">
                <div>
                  <p className="text-sm text-slate-500">আজকের দাম</p>

                  <p className="mt-1 text-xl font-extrabold text-slate-900">
                    {product.today}{" "}
                    <span className="text-base font-medium">টাকা</span>
                  </p>
                </div>

                {product.change && (
                  <span
                    className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                      isUp
                        ? "bg-red-50 text-red-600"
                        : isDown
                          ? "bg-green-50 text-green-700"
                          : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {isUp ? "▲" : isDown ? "▼" : "●"} {product.change.pct}%
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default AllProducts;
