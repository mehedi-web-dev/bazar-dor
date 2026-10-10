
import CategoryLink from "./CategoryLink";

const NavMenu = async () => {
  let data = [];

  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/categories",
      {
        cache: "force-cache",
      },
    );

    if (res.ok) {
      const result = await res.json();
      data = Array.isArray(result) ? result : [];
    } else {
      console.error(
        "Failed to fetch categories:",
        res.status
      );
    }
  } catch (error) {
    console.error("Category API error:", error);
  }

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

