
import Banner from "./home/banner";
import AboutUs from "./home/aboutus";
import Product from "./product/page";
import ProductFeature from "./home/products-banner";
import StorySection from "./home/story-section";
import TopSearchedSpots from "./home/tea-destination";
import SliderGallery from "./gallery/page";

export default function Home() {
  return (
    <>
  
    <Banner/>
    <AboutUs/>
    <Product/>
    {/* <ShowHideProduct/> */}
    <ProductFeature/>
    <StorySection/>
    <SliderGallery/>
    <TopSearchedSpots/>
  
    </>
  );
}
