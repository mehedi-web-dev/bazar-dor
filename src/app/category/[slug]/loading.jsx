
const CategoryLoading = () => {
  return (
    <main className="min-h-screen animate-pulse bg-[#f0f5f0]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-5 lg:px-6">
        {/* Breadcrumb Skeleton */}
        <div className="mb-5 h-4 w-40 rounded bg-slate-200" />

        {/* Category Header Skeleton */}
        <div className="mb-6 flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/80 p-5 sm:p-7">
          <div className="h-14 w-14 rounded-xl bg-slate-200" />
          <div className="flex-1">
            <div className="h-7 w-36 rounded bg-slate-200" />
            <div className="mt-2 h-4 w-52 max-w-full rounded bg-slate-200" />
          </div>
        </div>

        {/* Count and Sort Skeleton */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="h-4 w-40 rounded bg-slate-200" />
          <div className="h-9 w-32 rounded-lg bg-slate-200" />
        </div>

        {/* Product Cards Skeleton */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white/80 p-4 sm:p-5"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-slate-200" />
                <div className="flex-1">
                  <div className="h-4 w-3/4 rounded bg-slate-200" />
                  <div className="mt-2 h-3 w-1/2 rounded bg-slate-200" />
                </div>
              </div>

              <div className="mt-5 flex justify-between">
                <div>
                  <div className="h-3 w-20 rounded bg-slate-200" />
                  <div className="mt-2 h-5 w-24 rounded bg-slate-200" />
                </div>
                <div className="h-6 w-16 rounded-full bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CategoryLoading;

