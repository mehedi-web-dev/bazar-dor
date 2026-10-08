import Image from "next/image";
import Link from "next/link";
import CurrentDate from "../CurrentDate";

const Hero = () => {
  return (
    <section className="px-3 pt-4 sm:px-5 sm:pt-5 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col-reverse items-center overflow-hidden rounded-2xl border border-slate-200 bg-white px-5 py-5 sm:rounded-[24px] sm:px-7 sm:py-7 md:flex-row md:justify-between md:px-8 lg:px-10">
        {/* Left Content */}
        <div className="w-full text-center md:max-w-2xl md:text-left">
          {/* Date */}
          <div className="mb-3 inline-flex rounded-full bg-green-50 px-3 py-1 text-[10px] font-semibold text-green-700 sm:mb-4 sm:text-xs">
            <CurrentDate />
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl md:text-4xl lg:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Description */}
          <p className="mx-auto mt-3 max-w-2xl text-xs font-medium leading-6 text-slate-500 sm:mt-4 sm:text-sm sm:leading-7 md:mx-0 md:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Button */}
          <div className="mt-5 sm:mt-6">
            <Link
              href="/"
              className="inline-flex rounded-lg bg-green-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-green-600/20 transition hover:bg-green-700 active:scale-95 sm:px-6 sm:py-3 sm:text-sm"
            >
              সব পণ্য দেখুন
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="mb-4 flex w-full justify-center sm:mb-5 md:mb-0 md:w-[35%] md:justify-end lg:w-[32%]">
          <div className="relative h-32.5 w-40 sm:h-40 sm:w-50 md:h-47.5 md:w-57.5 lg:h-55 lg:w-70">
            <Image
              src="/bazar-hero.png"
              alt="বাজারের পণ্য"
              fill
              priority
              sizes="(max-width: 640px) 160px, (max-width: 768px) 200px, 280px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
