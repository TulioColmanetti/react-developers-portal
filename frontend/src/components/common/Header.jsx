export default function Header({ title, children }) {
  return (
    <header>
      <div className="mx-auto">
        <h1 className="p-4 text-center font-semibold text-3xl text-white bg-amber-400 drop-shadow-md [text-shadow:0_4px_8px_rgba(0,0,0,0.12)]">
          {title}
        </h1>
        <nav className="p-2 bg-yellow-100 shadow-md">{children}</nav>
      </div>
    </header>
  );
}
