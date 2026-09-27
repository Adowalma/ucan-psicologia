const app = document.getElementById("app");

const routes = {
  home: {
    html: "pages/home.html",
    module: "/js/home.js",
  },

  admin: {
    html: "pages/admin.html",
    module: "/js/admin.js",
  },

  export: {
    html: "pages/export.html",
    module: "/js/export.js",
  },
};

let currentPage = null;
let currentModule = null;

function setActiveMenu(page) {
  document.querySelectorAll("nav a").forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${page}`) {
      link.classList.add("active");
    }
  });
}

async function loadPage() {
  let page = window.location.hash.substring(1);

  if (!page) {
    page = "home";
  }

  const route = routes[page];

  // Rota inexistente
  if (!route) {
    app.innerHTML = `
      <section>
        <h1>404</h1>
        <p>Página não encontrada.</p>
      </section>
    `;

    return;
  }

  try {
    // --------------------------------
    // 1. Destruir página anterior
    // --------------------------------

    if (currentModule?.destroy) {
      currentModule.destroy();
    }

    currentModule = null;
    currentPage = null;

    // --------------------------------
    // 2. Mostrar loading
    // --------------------------------

    app.innerHTML = "<p>A carregar...</p>";

    // --------------------------------
    // 3. Carregar HTML
    // --------------------------------

    const response = await fetch(route.html);

    if (!response.ok) {
      throw new Error(`Erro ao carregar ${route.html}`);
    }

    const html = await response.text();

    app.innerHTML = html;

    // --------------------------------
    // 4. Ativar menu
    // --------------------------------

    setActiveMenu(page);

    // --------------------------------
    // 5. Carregar módulo JS
    // --------------------------------

    const module = await import(route.module);

    currentModule = module;
    currentPage = page;

    // --------------------------------
    // 6. Inicializar página
    // --------------------------------

    if (module.init) {
      module.init();
    }
  } catch (error) {
    console.error(error);

    app.innerHTML = `
      <section>
        <h1>Erro</h1>
        <p>Não foi possível carregar esta página.</p>
      </section>
    `;
  }
}

window.addEventListener("hashchange", loadPage);

loadPage();
