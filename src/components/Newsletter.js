"use client";

import { useActionState } from "react";
import { subscribeToNewsletter } from "../app/newsletter-actions";

const initialState = {
  success: false,
  message: "",
};

export default function Newsletter() {
  const [state, formAction, isPending] = useActionState(
    subscribeToNewsletter,
    initialState,
  );

  return (
    <section className="newsletter-section" aria-labelledby="newsletter-title">
      <div className="newsletter-content">
        <h2 id="newsletter-title">Want the latest Night Club news</h2>

        <p className="newsletter-description">
          Subscribe to our newsletter and never miss an <span>Event</span>
        </p>

        <form action={formAction} className="newsletter-form">
          <label htmlFor="newsletter-email" className="sr-only">
            Your email address
          </label>

          <input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Enter Your Email"
            required
            maxLength={254}
            aria-describedby="newsletter-message"
          />

          <button type="submit" disabled={isPending}>
            {isPending ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        <p
          id="newsletter-message"
          className="newsletter-message"
          role="status"
          aria-atomic="true"
        >
          {state.message}
        </p>
      </div>
    </section>
  );
}
