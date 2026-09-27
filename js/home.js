function openPsychologistModal(name, time, phone, spec) {
  const modal = document.getElementById("psychologist-modal");
  const card = document.getElementById("modal-card");

  document.getElementById("modal-name").textContent = name;
  document.getElementById("modal-time").textContent = time;
  document.getElementById("modal-spec").textContent =
    spec || "Atendimento Psicológico Geral";

  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const fullIntlPhone = "244" + cleanPhone;

  const whatsappLink = document.getElementById("modal-whatsapp-link");
  whatsappLink.href =
    "https://wa.me/" +
    fullIntlPhone +
    "?text=" +
    encodeURIComponent(
      "Olá, estou a contactar a partir da escala do Laboratório de Psicologia da UCAN.",
    );
  document.getElementById("modal-whatsapp-label").textContent =
    "Contactar pelo WhatsApp (+244 " + phone + ")";

  modal.classList.remove("opacity-0", "pointer-events-none");
  modal.classList.add("opacity-100");
  card.classList.remove("scale-95");
  card.classList.add("scale-100");
}

function closePsychologistModal() {
  const modal = document.getElementById("psychologist-modal");
  const card = document.getElementById("modal-card");

  modal.classList.add("opacity-0", "pointer-events-none");
  modal.classList.remove("opacity-100");
  card.classList.remove("scale-100");
  card.classList.add("scale-95");
}

// Fechar ao clicar fora do cartão
document
  .getElementById("psychologist-modal")
  .addEventListener("click", function (e) {
    if (e.target === this) {
      closePsychologistModal();
    }
  });

// Alternador didático de meses
const months = ["Março de 2026", "Abril de 2026", "Maio de 2026"];
let currentMonthIndex = 1;

document
  .getElementById("btn-prev-month")
  .addEventListener("click", function () {
    if (currentMonthIndex > 0) {
      currentMonthIndex--;
      document.getElementById("current-month-label").textContent =
        "Escala referente ao mês de " + months[currentMonthIndex];
    }
  });

document
  .getElementById("btn-next-month")
  .addEventListener("click", function () {
    if (currentMonthIndex < months.length - 1) {
      currentMonthIndex++;
      document.getElementById("current-month-label").textContent =
        "Escala referente ao mês de " + months[currentMonthIndex];
    }
  });
