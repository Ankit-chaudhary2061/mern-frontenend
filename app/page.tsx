import Footer from "@/src/components/footer";
import Header from "@/src/components/header";
import Image from "next/image";
import Banner from "./home/banner";
import AboutUs from "./home/aboutus";
import Product from "./home/product";
import ShowHideProduct from "./home/showhideproduct";
import ProductFeature from "./home/products-banner";
import StorySection from "./home/story-section";
import TopSearchedSpots from "./home/tea-destination";

export default function Home() {
  return (
    <>
  
    <Banner/>
    <AboutUs/>
    <Product/>
    {/* <ShowHideProduct/> */}
    <ProductFeature/>
    <StorySection/>
    <TopSearchedSpots/>
  
    </>
  );
}
