import Link from "next/link";

export default async function FeaturedEvents() {
  const apiUrl = process.env.API_URL || "http://localhost:4000";

  let featuredEvents = [];

  try {
    const response = await fetch(`${apiUrl}/events`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Could not load events");
    }

    const events = await response.json();

    featuredEvents = events.filter((event) => event.isFeatured === true);
  } catch (error) {
    return (
      <section className="bg-black px-6 py-20 text-center text-white">
        <h2 className="mb-12 text-3xl font-bold uppercase">
          Events of the Month
        </h2>

        <p>Events could not be loaded. Please try again later.</p>
      </section>
    );
  }

  return (
    <section className="bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-4xl font-bold uppercase tracking-widest">
          Events of the Month
        </h2>

        <img
          src="/assets/bottom_line2.png"
          alt=""
          className="mx-auto mb-12 mt-2"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {featuredEvents.map((event) => {
            const date = new Date(event.date);

            const eventDate = date.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              timeZone: "Europe/Copenhagen",
            });

            const eventTime = date.toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Europe/Copenhagen",
            });

            return (
              <article key={event.id} className="group">
                <div className="relative aspect-[570/403] overflow-hidden">
                  <img
                    src={new URL(event.asset.url, apiUrl).href}
                    alt={event.asset.alt}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/50 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100" />

                  <div className="absolute left-0 top-0 h-0.5 w-full bg-pink-500 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100" />

                  <div className="absolute left-0 top-[30%] flex w-full justify-center transition-all duration-500 md:-translate-y-8 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100">
                    <Link
                      href={`/booking?eventId=${event.id}`}
                      className="bg-pink-500 px-7 py-3 text-sm font-bold text-white hover:bg-pink-600"
                    >
                      Book Now
                    </Link>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full bg-black/80 p-5 transition-transform duration-500 md:translate-y-full md:group-hover:translate-y-0 md:group-focus-within:translate-y-0">
                    <h3 className="mb-2 text-lg font-bold uppercase">
                      {event.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-gray-200">
                      {event.excerpt}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-5 bg-pink-500 px-5 py-3 text-sm font-semibold">
                  <span>{eventDate}</span>
                  <span>{eventTime}</span>
                  <span>{event.location}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
