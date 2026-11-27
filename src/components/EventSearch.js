"use client";

import { useState } from "react";
import ReadMoreButton from "./ReadMoreButton";

export default function EventSearch({ events }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    ...new Set(events.map((event) => event.category).filter(Boolean)),
  ].sort();

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesCategory = category === "all" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  const eventsPerPage = 3;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredEvents.length / eventsPerPage),
  );

  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * eventsPerPage;

  const visibleEvents = filteredEvents.slice(
    startIndex,
    startIndex + eventsPerPage,
  );

  const fieldClass =
    "min-h-11 w-full border border-zinc-500 bg-black px-4 py-3 text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-500";

  function clearFilters() {
    setSearch("");
    setCategory("all");
    setCurrentPage(1);
  }

  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 pb-10">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="event-search"
              className="mb-2 block text-sm font-semibold"
            >
              Search events
            </label>

            <input
              id="event-search"
              type="search"
              placeholder="Search by event name..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
              }}
              className={fieldClass}
            />
          </div>

          <div>
            <label
              htmlFor="event-category"
              className="mb-2 block text-sm font-semibold"
            >
              Category
            </label>

            <select
              id="event-category"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
                setCurrentPage(1);
              }}
              className={fieldClass}
            >
              <option value="all">All categories</option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p role="status" className="text-sm text-zinc-300">
            {filteredEvents.length}{" "}
            {filteredEvents.length === 1 ? "event" : "events"} found
          </p>

          {(search !== "" || category !== "all") && (
            <button
              type="button"
              onClick={clearFilters}
              className="min-h-11 cursor-pointer px-3 text-sm underline underline-offset-4 hover:text-pink-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-500"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <p className="px-6 py-12 text-center text-zinc-300">
          No events match your search. Try another name or category.
        </p>
      ) : (
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
              <article key={event.id} className="grid bg-black md:grid-cols-2">
                <img
                  src={event.imageUrl}
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
      )}

      {totalPages > 1 && (
        <nav
          aria-label="Event pages"
          className="mt-12 flex flex-wrap items-center justify-center gap-2 px-6"
        >
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;

            return (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setCurrentPage(pageNumber)}
                aria-label={`Page ${pageNumber}`}
                aria-current={activePage === pageNumber ? "page" : undefined}
                className={`flex min-h-11 min-w-11 cursor-pointer items-center justify-center hover:text-pink-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-500 ${
                  activePage === pageNumber
                    ? "text-pink-500 underline underline-offset-4"
                    : "text-white"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          {activePage < totalPages && (
            <button
              type="button"
              onClick={() => setCurrentPage(activePage + 1)}
              className="min-h-11 cursor-pointer px-3 hover:text-pink-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-500"
            >
              Next &gt;
            </button>
          )}
        </nav>
      )}
    </div>
  );
}
