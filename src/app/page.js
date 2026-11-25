import { connection } from "next/server";
import Link from "next/link";
import TopNav from "../components/TopNav";
import HoverCard from "../components/HoverCard";
import FeaturedEvents from "../components/FeaturedEvents";
import Gallery from "../components/Gallery";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import MusicPlayer from "../components/MusicPlayer";
import LatestVideo from "../components/LatestVideo";
import Loader from "../components/Loader";

export default async function Home() {
  await connection();

  const heroImages = [
    "/assets/bg/header_bg_1.jpg",
    "/assets/bg/header_bg_2.jpg",
  ];

  // eslint-disable-next-line react-hooks/purity
  const randomIndex = Math.floor(Math.random() * heroImages.length);
  const selectedImage = heroImages[randomIndex];

  const apiUrl = process.env.API_URL || "http://localhost:4000";

  let galleryImages = [];
  let testimonials = [];

  try {
    const response = await fetch(`${apiUrl}/gallery`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Could not load gallery");
    }

    const data = await response.json();

    galleryImages = data.map((image) => ({
      id: image.id,
      src: new URL(image.asset.url, apiUrl).href,
      alt: image.asset.alt,
      description: image.description,
    }));
  } catch (error) {
    console.error("Gallery:", error);
  }

  try {
    const response = await fetch(`${apiUrl}/testimonials`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Could not load testimonials");
    }

    const data = await response.json();

    testimonials = data.map((item) => ({
      id: item.id,
      name: item.name,
      content: item.content,
      facebook: item.facebook,
      twitter: item.twitter,
      src:
        item.id === 1
          ? "/assets/content-img/testimonial_3.jpg"
          : item.id === 3
            ? "/assets/content-img/testimonial_1.jpg"
            : new URL(item.asset.url, apiUrl).href,
      alt: item.asset.alt,
    }));
  } catch (error) {
    console.error("Testimonials:", error);
  }

  return (
    <>
      <Loader />

      <section
        className="flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url('${selectedImage}')`,
          minHeight: "calc(100svh - 6rem)",
        }}
      >
        <div className="text-center">
          <img
            src="/assets/icon/Logo.svg"
            alt="Night Club"
            className="hero-logo mx-auto w-144"
          />

          <img
            src="/assets/bottom_line2.png"
            alt=""
            className="hero-line mx-auto mt-2 w-120"
          />

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/events"
              className="border-2 border-white bg-transparent px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-white hover:text-black"
            >
              VIEW EVENTS
            </Link>

            <Link href="/booking" className="cta-button">
              BOOK TABLE
            </Link>
          </div>
        </div>
      </section>

      <TopNav />

      <main>
        <section className="bg-black px-6 py-20 text-white">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-4xl font-bold uppercase tracking-widest">
              Welcome in Nightclub
            </h2>

            <img
              src="/assets/bottom_line2.png"
              alt=""
              className="mx-auto mt-2"
            />

            <div className="mt-16 grid grid-cols-1 gap-7 md:grid-cols-3">
              {[
                {
                  title: "Night Club",
                  image: "/assets/content-img/thumb1.jpg",
                  description:
                    "Experience unforgettable nights with great music and atmosphere.",
                },
                {
                  title: "Restaurant",
                  image: "/assets/content-img/food_1.jpg",
                  description:
                    "Enjoy delicious food and a unique dining experience.",
                },
                {
                  title: "Bar",
                  image: "/assets/content-img/thumb2.jpg",
                  description:
                    "Discover our cocktails and enjoy an evening with friends.",
                },
              ].map((item) => (
                <HoverCard
                  key={item.title}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </section>

        <FeaturedEvents />

        <Gallery images={galleryImages} />

        <section className="bg-black px-6 py-20 text-white">
          <div className="mx-auto max-w-6xl">
            <MusicPlayer />

            <LatestVideo />
          </div>
        </section>

        <Testimonials testimonials={testimonials} />

        <Newsletter />
      </main>
    </>
  );
}
