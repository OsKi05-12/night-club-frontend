import { connection } from "next/server";

export default async function Home() {
  await connection();

  const heroImages = [
    "/assets/bg/header_bg_1.jpg",
    "/assets/bg/header_bg_2.jpg",
  ];
  const randomIndex = Math.floor(Math.random() * heroImages.length);
  const selectedImage = heroImages[randomIndex];
  return (
    <main>
      <section
        className="flex min-h-screen items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url('${selectedImage}')`,
        }}
      >
        <div className="text-center">
          <img
            src="/assets/icon/logo.svg"
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
      <section className="bg-black px-6 py-20 text-center text-white">
        <h2 className="text-4xl font-bold">Welcome to Night Club</h2>
      </section>
    </main>
  );
}
