function showToast(msg) {
  const toast = document.getElementById("status-toast");
  const toastMsg = document.getElementById("toast-message");

  if (!toast || !toastMsg) return;

  toastMsg.textContent = msg;

  toast.classList.remove("translate-y-24", "opacity-0", "pointer-events-none");

  setTimeout(() => {
    toast.classList.add("translate-y-24", "opacity-0", "pointer-events-none");
  }, 3000);
}

export function init() {
  // ==========================================
  // SELETOR DE MÊS
  // ==========================================

  const mesSelector = document.getElementById("mes-selector");
  const tableTitle = document.getElementById("table-banner-title");

  if (mesSelector && tableTitle) {
    mesSelector.addEventListener("change", (e) => {
      const selectedText = e.target.options[e.target.selectedIndex].text;

      tableTitle.textContent =
        "ESCALA REFERENTE AO MÊS DE " + selectedText.toUpperCase();

      showToast("Escala de " + selectedText + " carregada para edição.");
    });
  }

  // ==========================================
  // GUARDAR
  // ==========================================

  const btnGuardar = document.getElementById("btn-guardar");

  if (btnGuardar) {
    btnGuardar.addEventListener("click", () => {
      const now = new Date();

      const timeStr = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const timeElem = document.getElementById("last-saved-time");

      if (timeElem) {
        timeElem.textContent = "Hoje às " + timeStr;
      }

      showToast("Escala publicada com sucesso no portal público!");
    });
  }

  // ==========================================
  // DESCARTAR
  // ==========================================

  const btnDescartar = document.getElementById("btn-descartar");

  if (btnDescartar) {
    btnDescartar.addEventListener("click", () => {
      if (
        confirm(
          "Tem a certeza de que deseja descartar as alterações não salvas?",
        )
      ) {
        window.location.reload();
      }
    });
  }

  // ==========================================
  // ADICIONAR PSICÓLOGO
  // ==========================================

  const btnAddPsicologo = document.getElementById("btn-add-psicologo");

  if (btnAddPsicologo) {
    btnAddPsicologo.addEventListener("click", () => {
      const nome = prompt("Nome do novo psicólogo voluntário:");

      if (nome && nome.trim() !== "") {
        const selects = document.querySelectorAll("select:not(#mes-selector)");

        selects.forEach((sel) => {
          const opt = document.createElement("option");

          opt.value = nome.trim();
          opt.textContent = nome.trim();

          sel.appendChild(opt);
        });

        showToast("Profissional " + nome.trim() + " adicionado à lista.");
      }
    });
  }

  // ==========================================
  // AÇÕES DOS TURNOS
  // ==========================================

  document.addEventListener("click", (e) => {
    // ----------------------------------------
    // REMOVER TURNO
    // ----------------------------------------

    const delBtn = e.target.closest(".btn-slot-delete");

    if (delBtn) {
      const slotItem = delBtn.closest(".slot-item");

      if (!slotItem) return;

      const parentContainer = slotItem.parentElement;

      slotItem.remove();

      const remainingItems = parentContainer.querySelectorAll(".slot-item");

      if (remainingItems.length === 0) {
        parentContainer.outerHTML = `
          <div class="min-h-[72px] flex flex-col items-center justify-center gap-space-xs p-space-xs rounded bg-surface">
            <span class="font-headline-md text-headline-md text-on-surface-variant/40">-</span>

            <button
              type="button"
              class="btn-slot-assign text-primary hover:text-tertiary font-label-sm text-label-sm inline-flex items-center gap-0.5"
            >
              <span class="material-symbols-outlined text-[14px]">
                add
              </span>
              Atribuir
            </button>
          </div>
        `;
      }

      showToast("Turno removido.");

      return;
    }

    // ----------------------------------------
    // ATRIBUIR TURNO
    // ----------------------------------------

    const assignBtn = e.target.closest(".btn-slot-assign");

    if (!assignBtn) return;

    const cell = assignBtn.closest("td");

    if (!cell) return;

    let container = cell.querySelector(".slot-item")?.parentElement;

    // ----------------------------------------
    // PRIMEIRO TURNO DA CÉLULA
    // ----------------------------------------

    if (!container) {
      cell.innerHTML = `
        <div class="flex flex-col gap-1.5 p-space-xs rounded bg-secondary-fixed/30">

          <div class="slot-item bg-surface-container-lowest p-space-xs rounded shadow-sm flex flex-col gap-1">

            <div class="flex items-center justify-between gap-1">

              <select
                class="bg-transparent font-label-sm text-label-sm text-on-surface focus:outline-none w-full truncate"
              >
                <option selected>Dra. Sandra Pedro</option>
                <option>Dr. João Paulo</option>
                <option>Dra. Maria Bento</option>
                <option>Dr. Carlos Mendes</option>
                <option>Dra. Laura Fortes</option>
              </select>

              <button
                type="button"
                class="btn-slot-delete text-error hover:opacity-80 p-0.5"
              >
                <span class="material-symbols-outlined text-[16px]">
                  close
                </span>
              </button>

            </div>

            <div class="flex items-center gap-1 bg-surface-container-low px-1.5 py-0.5 rounded">

              <span class="material-symbols-outlined text-[13px] text-primary">
                call
              </span>

              <input
                type="text"
                value="923 820 314"
                class="w-full bg-transparent font-label-sm text-label-sm text-on-surface focus:outline-none"
              />

            </div>

          </div>

          <button
            type="button"
            class="btn-slot-assign text-on-surface-variant hover:text-primary font-label-sm text-label-sm inline-flex items-center justify-center gap-0.5 py-1"
          >
            <span class="material-symbols-outlined text-[14px]">
              add
            </span>
            1 Turno
          </button>

        </div>
      `;
    }

    // ----------------------------------------
    // ADICIONAR OUTRO TURNO
    // ----------------------------------------
    else {
      const newItem = document.createElement("div");

      newItem.className =
        "slot-item bg-surface-container-lowest p-space-xs rounded shadow-sm flex flex-col gap-1";

      newItem.innerHTML = `
        <div class="flex items-center justify-between gap-1">

          <select
            class="bg-transparent font-label-sm text-label-sm text-on-surface focus:outline-none w-full truncate"
          >
            <option selected>Dr. João Paulo</option>
            <option>Dra. Sandra Pedro</option>
            <option>Dra. Maria Bento</option>
            <option>Dr. Carlos Mendes</option>
          </select>

          <button
            type="button"
            class="btn-slot-delete text-error hover:opacity-80 p-0.5"
          >
            <span class="material-symbols-outlined text-[16px]">
              close
            </span>
          </button>

        </div>

        <div class="flex items-center gap-1 bg-surface-container-low px-1.5 py-0.5 rounded">

          <span class="material-symbols-outlined text-[13px] text-primary">
            call
          </span>

          <input
            type="text"
            value="933 592 553"
            class="w-full bg-transparent font-label-sm text-label-sm text-on-surface focus:outline-none"
          />

        </div>
      `;

      container.insertBefore(newItem, assignBtn);
    }

    showToast("Turno adicionado.");
  });

  // ==========================================
  // PRÉ-VISUALIZAÇÃO
  // ==========================================

  const btnPreview = document.getElementById("btn-preview");

  if (btnPreview) {
    btnPreview.addEventListener("click", () => {
      showToast("A abrir pré-visualização da escala para o público...");
    });
  }

  // ==========================================
  // EXPORTAR PNG
  // ==========================================

  const btnExportPng = document.getElementById("btn-export-png");

  if (btnExportPng) {
    btnExportPng.addEventListener("click", () => {
      showToast("A preparar imagem de alta resolução (PNG)...");
    });
  }

  // ==========================================
  // EXPORTAR PDF
  // ==========================================

  const btnExportPdf = document.getElementById("btn-export-pdf");

  if (btnExportPdf) {
    btnExportPdf.addEventListener("click", () => {
      showToast("A gerar PDF para impressão institucional...");
    });
  }
}
