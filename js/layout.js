document.addEventListener("DOMContentLoaded", () => {

  const loadComponent = async (id, file) => {
    const container = document.getElementById(id);
    if (!container) return;

    try {
      const res = await fetch(file);
      container.innerHTML = await res.text();
    } catch (e) {
      console.error(`Error cargando ${file}`, e);
    }
  };

  loadComponent("navbar", "components/navbar.html");
  loadComponent("footer", "components/footer.html");
});
const highlightActiveLink = () => {
  const path = location.pathname.split("/").pop();
  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("href") === path) {
      link.classList.add("active");
    }
  });
};

setTimeout(highlightActiveLink, 300);
