import Link from "next/link";

export default function ReadMoreButton({ href }) {
  return (
    <Link href={href} className="read-more-button">
      <span>Read More</span>
    </Link>
  );
}
