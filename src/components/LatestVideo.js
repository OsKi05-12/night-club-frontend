"use client";

import { useState } from "react";

const videos = [
  "/assets/media/video-dj-crowd-2-mp4",
  "/assets/media/video-dj-crowd1.mp4",
];

export default function LatestVideo() {
  const [selected, setSelected] = useState(0);

  return (
    <section className="bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-4xl font-bold uppercase tracking-widest">
          Latest Video
        </h2>

        <img
          src="/assets/bottom_line2.png"
          alt=""
          className="mx-auto mt-2 mb-12"
        />

        <div className="relative">
          <video
            key={selected}
            src={videos[selected]}
            poster="/assets/content-img/video_poster.jpg"
            controls
            className="w-full"
          />

          <div className="pointer-events-none absolute top-0 left-0 border-t-[70px] border-r-[70px] border-t-pink-500 border-r-transparent" />

          <div className="pointer-events-none absolute right-0 bottom-0 border-b-[70px] border-l-[70px] border-b-pink-500 border-l-transparent" />
        </div>

        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={() => setSelected(selected === 0 ? 1 : 0)}
            aria-label="Previous video"
            className="h-10 w-10 cursor-pointer border border-white hover:bg-pink-500"
          >
            ◀
          </button>

          <button
            onClick={() => setSelected(selected === 0 ? 1 : 0)}
            aria-label="Next video"
            className="h-10 w-10 cursor-pointer border border-white hover:bg-pink-500"
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  );
}
