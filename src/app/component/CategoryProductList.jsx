"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const CategoryProductList = ({ products }) => {
  const [sort, setSort] = useState("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "low-high") {
      result.sort((a, b) => a.today - b.today);
    } else if (sort === "high-low") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sort]);

  const formatPrice = (price) => Number(price).toLocaleString("bn-BD");

  const getUnit = (unit) => {
    if (unit === "kg") return "কেজি";
    if (unit === "litre") return "লিটার";
    if (unit === "piece") return "পিস";
    if (unit === "dozen") return "ডজন";
    return unit;
  };

  return (
    <>
      {/* Product count and sorting */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-600">
          মোট {products.length.toLocaleString("bn-BD")}
          টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="flex items-center gap-2">
          <label htmlFor="product-sort" className="text-sm text-slate-600">
            সাজান
          </label>

          <select
            id="product-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="max-w-55 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-high">দাম: কম থেকে বেশি</option>
            <option value="high-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Product cards */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => {
            const isUp = product.change?.dir === "up";
            const isDown = product.change?.dir === "down";

            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="block min-w-0 rounded-2xl border border-slate-200 bg-white/80 p-4 transition-all duration-200 hover:border-green-600 hover:shadow-md sm:p-5"
              >
                {/* Product information */}
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl">
                    {product.image}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-base font-bold text-slate-900">
                      {product.nameBn}
                    </h3>

                    <p className="mt-0.5 text-sm text-slate-500">
                      প্রতি {getUnit(product.unit)}
                    </p>
                  </div>
                </div>

                {/* Current price and change */}
                <div className="mt-4 flex items-end justify-between gap-2">
                  <div>
                    <p className="text-xs text-slate-500">আজকের দাম</p>

                    <p className="mt-1 text-lg font-extrabold text-slate-900">
                      {formatPrice(product.today)}{" "}
                      <span className="text-sm font-medium">টাকা</span>
                    </p>
                  </div>

                  {product.change && (
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1.5 text-xs font-semibold ${
                        isUp
                          ? "bg-red-50 text-red-600"
                          : isDown
                            ? "bg-green-50 text-green-700"
                            : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                      {formatPrice(product.change.pct)}%
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
    </>
  );
};

export default CategoryProductList;
