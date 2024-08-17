export default function Footer() {
  const currentDate = new Date().getFullYear().toString();

  const contentHeight = document.body.scrollHeight;

  const viewportHeight = window.innerHeight;

  const footer = document.querySelector('footer');

  if (footer && contentHeight < viewportHeight) {
    footer.classList.add("absolute", 'inset-0');
  }

  return (
    <footer className="bg-primary container-fluid py-8 px-auto">
      <p className="font-medium text-[15px] text-white text-center">
        ©{currentDate} BooleanTech, todos os direitos reservados.
      </p>
    </footer>
  );
}
