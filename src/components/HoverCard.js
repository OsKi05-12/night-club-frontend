export default function HoverCard({ image, title, description }) {
  return (
    <button
      type="button"
      aria-label={title}
      className="group relative block aspect-[4/5] w-full overflow-hidden bg-black text-white"
    >
      <img src={image} alt="" className="h-full w-full object-cover" />

      <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-[1500ms] group-hover:opacity-100 group-focus:opacity-100" />

      <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-pink-500 transition-transform duration-[1500ms] group-hover:scale-x-100 group-focus:scale-x-100" />

      <div className="absolute inset-x-0 bottom-0 h-[2px] origin-right scale-x-0 bg-pink-500 transition-transform duration-[1500ms] group-hover:scale-x-100 group-focus:scale-x-100" />

      <div className="absolute left-0 top-0 h-0 w-0 border-r-[35px] border-t-[35px] border-r-transparent border-t-pink-500 opacity-0 transition-opacity duration-[1500ms] group-hover:opacity-100 group-focus:opacity-100" />

      <div className="absolute bottom-0 right-0 h-0 w-0 border-b-[35px] border-l-[35px] border-b-pink-500 border-l-transparent opacity-0 transition-opacity duration-[1500ms] group-hover:opacity-100 group-focus:opacity-100" />

      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center opacity-0 transition-opacity duration-[1500ms] group-hover:opacity-100 group-focus:opacity-100">
        <h3 className="text-xl font-bold uppercase">{title}</h3>

        <p className="mt-4 text-sm leading-relaxed text-gray-300">
          {description}
        </p>
      </div>
    </button>
  );
}
