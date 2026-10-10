
import Link from "next/link";
import { notFound } from "next/navigation";

const formatPrice = (price) => Number(price).toLocaleString("bn-BD");

const getUnit = (unit) => {
  if (unit === "kg") return "কেজি";
  if (unit === "litre") return "লিটার";
  if (unit === "piece") return "পিস";
  if (unit === "dozen") return "ডজন";
  return unit;
};

const ProductDetails = async ({ params }) => {
  const { slug } = await params;

  let products = [];

  try {
    const res = await fetch(
      "https://api.api-store.workers.dev/api/bazardor/products",
      {
        cache: "force-cache",
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch products:", res.status);
    } else {
      const data = await res.json();
      products = Array.isArray(data) ? data : [];
    }
  } catch (error) {
    console.error("Product API error:", error);
  }

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  const marketPrices = Array.isArray(product.markets)
    ? product.markets
    : [];

  const lowestPrice = marketPrices.length
    ? Math.min(...marketPrices.map((market) => market.min))
    : null;

  const highestPrice = marketPrices.length
    ? Math.max(...marketPrices.map((market) => market.max))
    : null;

  const averagePrice = marketPrices.length
    ? Math.round(
        marketPrices.reduce(
          (sum, market) => sum + (market.min + market.max) / 2,
          0
        ) / marketPrices.length
      )
    : null;

  return (
    <main className="min-h-screen bg-[#f0f5f0]">
      <div className="mx-auto w-full max-w-6xl px-3 py-5 sm:px-5 sm:py-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-xs text-slate-600 sm:text-sm"
        >
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>

          <span>›</span>

          <Link href="/#products" className="hover:text-green-700">
            সকল পণ্য
          </Link>

          <span>›</span>

          <span className="font-medium text-slate-800">
            {product.nameBn}
          </span>
        </nav>

        {/* Product Header */}
        <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/80 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-3xl sm:h-16 sm:w-16">
              {product.categoryIcon || product.image || "🛒"}
            </div>

            <div className="min-w-0">
              <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                প্রতি {getUnit(product.unit)} · {product.categoryNameBn}
              </p>

              <p
                className={`mt-2 text-xs font-medium sm:text-sm ${
                  isUp
                    ? "text-red-600"
                    : isDown
                      ? "text-green-700"
                      : "text-slate-500"
                }`}
              >
                {isUp
                  ? `গতকালের তুলনায় আজ দাম বেড়েছে ${formatPrice(
                      Math.abs(product.today - product.yesterday)
                    )} টাকা`
                  : isDown
                    ? `গতকালের তুলনায় আজ দাম কমেছে ${formatPrice(
                        Math.abs(product.today - product.yesterday)
                      )} টাকা`
                    : "গতকালের তুলনায় দাম অপরিবর্তিত"}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-between gap-4 rounded-xl bg-[#f0f5f0] px-4 py-3 sm:min-w-28 sm:flex-col sm:gap-1 sm:text-center">
            <div>
              <p className="text-xs text-slate-500">আজকের দাম</p>

              <p className="text-2xl font-extrabold text-slate-900">
                {formatPrice(product.today)}
              </p>

              <p className="text-xs text-slate-500">
                টাকা / {getUnit(product.unit)}
              </p>
            </div>

            <span
              className={`text-xs font-bold ${
                isUp
                  ? "text-red-600"
                  : isDown
                    ? "text-green-700"
                    : "text-slate-500"
              }`}
            >
              {isUp ? "▲" : isDown ? "▼" : "●"}{" "}
              {formatPrice(product.change?.pct ?? 0)}%
            </span>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-4 rounded-2xl border border-slate-200 bg-white/80 p-4 sm:mt-5 sm:p-5">
          <h2 className="mb-4 text-base font-bold text-slate-800">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-600">সর্বনিম্ন দাম</p>

              <p className="mt-1 text-lg font-extrabold text-green-600">
                {lowestPrice === null
                  ? "তথ্য নেই"
                  : `${formatPrice(lowestPrice)} টাকা`}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                বাজারের সর্বনিম্ন দাম
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-600">সর্বোচ্চ দাম</p>

              <p className="mt-1 text-lg font-extrabold text-red-500">
                {highestPrice === null
                  ? "তথ্য নেই"
                  : `${formatPrice(highestPrice)} টাকা`}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                বাজারের সর্বোচ্চ দাম
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-600">গড় দাম</p>

              <p className="mt-1 text-lg font-extrabold text-green-600">
                {averagePrice === null
                  ? "তথ্য নেই"
                  : `${formatPrice(averagePrice)} টাকা`}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                প্রতি {getUnit(product.unit)}-এর হিসাবে
              </p>
            </div>
          </div>

          {/* Market Prices */}
          <h2 className="mb-3 mt-6 text-base font-bold text-slate-800">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {marketPrices.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full min-w-140 border-collapse text-left text-xs sm:text-sm">
                <thead className="bg-[#f8faf8] text-slate-600">
                  <tr>
                    <th className="px-3 py-3 font-semibold sm:px-4">
                      বাজার
                    </th>

                    <th className="px-3 py-3 font-semibold sm:px-4">
                      বিভাগ
                    </th>

                    <th className="px-3 py-3 text-right font-semibold sm:px-4">
                      সর্বনিম্ন
                    </th>

                    <th className="px-3 py-3 text-right font-semibold sm:px-4">
                      সর্বোচ্চ
                    </th>

                    <th className="px-3 py-3 text-right font-semibold sm:px-4">
                      গড়
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {marketPrices.map((market, index) => {
                    const marketAverage = Math.round(
                      (market.min + market.max) / 2
                    );

                    return (
                      <tr
                        key={`${market.market}-${index}`}
                        className={
                          index % 2 === 0
                            ? "border-t border-slate-200 bg-white/60"
                            : "border-t border-slate-200 bg-[#f0f5f0]/70"
                        }
                      >
                        <td className="px-3 py-3 font-medium text-slate-800 sm:px-4">
                          {market.market}
                        </td>

                        <td className="px-3 py-3 text-slate-700 sm:px-4">
                          {market.division}
                        </td>

                        <td className="px-3 py-3 text-right text-slate-700 sm:px-4">
                          {formatPrice(market.min)} টাকা
                        </td>

                        <td className="px-3 py-3 text-right text-slate-700 sm:px-4">
                          {formatPrice(market.max)} টাকা
                        </td>

                        <td className="px-3 py-3 text-right font-bold text-slate-800 sm:px-4">
                          {formatPrice(marketAverage)} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="rounded-xl border border-slate-200 p-4 text-sm text-slate-500">
              এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
            </p>
          )}
        </section>
      </div>
    </main>
  );
};

export default function ProductsDetailsPage({ params }) {
  return <ProductDetails params={params} />;
}
