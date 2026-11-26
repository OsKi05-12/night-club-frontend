import TopNav from "../../components/TopNav";
import PageHeader from "../../components/PageHeader";
import BookingForm from "../../components/BookingForm";

export default async function BookingPage({ searchParams }) {
  const { eventId } = await searchParams;
  const apiUrl = process.env.API_URL || "http://localhost:4000";

  const [eventsResponse, reservationsResponse] = await Promise.all([
    fetch(`${apiUrl}/events`, { cache: "no-store" }),
    fetch(`${apiUrl}/reservations`, { cache: "no-store" }),
  ]);

  if (!eventsResponse.ok || !reservationsResponse.ok) {
    return (
      <>
        <TopNav />
        <main className="flex-1 bg-black text-white">
          <PageHeader title="Book Table" />
          <p className="py-20 text-center">Booking is currently unavailable.</p>
        </main>
      </>
    );
  }

  const events = await eventsResponse.json();
  const data = await reservationsResponse.json();

  const reservations = data.map(({ table, date }) => ({
    table,
    date,
  }));

  return (
    <>
      <TopNav />

      <main className="flex-1 bg-black text-white">
        <PageHeader title="Book Table" />

        <BookingForm
          events={events}
          reservations={reservations}
          initialEventId={eventId}
        />
      </main>
    </>
  );
}
