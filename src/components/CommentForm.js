"use client";

import { useActionState } from "react";

export default function CommentForm({ action }) {
  const [state, formAction, isPending] = useActionState(action, {
    success: false,
    message: "",
  });

  return (
    <section className="mt-14" aria-labelledby="comment-form-title">
      <h2 id="comment-form-title" className="mb-6 text-2xl font-bold uppercase">
        Leave a comment
      </h2>

      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="comment-name" className="sr-only">
            Your name
          </label>

          <input
            id="comment-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your Name"
            required
            maxLength={100}
            aria-describedby="comment-message"
            className="min-h-11 w-full border border-zinc-500 bg-transparent px-4 py-3 text-sm text-white placeholder:text-zinc-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
          />
        </div>

        <div>
          <label htmlFor="comment-content" className="sr-only">
            Your comment
          </label>

          <textarea
            id="comment-content"
            name="content"
            placeholder="Your Comment"
            required
            maxLength={2000}
            rows={8}
            aria-describedby="comment-message"
            className="w-full border border-zinc-500 bg-transparent px-4 py-3 text-sm text-white placeholder:text-zinc-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
          />
        </div>

        <p
          id="comment-message"
          role="status"
          className={
            state.success ? "text-sm text-green-400" : "text-sm text-pink-500"
          }
        >
          {state.message}
        </p>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="read-more-button cursor-pointer disabled:cursor-wait disabled:opacity-50"
          >
            {isPending ? "Sending..." : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
}
