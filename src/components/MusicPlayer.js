"use client";

import { useState } from "react";

const tracks = [
  {
    title: "Euphoria",
    image: "/assets/content-img/track1.jpg",
    audio: "/assets/media/euphoria.mp3",
  },
  {
    title: "Fashion Red Tape",
    image: "/assets/content-img/track2.jpg",
    audio: "/assets/media/fashion-red-tape.mp3",
  },
  {
    title: "Black Box Funky",
    image: "/assets/content-img/track4.jpg",
    audio: "/assets/media/black-box-funky.mp3",
  },
];

export default function MusicPlayer() {
  const [selected, setSelected] = useState(0);

  return (
    <section className="bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-4xl font-bold uppercase tracking-widest">
          Night Club Track
        </h2>

        <img
          src="/assets/bottom_line2.png"
          alt=""
          className="mx-auto mt-2 mb-12"
        />

        <div className="grid items-center gap-8 md:grid-cols-2">
          <img
            src={tracks[selected].image}
            alt={tracks[selected].title}
            className="h-80 w-full object-cover"
          />

          <div>
            <h3 className="mb-6 text-2xl font-bold uppercase">
              {tracks[selected].title}
            </h3>

            <audio
              key={selected}
              src={tracks[selected].audio}
              controls
              autoPlay={selected !== 0}
              className="w-full"
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4">
          {tracks.map((track, index) => (
            <button
              key={track.title}
              onClick={() => setSelected(index)}
              className={`cursor-pointer border-2 ${
                selected === index ? "border-pink-500" : "border-transparent"
              }`}
            >
              <img
                src={track.image}
                alt={track.title}
                className="h-40 w-full object-cover"
              />

              <p className="py-3">{track.title}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
