export default function Header({ title, children }) {
  return (
    <header>
      <div className="bg-yellow-100 mx-auto p-4 shadow-md">
        <h1 className="text-center font-semibold text-2xl mb-4">{title}</h1>
        {children}
      </div>
    </header>
  );
}
