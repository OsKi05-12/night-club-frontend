import TopNav from "../../components/TopNav";
import PageHeader from "../../components/PageHeader";
import EventSearch from "../../components/EventSearch";

export default async function EventsPage() {
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

    const data = await response.json();

    events = data.map((event) => ({
      ...event,
      imageUrl: new URL(event.asset.url, apiUrl).href,
    }));
  } catch (error) {
    console.error("Events:", error);

    errorMessage = "Events could not be loaded. Please try again later.";
  }

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
            <EventSearch events={events} />
          )}
        </section>
      </main>
    </>
  );
}
