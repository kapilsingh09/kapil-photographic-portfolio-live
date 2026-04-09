import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import PhotoCard from "@/components/PhotoCard";
import SliderGallery from "@/components/SliderGallery";
import PhotographerCard from "@/components/PhotographerCard";
import ModelSection from "@/components/ModelSection";
import PriceingOne from "@/components/PriceingOne";
import VideoPlayer from "@/components/VideoPlayer";
import LastSection from "@/components/LastSection";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <PhotoCard />
      <SliderGallery />
      <PhotographerCard />
      <ModelSection />
      <PriceingOne />
      <VideoPlayer />
      <LastSection />
      </div>
  );
}
