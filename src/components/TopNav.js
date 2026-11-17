export default function TopNav() {
  return (
    <nav
      aria-label="Hovednavigation"
      className="sticky top-0 z-50 flex items-center justify-between border-y border-pink-500 bg-black px-10 h-20 text-white"
    >
      <a href="/">
        <img
          src="/assets/icon/Logo_header.svg"
          alt="Night Club"
          className="w-48"
        />
      </a>

      <div className="flex items-center gap-8">
        <a className="hover:text-pink-500" href="/">
          Home
        </a>
        <a className="hover:text-pink-500" href="/events">
          Events
        </a>
        <a className="hover:text-pink-500" href="/booking">
          Book Table
        </a>
        <a className="hover:text-pink-500" href="/contact">
          Contact Us
        </a>
      </div>
    </nav>
  );
}
