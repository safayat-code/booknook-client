"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const SPINES = [
  ["#B8892B", 62], ["#E8DFC8", 80], ["#7A2E3A", 70], ["#5C8F86", 90],
  ["#D9CBA0", 58], ["#B8892B", 76], ["#2F6F6B", 66], ["#E8DFC8", 94], ["#7A2E3A", 72],
];

function Shelf({ shift }) {
  const spines = [...SPINES.slice(shift), ...SPINES.slice(0, shift)];
  return (
    <div className="flex h-56 items-end gap-1.5 border-b-[6px] border-[#B8892B] sm:h-72" aria-hidden="true">
      {spines.map(([color, h], i) => (
        <div key={i} className="relative w-7 rounded-t-sm sm:w-9" style={{ background: color, height: `${h}%` }}>
          <span className="absolute inset-x-0 top-[18%] h-1.5 bg-black/20" />
          <span className="absolute inset-x-0 top-[26%] h-px bg-black/20" />
        </div>
      ))}
    </div>
  );
}

const slides = [
  {
    title: "Add a book, borrow a book, return a book.",
    text: "BookNook is one shared shelf. Anyone can put a book on it, and anyone can take it home for a week.",
  },
  {
    title: "See how many copies are left before you borrow.",
    text: "Every card shows what is on the shelf. When the last copy goes out, the button says Not Available.",
  },
  {
    title: "Everything you borrowed, in one list.",
    text: "Check what you have, see when it is due, and return it with a single click.",
  },
];

export default function BookSlider() {
  return (
    <section className="bg-[#12383A] text-[#F2F7F5]" aria-label="Featured">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="pb-10"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={s.title}>
            <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20">
              <div>
                <h1 className="text-4xl leading-tight md:text-5xl">{s.title}</h1>
                <p className="mt-5 max-w-md text-lg text-[#F2F7F5]/80">{s.text}</p>
                <Link href="/books" className="btn btn-secondary mt-8">Browse Books</Link>
              </div>
              <Shelf shift={i * 3} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
