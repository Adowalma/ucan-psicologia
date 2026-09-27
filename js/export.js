function showToast(title, message) {
  const toast = document.getElementById("toast-export");
  const titleEl = document.getElementById("toast-title");
  const descEl = document.getElementById("toast-desc");

  titleEl.innerText = title;
  descEl.innerText = message;

  toast.classList.remove("translate-y-24", "opacity-0", "pointer-events-none");
  setTimeout(() => {
    toast.classList.add("translate-y-24", "opacity-0", "pointer-events-none");
  }, 3200);
}

function switchFormat(mode) {
  const artboard = document.getElementById("exportable-artboard");
  const hint = document.getElementById("canvas-aspect-hint");
  const tabSocial = document.getElementById("tab-social");
  const tabPrint = document.getElementById("tab-print");

  if (mode === "print") {
    artboard.classList.remove("max-w-[880px]");
    artboard.classList.add("max-w-[760px]", "aspect-[1/1.414]");
    hint.innerText = "Formato: Cartaz A4 Proporcional (210 x 297mm) - 300 DPI";

    tabPrint.className =
      "px-space-md py-space-xs rounded font-label-md text-label-md transition-all bg-primary-container text-on-primary-container shadow-sm flex items-center gap-space-xs";
    tabSocial.className =
      "px-space-md py-space-xs rounded font-label-md text-label-md transition-all text-on-surface-variant hover:text-on-surface flex items-center gap-space-xs";
    showToast(
      "Formato Cartaz A4 Ativado",
      "Layout ajustado para impressão em murais e quadros de aviso.",
    );
  } else {
    artboard.classList.remove("max-w-[760px]", "aspect-[1/1.414]");
    artboard.classList.add("max-w-[880px]");
    hint.innerText = "Formato: 1080 x 1080px (Instagram / Post)";

    tabSocial.className =
      "px-space-md py-space-xs rounded font-label-md text-label-md transition-all bg-primary-container text-on-primary-container shadow-sm flex items-center gap-space-xs";
    tabPrint.className =
      "px-space-md py-space-xs rounded font-label-md text-label-md transition-all text-on-surface-variant hover:text-on-surface flex items-center gap-space-xs";
    showToast(
      "Formato Redes Sociais Ativado",
      "Pronto para compartilhamento no Instagram, WhatsApp e Facebook.",
    );
  }
}

function downloadPNG() {
  showToast(
    "A Descarregar PNG...",
    "O ficheiro de imagem de alta definição está pronto.",
  );
}

function downloadPDF() {
  window.print();
}
