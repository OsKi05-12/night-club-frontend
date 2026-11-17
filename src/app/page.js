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
            src="/assets/logo/logo.svg"
            alt="Night Club"
            className="hero-logo mx-auto w-64"
          />
        </div>
      </section>
    </main>
  );
}
