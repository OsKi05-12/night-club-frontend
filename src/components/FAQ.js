const questions = [
  {
    question: "How do I book a table?",
    answer: "Choose an event and complete the booking form.",
  },
  {
    question: "Can I choose my own table?",
    answer: "Yes, select an available table on our booking page.",
  },
  {
    question: "How many guests can I bring?",
    answer: "It depends on the capacity of your selected table.",
  },
  {
    question: "Where can I find upcoming events?",
    answer: "Visit our Events page to see upcoming events.",
  },
  {
    question: "How can I contact Night Club?",
    answer: "Use the contact form on our Contact Us page.",
  },
];

export default function FAQ() {
  return (
    <section className="bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-4xl font-bold uppercase">
          Frequently Asked Questions
        </h2>

        <img src="/assets/bottom_line2.png" alt="" className="mx-auto mt-2" />

        <div className="mt-12">
          {questions.map((item) => (
            <details
              key={item.question}
              className="group border-b border-pink-500 py-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-semibold hover:text-pink-500">
                {item.question}
                <span className="text-2xl text-pink-500 group-open:hidden">
                  +
                </span>
                <span className="hidden text-2xl text-pink-500 group-open:block">
                  −
                </span>
              </summary>

              <p className="mt-4 text-gray-300">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
