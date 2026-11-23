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
    console.error("Featured Events:", error);

    return (
      <section className="bg-black px-6 py-20 text-center text-white">
        <h2 className="mb-12 text-3xl font-bold uppercase">Featured Events</h2>

        <p>Events could not be loaded. Please try again later.</p>
      </section>
    );
  }

  return (
    <section className="bg-black px-6 py-20 text-white">
      <h2 className="mb-12 text-center text-3xl font-bold uppercase">
        Featured Events
      </h2>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2">
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
              <div className="relative overflow-hidden">
                <img
                  src={new URL(event.asset.url, apiUrl).href}
                  alt={event.asset.alt || event.title}
                  className="h-80 w-full object-cover"
                />

                <div className="pointer-events-none absolute inset-0 bg-black/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none" />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-0 h-0 w-0 border-r-[35px] border-t-[35px] border-r-transparent border-t-pink-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none"
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 right-0 h-0 w-0 border-b-[35px] border-l-[35px] border-b-pink-600 border-l-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none"
                />

                <div className="absolute inset-0 flex flex-col items-center justify-between p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none">
                  <Link
                    href={`/booking?eventId=${event.id}`}
                    className="bg-pink-600 px-6 py-3 text-sm font-bold text-white hover:bg-pink-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    Book Now
                  </Link>

                  <div className="w-full bg-black/70 p-4">
                    <h3 className="mb-2 text-lg font-bold uppercase">
                      {event.title}
                    </h3>

                    <p className="text-sm text-gray-200">{event.excerpt}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 bg-pink-700 px-4 py-3 text-sm">
                <span className="font-semibold">{event.title}</span>

                <span>
                  {eventDate} · {eventTime} · {event.location}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
