export default function PageHeader({ title }) {
  return (
    <header className="page-header bg-cover bg-center px-6 py-14 text-center text-white">
      <h1 className="text-2xl font-bold uppercase">{title}</h1>

      <img src="/assets/bottom_line2.png" alt="" className="mx-auto mt-3" />
    </header>
  );
}
