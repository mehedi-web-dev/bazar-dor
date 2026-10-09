import Image from "next/image";
import Hero from "./component/Home/Hero";
import TodaysUpPrice from "./component/Home/TodaysUpPrice";
import TodaysDownPrice from "./component/Home/TodaysDownPrice";
import AllProducts from "./component/Home/AllProducts";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl w-full ">
      <Hero />
      <TodaysUpPrice />
      <TodaysDownPrice />
      <AllProducts />
    </div>
  );
}
