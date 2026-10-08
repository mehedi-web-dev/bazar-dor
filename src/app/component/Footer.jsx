const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto flex min-h- max-w-6xl flex-col items-center justify-between gap-3 px-4 py-4 text-center sm:flex-row sm:px-6 sm:py-4 sm:text-left lg:px-8">
        {/* Left Text */}
        <p className="text-xs font-medium leading-relaxed text-slate-600 sm:text-sm">
          বাজার দর — খুচরো/খাদ্যদ্রব্যের পণ্যের দাম এক নজরে।
        </p>

        {/* Right Text */}
        <p className="text-xs font-medium leading-relaxed text-slate-600 sm:text-sm">
          সকল দাম সম্ভাব্য; বাজার অবস্থার উপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;
