import Link from "next/link";
import TopNav from "../../components/TopNav";
import PageHeader from "../../components/PageHeader";
import ReadMoreButton from "../../components/ReadMoreButton";

export default async function EventsPage({ searchParams }) {
  const params = await searchParams;

  const apiUrl = process.env.API_URL || "http://localhost:4000";

  let events = [];
  let errorMessage = "";

  try {
    const response = await fetch(`${apiUrl}/events`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Could not load events");
    }

    events = await response.json();
  } catch (error) {
    console.error("Events:", error);

    errorMessage = "Events could not be loaded. Please try again later.";
  }

  const eventsPerPage = 3;

  const totalPages = Math.max(1, Math.ceil(events.length / eventsPerPage));

  const requestedPage = Number(params.page);

  const currentPage = Number.isInteger(requestedPage)
    ? Math.min(Math.max(requestedPage, 1), totalPages)
    : 1;

  const startIndex = (currentPage - 1) * eventsPerPage;

  const visibleEvents = events.slice(startIndex, startIndex + eventsPerPage);

  return (
    <>
      <TopNav />

      <main className="flex-1 bg-black text-white">
        <PageHeader title="Events" />

        <section
          aria-label="Upcoming events"
          className="bg-[url('/assets/bg/pattern_bg.jpg')] py-12"
        >
          {errorMessage ? (
            <p role="alert" className="px-6 py-12 text-center">
              {errorMessage}
            </p>
          ) : events.length === 0 ? (
            <p className="px-6 py-12 text-center">
              There are no events to show right now.
            </p>
          ) : (
            <>
              <div className="mx-auto max-w-7xl">
                {visibleEvents.map((event, index) => {
                  const date = new Date(event.date);

                  const eventDate = date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    timeZone: "Europe/Copenhagen",
                  });

                  const eventTime = date.toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "Europe/Copenhagen",
                  });

                  return (
                    <article
                      key={event.id}
                      className="grid bg-black md:grid-cols-2"
                    >
                      <img
                        src={new URL(event.asset.url, apiUrl).href}
                        alt={event.asset.alt || event.title}
                        width={event.asset.width}
                        height={event.asset.height}
                        loading="lazy"
                        className={`h-full min-h-64 w-full object-cover ${
                          index % 2 === 1 ? "md:order-2" : ""
                        }`}
                      />

                      <div className="flex flex-col items-start px-6 py-10 md:min-h-80 md:px-10 lg:px-16">
                        <h2 className="text-lg font-semibold uppercase">
                          {event.title}
                        </h2>

                        <p className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                          <time dateTime={event.date} className="text-pink-500">
                            {eventDate} · {eventTime}
                          </time>

                          <span aria-hidden="true">|</span>

                          <span className="uppercase">{event.location}</span>
                        </p>

                        <p className="mt-5 text-sm leading-7 text-zinc-300">
                          {event.excerpt}
                        </p>

                        <div className="mt-auto self-end pt-8">
                          <ReadMoreButton
                            href={`/events/${event.slug || event.id}`}
                          />
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <nav
                  aria-label="Event pages"
                  className="mt-12 flex flex-wrap items-center justify-center gap-2 px-6"
                >
                  {Array.from({ length: totalPages }, (_, index) => {
                    const pageNumber = index + 1;

                    return (
                      <Link
                        key={pageNumber}
                        href={`/events?page=${pageNumber}`}
                        aria-label={`Page ${pageNumber}`}
                        aria-current={
                          currentPage === pageNumber ? "page" : undefined
                        }
                        className={`flex min-h-11 min-w-11 items-center justify-center hover:text-pink-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-500 ${
                          currentPage === pageNumber
                            ? "text-pink-500 underline underline-offset-4"
                            : "text-white"
                        }`}
                      >
                        {pageNumber}
                      </Link>
                    );
                  })}

                  {currentPage < totalPages && (
                    <Link
                      href={`/events?page=${currentPage + 1}`}
                      className="inline-flex min-h-11 items-center px-3 hover:text-pink-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-500"
                    >
                      Next &gt;
                    </Link>
                  )}
                </nav>
              )}
            </>
          )}
        </section>
      </main>
    </>
  );
}
