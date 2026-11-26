import { revalidatePath } from "next/cache";
import TopNav from "../../components/TopNav";
import PageHeader from "../../components/PageHeader";
import BookingForm from "../../components/BookingForm";

export default async function BookingPage({ searchParams }) {
  const { eventId } = await searchParams;
  const apiUrl = process.env.API_URL || "http://localhost:4000";

  async function reserveTable(formData) {
    "use server";

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();

    const table = Number(formData.get("table"));
    const guests = Number(formData.get("guests"));
    const selectedEventId = Number(formData.get("eventId"));

    if (!name || name.length > 100) {
      return {
        success: false,
        message: "Please enter your name using at most 100 characters.",
      };
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!validEmail.test(email) || email.length > 254) {
      return {
        success: false,
        message: "Please enter a valid email address.",
      };
    }

    if (
      phone.replace(/\D/g, "").length < 8 ||
      phone.length > 30 ||
      !/^[+\d\s().-]+$/.test(phone)
    ) {
      return {
        success: false,
        message: "Please enter a valid phone number with at least 8 digits.",
      };
    }

    if (!Number.isInteger(table) || table < 1 || table > 15) {
      return {
        success: false,
        message: "Please select a table.",
      };
    }

    const capacity = table % 5 === 0 ? 8 : table % 5 === 3 ? 6 : 4;

    if (!Number.isInteger(guests) || guests < 1 || guests > capacity) {
      return {
        success: false,
        message: `Please choose between 1 and ${capacity} guests for this table.`,
      };
    }

    if (!Number.isInteger(selectedEventId) || selectedEventId < 1) {
      return {
        success: false,
        message: "Please select a night.",
      };
    }

    let reservation;

    try {
      // Hent eventets dato fra API'et frem for browseren.
      const eventResponse = await fetch(`${apiUrl}/events/${selectedEventId}`, {
        cache: "no-store",
      });

      if (eventResponse.status === 404) {
        return {
          success: false,
          message:
            "This event is no longer available. Please select another night.",
        };
      }

      if (!eventResponse.ok) {
        return {
          success: false,
          message: "The selected event could not be loaded. Please try again.",
        };
      }

      const selectedEvent = await eventResponse.json();
      const date = selectedEvent.doorsOpen || selectedEvent.date;

      reservation = {
        table: String(table),
        date,
      };

      const response = await fetch(`${apiUrl}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          table: String(table),
          guests: String(guests),
          date,
          eventId: selectedEvent.id,
        }),
      });

      if (response.status === 409) {
        return {
          success: false,
          conflict: true,
          reservation,
          message:
            "This table is already reserved. Please select another table.",
        };
      }

      if (!response.ok) {
        return {
          success: false,
          message:
            response.status === 400
              ? "Your booking could not be accepted. Please check your details."
              : "Your booking could not be completed. Please try again later.",
        };
      }
    } catch (error) {
      console.error("Reserve table:", error);

      return {
        success: false,
        message: "We could not connect to the server. Please try again later.",
      };
    }

    revalidatePath("/booking");

    return {
      success: true,
      reservation,
      message: "Your table has been successfully reserved!",
    };
  }

  let events = [];
  let reservations = [];
  let errorMessage = "";

  try {
    const [eventsResponse, reservationsResponse] = await Promise.all([
      fetch(`${apiUrl}/events`, { cache: "no-store" }),
      fetch(`${apiUrl}/reservations`, { cache: "no-store" }),
    ]);

    if (!eventsResponse.ok || !reservationsResponse.ok) {
      throw new Error("Could not load booking data");
    }

    events = await eventsResponse.json();

    const data = await reservationsResponse.json();

    reservations = data.map(({ table, date }) => ({
      table,
      date,
    }));
  } catch (error) {
    console.error("Booking page:", error);

    errorMessage = "Booking is currently unavailable. Please try again later.";
  }

  return (
    <>
      <TopNav />

      <main className="flex-1 bg-black text-white">
        <PageHeader title="Book Table" />

        {errorMessage ? (
          <p role="alert" className="px-6 py-20 text-center">
            {errorMessage}
          </p>
        ) : events.length === 0 ? (
          <p className="px-6 py-20 text-center">
            There are currently no events available for booking.
          </p>
        ) : (
          <BookingForm
            events={events}
            reservations={reservations}
            initialEventId={eventId}
            reserveTable={reserveTable}
          />
        )}
      </main>
    </>
  );
}
