export default function Main({ children = 'Conteúdo de main' }) {
  return (
    <main>
      <div className="container mx-auto p-4">
        <h2>{children}</h2>
      </div>
    </main>
  );
}
