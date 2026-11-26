"use client";

import { useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

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

export default function BookingForm({ events, reservations, initialEventId }) {
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
    "w-full border border-zinc-600 bg-transparent p-4 text-white outline-none focus:border-pink-500";

  async function handleSubmit(event) {
    event.preventDefault();

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

    const reservation = {
      name: formData.get("name").trim(),
      email: formData.get("email").trim(),
      table,
      guests: formData.get("guests"),
      date: selectedEvent.doorsOpen || selectedEvent.date,
      phone: formData.get("phone").trim(),
      eventId: selectedEvent.id,
    };

    if (!reservation.name || reservation.phone.replace(/\D/g, "").length < 8) {
      setMessage("Please enter a valid name and phone number.");
      return;
    }

    setPending(true);

    try {
      const response = await fetch(`${apiUrl}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservation),
      });

      if (response.status === 409) {
        setBookings((previous) => [
          ...previous,
          { table: reservation.table, date: reservation.date },
        ]);

        setTable("");
        setMessage("This table is already reserved.");
        return;
      }

      if (!response.ok) {
        setMessage("Please check your booking details.");
        return;
      }

      setBookings((previous) => [
        ...previous,
        { table: reservation.table, date: reservation.date },
      ]);

      setSuccess(true);
      setMessage("Your table has been successfully reserved!");

      form.reset();
      setTable("");
    } catch {
      setMessage("Something went wrong. Please try again.");
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
                aria-label={`Table ${item.number}, ${item.capacity} guests${isReserved ? ", reserved" : ""}`}
                aria-pressed={isSelected}
                onClick={() => {
                  setTable(String(item.number));
                  setMessage("");
                }}
                className={`relative flex h-28 items-center justify-center border-2 transition-colors ${
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

        <form onSubmit={handleSubmit}>
          <fieldset
            disabled={pending}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              aria-label="Your Name"
              required
              className={inputStyle}
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              aria-label="Your Email"
              required
              className={inputStyle}
            />

            <input
              type="text"
              name="table"
              placeholder="Table Number"
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
              }}
              className={`${inputStyle} bg-black`}
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
              required
              className={inputStyle}
            />
          </fieldset>

          {message && (
            <p
              role="status"
              className={`mt-6 ${success ? "text-green-400" : "text-red-400"}`}
            >
              {message}
            </p>
          )}

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={pending}
              className="cursor-pointer border-y border-white px-10 py-3 uppercase transition-colors hover:border-pink-500 hover:bg-pink-500 disabled:opacity-50"
            >
              {pending ? "Reserving..." : "Reserve"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
