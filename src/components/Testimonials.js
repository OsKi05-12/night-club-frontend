"use client";

import { useState } from "react";

export default function Testimonials({ testimonials = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const testimonial = testimonials[selectedIndex];

  if (!testimonial) {
    return (
      <section className="testimonials-bg px-6 py-20 text-center text-white">
        <p>Reviews could not be loaded. Please try again later.</p>
      </section>
    );
  }

  return (
    <section
      className="testimonials-bg px-6 py-20 text-center text-white"
      aria-label="Guest reviews"
    >
      <div className="mx-auto max-w-2xl">
        <div aria-live="polite" aria-atomic="true">
          <img
            src={testimonial.src}
            alt={testimonial.alt}
            width={170}
            height={170}
            className="mx-auto size-28 object-cover"
          />

          <h2 className="mt-5 text-lg font-semibold uppercase">
            {testimonial.name}
          </h2>

          <blockquote className="mt-4 leading-7">
            <p>{testimonial.content}</p>
          </blockquote>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          {testimonial.facebook && (
            <a
              href={testimonial.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${testimonial.name} on Facebook`}
              className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-500"
            >
              <img
                src="/assets/icon/facebook.png"
                alt=""
                width={36}
                height={36}
                className="size-9 object-contain"
              />
            </a>
          )}

          {testimonial.twitter && (
            <a
              href={testimonial.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${testimonial.name} on Twitter`}
              className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-500"
            >
              <img
                src="/assets/icon/twitter2.png"
                alt=""
                width={36}
                height={36}
                className="size-9 object-contain"
              />
            </a>
          )}

          <img
            src="/assets/icon/snap.png"
            alt="Snapchat"
            width={36}
            height={36}
            className="size-9 object-contain"
          />
        </div>

        <div
          className="mt-8 flex justify-center"
          role="group"
          aria-label="Choose a guest review"
        >
          {testimonials.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className="testimonial-dot"
              aria-label={`Show review by ${item.name}`}
              aria-pressed={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
