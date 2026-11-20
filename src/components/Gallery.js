"use client";

import { useEffect, useRef, useState } from "react";

export default function Gallery({ images }) {
  const galleryRef = useRef(null);
  const dialogRef = useRef(null);

  const [selectedIndex, setSelectedIndex] = useState(null);

  const selectedImage = selectedIndex === null ? null : images[selectedIndex];

  useEffect(() => {
    const gallery = galleryRef.current;

    if (!gallery) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gallery.classList.add("gallery-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(gallery);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selectedIndex !== null && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [selectedIndex]);

  function showPrevious() {
    setSelectedIndex((index) => (index === 0 ? images.length - 1 : index - 1));
  }

  function showNext() {
    setSelectedIndex((index) => (index === images.length - 1 ? 0 : index + 1));
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  }

  return (
    <section className="gallery-section py-20 text-white">
      <h2 className="text-center text-3xl font-bold uppercase">
        Night Club Gallery
      </h2>

      <img src="/assets/bottom_line2.png" alt="" className="mx-auto mt-2" />

      {images.length === 0 ? (
        <p className="mt-10 text-center">
          The gallery could not be loaded. Please try again later.
        </p>
      ) : (
        <div ref={galleryRef} className="gallery-grid mt-16">
          {images.slice(0, 7).map((image, index) => (
            <button
              key={image.id}
              type="button"
              className="gallery-card"
              aria-label={`Open photo: ${image.alt}`}
              onClick={() => setSelectedIndex(index)}
            >
              <img src={image.src} alt="" loading="lazy" />

              <span className="gallery-overlay" aria-hidden="true">
                +
              </span>
            </button>
          ))}
        </div>
      )}

      <dialog
        ref={dialogRef}
        className="gallery-dialog"
        aria-label="Gallery photo"
        onKeyDown={handleKeyDown}
        onClose={() => setSelectedIndex(null)}
      >
        <button
          type="button"
          className="gallery-close"
          aria-label="Close photo"
          onClick={() => dialogRef.current.close()}
        >
          ×
        </button>

        {selectedImage && (
          <>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="gallery-large-image"
            />

            <div className="gallery-caption">
              <h3 className="text-lg font-bold uppercase">Night Club Party</h3>

              <p className="mt-2">{selectedImage.description}</p>
            </div>

            <div className="gallery-controls">
              <button
                type="button"
                className="gallery-arrow"
                aria-label="Previous photo"
                onClick={showPrevious}
              >
                ←
              </button>

              <p aria-live="polite">
                {selectedIndex + 1} / {images.length}
              </p>

              <button
                type="button"
                className="gallery-arrow"
                aria-label="Next photo"
                onClick={showNext}
              >
                →
              </button>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
