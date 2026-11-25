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
    </nav>
  );
}
