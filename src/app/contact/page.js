import TopNav from "../../components/TopNav";
import PageHeader from "../../components/PageHeader";
import ContactForm from "./ContactForm";

export default function ContactPage() {
  async function sendMessage(_previousState, formData) {
    "use server";

    const name = formData.get("name")?.trim();
    const email = formData.get("email")?.trim();
    const content = formData.get("content")?.trim();

    if (!name || !email || !content) {
      return { message: "Please fill in all three fields." };
    }

    const apiUrl = process.env.API_URL || "http://localhost:4000";

    try {
      const response = await fetch(`${apiUrl}/contact_messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          content,
          date: new Date().toISOString(),
        }),
      });

      if (response.status === 400) {
        return { message: "Please check your name, email and message." };
      }

      if (!response.ok) {
        return { message: "Could not send your message. Please try again." };
      }

      return { message: "Message sent!" };
    } catch {
      return { message: "Could not send your message. Please try again." };
    }
  }

  return (
    <>
      <TopNav />

      <main className="flex-1 bg-zinc-950 text-white">
        <PageHeader title="Contact Us" />

        <div className="px-6 py-20">
          <ContactForm sendMessage={sendMessage} />
        </div>
      </main>
    </>
  );
}
