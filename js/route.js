const app = document.getElementById("app");

const routes = {
  home: "pages/home.html",
  admin: "pages/admin.html",
  export: "pages/export.html",
};

async function loadPage() {
  let page = window.location.hash.substring(1);

  // Página padrão
  if (!page) {
    page = "home";
  }

  const url = routes[page];

  // Rota inexistente
  if (!url) {
    app.innerHTML = `
            <section>
                <h1>404</h1>
                <p>Página não encontrada.</p>
            </section>
        `;
    return;
  }

  try {
    app.innerHTML = "<p>A carregar...</p>";

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erro ao carregar a página");
    }

    const html = await response.text();

    app.innerHTML = html;
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

// Quando o hash muda
window.addEventListener("hashchange", loadPage);

// Quando o site abre
loadPage();
