
import PriceProductCard from "./PriceProductCard";

const AllProducts = async () => {
  let data = [];

  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/products",
      {
        cache: "force-cache",
      },
    );

    if (!res.ok) {
      console.error("Failed to fetch products:", res.status);
    } else {
      const result = await res.json();
      data = Array.isArray(result) ? result : [];
    }
  } catch (error) {
    console.error("Product API error:", error);
  }

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

      {/* Product Grid */}
      {data.length > 0 ? (
        <div className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((product) => {
            const isUp = product.change?.dir === "up";
            const isDown = product.change?.dir === "down";

            return (
              <PriceProductCard
                key={product.id}
                product={product}
                className="block min-w-0 rounded-2xl border border-slate-200 bg-white/80 p-4 transition-all duration-200 hover:border-green-600 hover:shadow-md sm:p-5"
              >
                {/* Product Information */}
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100">
                    <span className="text-3xl">
                      {product.image || "🛒"}
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
                    <p className="text-sm text-slate-500">
                      আজকের দাম
                    </p>

                    <p className="mt-1 text-xl font-extrabold text-slate-900">
                      {product.today}{" "}
                      <span className="text-base font-medium">
                        টাকা
                      </span>
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
                      {isUp ? "▲" : isDown ? "▼" : "●"}{" "}
                      {product.change.pct}%
                    </span>
                  )}
                </div>
              </PriceProductCard>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-slate-600">
            এই মুহূর্তে পণ্যের তথ্য পাওয়া যাচ্ছে না।
          </p>
          <p className="mt-2 text-sm text-slate-400">
            অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করো।
          </p>
        </div>
      )}
    </section>
  );
};

export default AllProducts;
