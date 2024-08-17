
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
      <div className="rounded-lg bg-white p-8 text-center shadow-xl">
        <h3 className="mb-4 text-4xl font-bold">404</h3>
        <p className="text-gray-600">
          Oops! A página que você está procurando não foi encontrada.
        </p>
        <a
          href="/"
          className="mt-4 inline-block rounded bg-primary px-4 py-2 font-semibold text-white hover:bg-blue-600"
        >
          {" "}
          Voltar para a página inicial{" "}
        </a>
      </div>
    </div>
  );
}
