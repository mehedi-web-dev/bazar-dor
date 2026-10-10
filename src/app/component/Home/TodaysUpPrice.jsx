
import PriceProductCard from "./PriceProductCard";

const TodaysUpPrice = async () => {
  let upPriceProducts = [];

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
      const data = await res.json();

      if (Array.isArray(data)) {
        upPriceProducts = data
          .filter((product) => product.change?.dir === "up")
          .slice(0, 6);
      }
    }
  } catch (error) {
    console.error("Product API error:", error);
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-5 lg:px-6">
      {/* Section Heading */}
      <h2 className="mb-5 flex items-center gap-2 text-lg font-extrabold text-slate-800 sm:text-xl">
        <span className="text-red-500">▲</span>
        আজ দাম বেড়েছে
      </h2>

      {/* Product Grid */}
      {upPriceProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {upPriceProducts.map((product) => (
            <PriceProductCard
              key={product.id}
              product={product}
              className="block min-w-0 rounded-2xl border border-slate-200 bg-white/80 p-4 transition-all duration-200 hover:border-green-600 hover:shadow-md sm:p-5"
            >
              {/* Product Name and Icon */}
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                  <span className="text-2xl">
                    {product.image || "🛒"}
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

              {/* Price and Change */}
              <div className="mt-3 flex items-end justify-between gap-2">
                <div>
                  <p className="text-xs text-slate-500">
                    আজকের দাম
                  </p>

                  <p className="mt-1 text-lg font-extrabold leading-none text-slate-900">
                    {product.today}{" "}
                    <span className="text-sm font-medium">
                      টাকা
                    </span>
                  </p>
                </div>

                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-red-600">
                  ▲ {product.change?.pct}%
                </span>
              </div>
            </PriceProductCard>
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-slate-200 bg-white p-5 text-center text-sm text-slate-500">
          বর্তমানে দাম বেড়েছে এমন কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
};

export default TodaysUpPrice;

