"use client";

import { useState } from "react";

const tables = Array.from({ length: 15 }, (_, index) => {
  const number = index + 1;
  const type = number % 5 === 0 ? 3 : number % 5 === 3 ? 2 : 1;

  return {
    number,
    capacity: type === 3 ? 8 : type === 2 ? 6 : 4,
    image: `/assets/icon/table${type}.svg`,
  };
});

function getDate(date) {
  return new Date(date).toLocaleDateString("en-CA", {
    timeZone: "Europe/Copenhagen",
  });
}

export default function BookingForm({
  events,
  reservations,
  initialEventId,
  reserveTable,
}) {
  const [eventId, setEventId] = useState(
    events.some((event) => String(event.id) === initialEventId)
      ? initialEventId
      : "",
  );

  const [table, setTable] = useState("");
  const [bookings, setBookings] = useState(reservations);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);

  const selectedEvent = events.find((event) => String(event.id) === eventId);

  const selectedTable = tables.find((item) => String(item.number) === table);

  const reservedTables = selectedEvent
    ? bookings
        .filter(
          (booking) => getDate(booking.date) === getDate(selectedEvent.date),
        )
        .map((booking) => String(booking.table))
    : [];

  const inputStyle =
    "w-full border border-zinc-600 bg-black p-4 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500";

  async function handleSubmit(event) {
    event.preventDefault();

    if (pending) return;

    setMessage("");
    setSuccess(false);

    if (!selectedEvent || !selectedTable) {
      setMessage("Please select a night and a table.");
      return;
    }

    if (reservedTables.includes(table)) {
      setMessage("This table is already reserved.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    setPending(true);

    try {
      const result = await reserveTable(formData);

      setSuccess(result.success);
      setMessage(result.message);

      if (result.reservation && (result.success || result.conflict)) {
        setBookings((previous) => [...previous, result.reservation]);

        setTable("");
      }

      if (result.success) {
        form.reset();
      }
    } catch {
      setMessage(
        "Your booking could not be completed. Please try again later.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5 md:gap-12">
          {tables.map((item) => {
            const isReserved = reservedTables.includes(String(item.number));

            const isSelected = table === String(item.number);

            return (
              <button
                key={item.number}
                type="button"
                disabled={isReserved || pending}
                aria-label={`Table ${item.number}, ${item.capacity} guests${
                  isReserved ? ", reserved" : ""
                }`}
                aria-pressed={isSelected}
                onClick={() => {
                  setTable(String(item.number));
                  setMessage("");
                  setSuccess(false);
                }}
                className={`relative flex h-28 items-center justify-center border-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-500 ${
                  isReserved
                    ? "cursor-not-allowed border-red-900 opacity-40"
                    : isSelected
                      ? "cursor-pointer border-pink-500"
                      : "cursor-pointer border-transparent hover:border-pink-500"
                }`}
              >
                <img
                  src={item.image}
                  alt=""
                  className="h-24 w-full object-contain"
                />

                <span className="absolute text-2xl font-bold">
                  {item.number}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
          <span className="text-zinc-400">■ Available</span>
          <span className="text-pink-500">■ Selected</span>
          <span className="text-red-500">■ Reserved</span>
        </div>

        <h2 className="mb-8 mt-20 text-3xl font-bold uppercase">
          Book a Table
        </h2>

        <form onSubmit={handleSubmit} aria-busy={pending}>
          <fieldset
            disabled={pending}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            <legend className="sr-only">Booking details</legend>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              aria-label="Your Name"
              autoComplete="name"
              required
              maxLength={100}
              className={inputStyle}
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              aria-label="Your Email"
              autoComplete="email"
              required
              maxLength={254}
              className={inputStyle}
            />

            <input
              type="text"
              name="table"
              placeholder="Select a table above"
              aria-label="Table Number"
              value={table}
              readOnly
              className={inputStyle}
            />

            <input
              type="number"
              name="guests"
              placeholder="Number of Guests"
              aria-label="Number of Guests"
              min="1"
              step="1"
              max={selectedTable?.capacity || 8}
              required
              className={inputStyle}
            />

            <select
              name="eventId"
              aria-label="Choose Night"
              value={eventId}
              required
              onChange={(event) => {
                setEventId(event.target.value);
                setTable("");
                setMessage("");
                setSuccess(false);
              }}
              className={inputStyle}
            >
              <option value="">Choose Night</option>

              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title} -{" "}
                  {new Date(event.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    timeZone: "Europe/Copenhagen",
                  })}
                </option>
              ))}
            </select>

            <input
              type="tel"
              name="phone"
              placeholder="Your Contact Number"
              aria-label="Your Contact Number"
              autoComplete="tel"
              required
              maxLength={30}
              className={inputStyle}
            />
          </fieldset>

          <p
            role="status"
            className={`mt-6 ${success ? "text-green-400" : "text-red-400"}`}
          >
            {message}
          </p>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={pending}
              className="read-more-button cursor-pointer disabled:cursor-wait disabled:opacity-50"
            >
              {pending ? "Reserving..." : "Reserve"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
