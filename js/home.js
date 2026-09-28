const months = ["Agosto de 2026", "Setembro de 2026", "Outubro de 2026"];

let currentMonthIndex = 1;

// ============================================================
// ABRIR MODAL DO PSICÓLOGO
// ============================================================

export function openPsychologistModal(name, time, phone, spec) {
  const modal = document.getElementById("psychologist-modal");

  const card = document.getElementById("modal-card");

  if (!modal || !card) return;

  document.getElementById("modal-name").textContent = name;

  document.getElementById("modal-time").textContent = time;

  document.getElementById("modal-spec").textContent =
    spec || "Atendimento Psicológico Geral";

  const cleanPhone = phone.replace(/[^0-9]/g, "");

  const fullIntlPhone = "244" + cleanPhone;

  const whatsappLink = document.getElementById("modal-whatsapp-link");

  if (whatsappLink) {
    whatsappLink.href =
      "https://wa.me/" +
      fullIntlPhone +
      "?text=" +
      encodeURIComponent(
        "Olá, estou a contactar a partir da escala do Laboratório de Psicologia da UCAN.",
      );
  }

  const whatsappLabel = document.getElementById("modal-whatsapp-label");

  if (whatsappLabel) {
    whatsappLabel.textContent = "Contactar pelo WhatsApp (+244 " + phone + ")";
  }

  modal.classList.remove("opacity-0", "pointer-events-none");

  modal.classList.add("opacity-100");

  card.classList.remove("scale-95");
  card.classList.add("scale-100");
}

// ============================================================
// FECHAR MODAL
// ============================================================

export function closePsychologistModal() {
  const modal = document.getElementById("psychologist-modal");

  const card = document.getElementById("modal-card");

  if (!modal || !card) return;

  modal.classList.add("opacity-0", "pointer-events-none");

  modal.classList.remove("opacity-100");

  card.classList.remove("scale-100");
  card.classList.add("scale-95");
}

// ============================================================
// INICIALIZAÇÃO DA PÁGINA
// ============================================================

export function init() {
  // ------------------------------------------
  // Fechar modal ao clicar fora do cartão
  // ------------------------------------------

  const modal = document.getElementById("psychologist-modal");

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closePsychologistModal();
      }
    });
  }

  // ------------------------------------------
  // MÊS ANTERIOR
  // ------------------------------------------

  const btnPrev = document.getElementById("btn-prev-month");

  if (btnPrev) {
    btnPrev.addEventListener("click", () => {
      if (currentMonthIndex > 0) {
        currentMonthIndex--;

        const label = document.getElementById("current-month-label");

        if (label) {
          label.textContent =
            "Escala referente ao mês de " + months[currentMonthIndex];
        }
      }
    });
  }

  // ------------------------------------------
  // PRÓXIMO MÊS
  // ------------------------------------------

  const btnNext = document.getElementById("btn-next-month");

  if (btnNext) {
    btnNext.addEventListener("click", () => {
      if (currentMonthIndex < months.length - 1) {
        currentMonthIndex++;

        const label = document.getElementById("current-month-label");

        if (label) {
          label.textContent =
            "Escala referente ao mês de " + months[currentMonthIndex];
        }
      }
    });
  }
}
