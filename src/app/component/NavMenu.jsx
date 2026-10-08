import Link from "next/link";

const NavMenu = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
    {
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await res.json();

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="mx-auto flex w-max min-w-full items-center justify-start gap-1 px-3 py-2  sm:px-4 lg:px-6">

        {data.map((item) => (
          <Link
            key={item.id}
            href={`/category/${item.slug}`}
            className="group flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
          >
            <span className="text-sm transition-transform duration-200 group-hover:scale-110">
              {item.icon}
            </span>

            <span>{item.nameBn}</span>
          </Link>
        ))}

      </div>
    </div>
  );
};

export default NavMenu;