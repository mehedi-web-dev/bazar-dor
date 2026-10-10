"use client";

import MarqueeText from "react-marquee-text";

const MarqueeContent = ({ data }) => {
  return (
    <div className="w-full overflow-hidden border-y border-slate-200 bg-white">
      <MarqueeText direction="right" > 
        <div className="flex items-center">
          {data.map((product) => {
            const isUp = product.change?.dir === "up";

            return (
              <div
                key={product.id}
                className="flex shrink-0 items-center gap-1.5 border-r border-slate-200 px-5 py-1.5 text-sm"
              >
                <span>{product.categoryIcon}</span>

                <span className="font-medium text-slate-700">
                  {product.nameBn}
                </span>

                <span className="font-semibold text-slate-800">
                  {product.today} টাকা
                </span>

                <span className="text-slate-500">/{product.unit}</span>

                <span
                  className={
                    isUp
                      ? "font-semibold text-green-600"
                      : "font-semibold text-red-500"
                  }
                >
                  {isUp ? "▲" : "▼"} {product.change?.pct}%
                </span>
              </div>
            );
          })}
        </div>
      </MarqueeText>
    </div>
  );
};

export default MarqueeContent;
