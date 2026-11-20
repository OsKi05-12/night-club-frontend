"use client";

import { useActionState } from "react";

const fieldClass =
  "border border-zinc-500 bg-transparent p-4 focus-visible:outline-2 focus-visible:outline-pink-500";

export default function ContactForm({ sendMessage }) {
  const [state, formAction, isPending] = useActionState(sendMessage, {
    message: "",
  });

  return (
    <form
      action={formAction}
      className="mx-auto flex w-full max-w-md flex-col gap-4"
    >
      <input
        className={fieldClass}
        type="text"
        name="name"
        placeholder="Your name"
        aria-label="Your name"
        required
      />

      <input
        className={fieldClass}
        type="email"
        name="email"
        placeholder="Your email"
        aria-label="Your email"
        required
      />

      <textarea
        className={fieldClass}
        name="content"
        placeholder="Your message"
        aria-label="Your message"
        rows={8}
        required
      />

      <button
        type="submit"
        disabled={isPending}
        className="ml-auto border-y border-white px-8 py-3 focus-visible:outline-2 focus-visible:outline-pink-500 disabled:opacity-50"
      >
        {isPending ? "Sending..." : "Send"}
      </button>

      <p role="status">{state.message}</p>
    </form>
  );
}
