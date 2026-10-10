
const ProductLoading = () => {
  return (
    <main className="min-h-screen animate-pulse bg-[#f0f5f0]">
      <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-5 sm:py-6 lg:px-8">

        {/* Breadcrumb Skeleton */}
        <div className="mb-6 flex items-center gap-2">
          <div className="h-3 w-12 rounded bg-slate-200" />
          <div className="h-3 w-2 rounded bg-slate-200" />
          <div className="h-3 w-16 rounded bg-slate-200" />
          <div className="h-3 w-2 rounded bg-slate-200" />
          <div className="h-3 w-28 rounded bg-slate-200" />
        </div>

        {/* Product Header Skeleton */}
        <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/80 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="h-14 w-14 shrink-0 rounded-xl bg-slate-200 sm:h-16 sm:w-16" />

            <div>
              <div className="h-6 w-40 max-w-full rounded bg-slate-200 sm:w-56" />
              <div className="mt-2 h-3 w-28 rounded bg-slate-200" />
              <div className="mt-3 h-3 w-48 max-w-full rounded bg-slate-200" />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-100 p-4 sm:min-w-28 sm:flex-col">
            <div>
              <div className="h-3 w-16 rounded bg-slate-200" />
              <div className="mt-2 h-7 w-20 rounded bg-slate-200" />
              <div className="mt-2 h-3 w-20 rounded bg-slate-200" />
            </div>
            <div className="h-4 w-14 rounded-full bg-slate-200 sm:mt-2" />
          </div>
        </section>

        {/* Price Summary Skeleton */}
        <section className="mt-4 rounded-2xl border border-slate-200 bg-white/80 p-4 sm:mt-5 sm:p-5">
          <div className="mb-4 h-5 w-36 rounded bg-slate-200" />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-200 p-4"
              >
                <div className="h-3 w-20 rounded bg-slate-200" />
                <div className="mt-3 h-6 w-24 rounded bg-slate-200" />
                <div className="mt-2 h-3 w-32 max-w-full rounded bg-slate-200" />
              </div>
            ))}
          </div>

          {/* Market Table Skeleton */}
          <div className="mb-4 mt-6 h-5 w-44 rounded bg-slate-200" />

          <div className="overflow-hidden rounded-xl border border-slate-200">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-3 border-b border-slate-200 p-4 last:border-b-0 sm:grid-cols-5"
              >
                <div className="h-3 w-full max-w-24 rounded bg-slate-200" />
                <div className="hidden h-3 w-full max-w-20 rounded bg-slate-200 sm:block" />
                <div className="h-3 w-full max-w-16 rounded bg-slate-200" />
                <div className="hidden h-3 w-full max-w-16 rounded bg-slate-200 sm:block" />
                <div className="h-3 w-full max-w-16 justify-self-end rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
};

export default ProductLoading;

