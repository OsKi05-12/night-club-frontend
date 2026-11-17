import { connection } from "next/server";
import TopNav from "../components/TopNav";

export default async function Home() {
  await connection();

  const heroImages = [
    "/assets/bg/header_bg_1.jpg",
    "/assets/bg/header_bg_2.jpg",
  ];
  const randomIndex = Math.floor(Math.random() * heroImages.length);
  const selectedImage = heroImages[randomIndex];

  return (
    <>
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
            className="hero-logo mx-auto w-64"
          />

          <img
            src="/assets/bottom_line2.png"
            alt="Bottom Line"
            className="hero-line mx-auto mt-2"
          />
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
              alt="Bottom Line"
              className="mx-auto mt-2"
            />

            <div className="mt-16 grid grid-cols-1 gap-7 md:grid-cols-3">
              <img
                src="/assets/content-img/thumb1.jpg"
                alt="Festdækket bord"
                className="h-[450px] w-full object-cover"
              />

              <img
                src="/assets/content-img/food_1.jpg"
                alt="Servering af mad"
                className="h-[450px] w-full object-cover"
              />

              <img
                src="/assets/content-img/thumb2.jpg"
                alt="Gæster i natklub"
                className="h-[450px] w-full object-cover"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
