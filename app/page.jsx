"use client";
import BookSlider from "@/components/BookSlider";
import NewArrivals from "@/components/NewArrivals";
import HowItWorks from "@/components/HowItWorks";
import TopCategories from "@/components/TopCategories";
import { usePageTitle } from "@/lib/hooks";

export default function Home() {
  usePageTitle("Home");
  return (
    <>
      <BookSlider />
      <NewArrivals />
      <HowItWorks />
      <TopCategories />
    </>
  );
}
