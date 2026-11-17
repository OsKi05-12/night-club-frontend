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
            src="/assets/Logo.png"
            alt="Night Club"
            className="mx-auto w-64"
          />

          <p className="mt-4 text-xl uppercase tracking-widest text-white">
            Have a good time
          </p>
        </div>
      </section>
    </main>
  );
}
