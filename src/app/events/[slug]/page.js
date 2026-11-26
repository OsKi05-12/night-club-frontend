import Link from "next/link";
import { notFound } from "next/navigation";
import TopNav from "../../../components/TopNav";
import PageHeader from "../../../components/PageHeader";

export default async function EventDetailsPage({ params }) {
  const { slug } = await params;
  const apiUrl = process.env.API_URL || "http://localhost:4000";

  let event = null;
  let errorMessage = "";

  // Hent det event, der passer til adressens slug.
  try {
    const response = await fetch(
      `${apiUrl}/events/${encodeURIComponent(slug)}`,
      { cache: "no-store" },
    );

    if (response.status !== 404) {
      if (!response.ok) {
        throw new Error("Could not load event");
      }

      event = await response.json();
    }
  } catch (error) {
    console.error("Event details:", error);
    errorMessage = "The event could not be loaded. Please try again later.";
  }

  // Et ukendt event skal vise en 404-side.
  if (!event && !errorMessage) {
    notFound();
  }

  if (errorMessage) {
    return (
      <>
        <TopNav />

        <main className="flex-1 bg-black text-white">
          <PageHeader title="Event" />

          <p role="alert" className="px-6 py-20 text-center">
            {errorMessage}
          </p>
        </main>
      </>
    );
  }

  // Vis dato og tid i dansk tidszone.
  const eventDate = new Date(event.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Copenhagen",
  });

  const startTime = new Date(event.date).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Copenhagen",
  });

  const doorsOpen = new Date(event.doorsOpen).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Copenhagen",
  });

  return (
    <>
      <TopNav />

      <main className="flex-1 bg-black text-white">
        <PageHeader title={event.title} />

        <div className="bg-[url('/assets/bg/pattern_bg.jpg')] px-6 py-12 md:py-16">
          <article className="mx-auto max-w-5xl">
            <img
              src={new URL(event.heroAsset.url, apiUrl).href}
              alt={event.heroAsset.alt || event.title}
              width={event.heroAsset.width}
              height={event.heroAsset.height}
              className="h-auto w-full"
            />

            <div className="mt-10">
              <h2 className="text-2xl font-bold uppercase md:text-3xl">
                {event.title}
              </h2>

              <dl className="mt-6 grid grid-cols-1 gap-6 text-sm sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <dt className="font-semibold text-pink-500">Date</dt>
                  <dd className="mt-1">
                    <time dateTime={event.date}>{eventDate}</time>
                  </dd>
                </div>

                <div>
                  <dt className="font-semibold text-pink-500">Doors open</dt>
                  <dd className="mt-1">
                    <time dateTime={event.doorsOpen}>{doorsOpen}</time>
                  </dd>
                </div>

                <div>
                  <dt className="font-semibold text-pink-500">Start time</dt>
                  <dd className="mt-1">
                    <time dateTime={event.date}>{startTime}</time>
                  </dd>
                </div>

                <div>
                  <dt className="font-semibold text-pink-500">Location</dt>
                  <dd className="mt-1">{event.location}</dd>
                </div>

                <div>
                  <dt className="font-semibold text-pink-500">Category</dt>
                  <dd className="mt-1">{event.category}</dd>
                </div>

                <div>
                  <dt className="font-semibold text-pink-500">Price</dt>
                  <dd className="mt-1">{event.price}</dd>
                </div>

                <div>
                  <dt className="font-semibold text-pink-500">Age limit</dt>
                  <dd className="mt-1">{event.ageLimit}</dd>
                </div>
              </dl>

              <section className="mt-10" aria-labelledby="about-event">
                <h3
                  id="about-event"
                  className="text-xl font-semibold uppercase"
                >
                  About the event
                </h3>

                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-zinc-300">
                  {event.content}
                </p>
              </section>

              <div className="mt-10 grid gap-10 md:grid-cols-2">
                <section aria-labelledby="event-lineup">
                  <h3
                    id="event-lineup"
                    className="text-xl font-semibold uppercase"
                  >
                    Lineup
                  </h3>

                  <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-zinc-300">
                    {event.lineup.map((artist) => (
                      <li key={artist}>{artist}</li>
                    ))}
                  </ul>
                </section>

                <section aria-labelledby="event-program">
                  <h3
                    id="event-program"
                    className="text-xl font-semibold uppercase"
                  >
                    Program
                  </h3>

                  <ul className="mt-4 space-y-3 text-sm text-zinc-300">
                    {event.schedule.map((item, index) => (
                      <li key={`${item.time}-${index}`} className="flex gap-4">
                        <span className="shrink-0 font-semibold text-pink-500">
                          {item.time}
                        </span>

                        <span>{item.label}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <div className="mt-10 flex justify-end">
                <Link
                  href={`/booking?eventId=${event.id}`}
                  className="read-more-button"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </article>
        </div>
      </main>
    </>
  );
}
