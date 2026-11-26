import Link from "next/link";

export default function TopNav() {
  return (
    <nav
      aria-label="Hovednavigation"
      className="sticky top-0 z-50 flex items-center justify-between border-y border-pink-500 bg-black px-5 py-5 text-white md:px-10"
    >
      <Link href="/">
        <img
          src="/assets/icon/Logo_header.svg"
          alt="Night Club"
          className="w-40 md:w-48"
        />
      </Link>

      <div className="hidden items-center gap-8 md:flex">
        <Link className="nav-link" href="/">
          <span className="nav-text">
            <span>HOME</span>
            <span aria-hidden="true">HOME</span>
          </span>
        </Link>

        <Link className="nav-link" href="/events">
          <span className="nav-text">
            <span>EVENTS</span>
            <span aria-hidden="true">EVENTS</span>
          </span>
        </Link>

        <Link className="nav-link" href="/booking">
          <span className="nav-text">
            <span>BOOK TABLE</span>
            <span aria-hidden="true">BOOK TABLE</span>
          </span>
        </Link>

        <Link className="nav-link" href="/contact">
          <span className="nav-text">
            <span>CONTACT US</span>
            <span aria-hidden="true">CONTACT US</span>
          </span>
        </Link>
      </div>

      <button
        type="button"
        popoverTarget="mobile-menu"
        aria-label="Open menu"
        className="flex cursor-pointer flex-col gap-2 md:hidden"
      >
        <span className="h-1 w-9 rounded bg-white" />
        <span className="h-1 w-9 rounded bg-white" />
        <span className="h-1 w-9 rounded bg-white" />
      </button>

      <div
        id="mobile-menu"
        popover="auto"
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-black/85 text-white md:hidden"
      >
        <button
          type="button"
          popoverTarget="mobile-menu"
          popoverTargetAction="hide"
          aria-label="Close menu"
          className="absolute right-6 top-4 cursor-pointer text-6xl font-bold"
        >
          ×
        </button>

        <div className="flex flex-col items-center gap-10 pt-[24dvh] text-xl font-semibold">
          <a href="/" className="hover:text-pink-500">
            HOME
          </a>

          <a href="/events" className="hover:text-pink-500">
            EVENTS
          </a>

          <a href="/booking" className="hover:text-pink-500">
            BOOK TABLE
          </a>

          <a href="/contact" className="hover:text-pink-500">
            CONTACT US
          </a>
        </div>
      </div>
    </nav>
  );
}
