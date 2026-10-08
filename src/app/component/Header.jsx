import Image from "next/image";
import Link from "next/link";

import NavMenu from "./NavMenu";
import CurrentDate from "./CurrentDate";

const Header = () => {
  

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-6xl">
        {/* Top Header */}
        <div className="flex items-center justify-between gap-3 px-3 py-3 sm:px-4 sm:py-4 lg:px-6">
          {/* Logo + Brand */}
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-2 sm:gap-3"
          >
            {/* Logo */}
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12">
              <Image
                src="/logo-ic.png"
                alt="বাজার দর"
                fill
                priority
                sizes="48px"
                className="object-cover"
              />
            </div>

            {/* Brand + Date */}
            <div className="min-w-0">
              <h1 className="truncate text-base font-extrabold tracking-tight text-slate-900 sm:text-xl">
                বাজার দর
              </h1>

              <p className="mt-0.5 truncate text-[9px] font-medium text-slate-500 sm:text-xs">
                <CurrentDate/>
              </p>
            </div>
          </Link>

          {/* Auth Buttons */}
          <div className="flex shrink-0 items-center gap-2">
            {/* Sign In */}
            <button
              type="button"
              className="rounded-lg border border-green-600 px-3 py-2 text-xs font-bold text-green-700 transition-all duration-200 hover:bg-green-50 active:scale-95 sm:px-4 sm:py-2.5 sm:text-sm"
            >
              সাইন ইন
            </button>

            {/* Sign Up */}
            <button
              type="button"
              className="rounded-lg bg-green-600 px-3 py-2 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-green-700 hover:shadow-md active:scale-95 sm:px-4 sm:py-2.5 sm:text-sm"
            >
              সাইন আপ
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="border-t border-slate-100">
          <NavMenu />
        </nav>
      </div>
    </header>
  );
};

export default Header;
