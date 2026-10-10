
const Loading = () => {
  return (
    <main className="mx-auto min-h-screen max-w-7xl animate-pulse px-4 py-6 sm:px-5 lg:px-6">
      {/* Hero Skeleton */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="h-4 w-28 rounded bg-slate-200" />
        <div className="mt-5 h-8 w-3/4 rounded bg-slate-200" />
        <div className="mt-3 h-4 w-full max-w-xl rounded bg-slate-200" />
        <div className="mt-2 h-4 w-2/3 rounded bg-slate-200" />
        <div className="mt-5 h-10 w-32 rounded-lg bg-slate-200" />
      </div>

      {/* Product Heading */}
      <div className="mb-5 h-6 w-40 rounded bg-slate-200" />

      {/* Product Card Skeletons */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-slate-200" />
              <div className="flex-1">
                <div className="h-4 w-3/4 rounded bg-slate-200" />
                <div className="mt-2 h-3 w-1/2 rounded bg-slate-200" />
              </div>
            </div>

            <div className="mt-5 flex items-end justify-between">
              <div>
                <div className="h-3 w-20 rounded bg-slate-200" />
                <div className="mt-2 h-5 w-24 rounded bg-slate-200" />
              </div>
              <div className="h-6 w-16 rounded-full bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Loading;
