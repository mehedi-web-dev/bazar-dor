import CategoryLink from "./CategoryLink";

const NavMenu = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
    {
      cache: "force-cache",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await res.json();

  return (
    <nav
      aria-label="Product categories"
      className="w-full border-b border-slate-200 bg-white"
    >
      <div className="w-full overflow-x-auto scrollbar-hide">
        <div className="mx-auto flex w-max min-w-full items-center justify-start gap-1 px-3 py-2 sm:px-4 lg:px-6">
          {data.map((item) => (
            <CategoryLink key={item.id} item={item} />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
