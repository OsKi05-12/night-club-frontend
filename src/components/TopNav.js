import Link from "next/link";

export default function TopNav() {
  return (
    <nav
      aria-label="Hovednavigation"
      className="sticky top-0 z-50 flex items-center justify-between border-y border-pink-500 bg-black px-10 py-5 text-white"
    >
      <Link href="/">
        <img
          src="/assets/icon/Logo_header.svg"
          alt="Night Club"
          className="w-48"
        />
      </Link>

      <div className="flex items-center gap-8">
        <Link className="hover:text-pink-500" href="/">
          Home
        </Link>

        <Link className="hover:text-pink-500" href="/events">
          Events
        </Link>

        <Link className="hover:text-pink-500" href="/booking">
          Book Table
        </Link>

        <Link className="hover:text-pink-500" href="/contact">
          Contact Us
        </Link>
      </div>
    </nav>
  );
}
