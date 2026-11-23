// ============================================================
// Acordeón de capítulos + sincronización con el índice lateral
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const chapters = document.querySelectorAll(".chapter");
  const tocLinks = document.querySelectorAll(".toc a");

  function closeAll(except) {
    chapters.forEach((ch) => {
      if (ch !== except) {
        ch.classList.remove("is-open");
        ch.querySelector(".chapter__row").setAttribute("aria-expanded", "false");
      }
    });
  }

  function setActiveTocLink(id) {
    tocLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
    });
  }

  chapters.forEach((chapter) => {
    const row = chapter.querySelector(".chapter__row");
    row.addEventListener("click", () => {
      const isOpen = chapter.classList.contains("is-open");

      // Comportamiento tipo libro: un capítulo abierto por vez.
      closeAll(chapter);

      chapter.classList.toggle("is-open", !isOpen);
      row.setAttribute("aria-expanded", String(!isOpen));

      if (!isOpen) {
        setActiveTocLink(chapter.id);
        chapter.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Si se entra con un hash en la URL (ej. portada.html#gantt), abrir ese capítulo.
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target && target.classList.contains("chapter")) {
      target.querySelector(".chapter__row").click();
    }
  }
});
