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

  // ---------- botón de copiar email ----------
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.getAttribute("data-copy");
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        // Fallback para navegadores sin permiso de clipboard API
        const temp = document.createElement("textarea");
        temp.value = text;
        temp.style.position = "fixed";
        temp.style.opacity = "0";
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
      }
      btn.classList.add("is-copied");
      btn.setAttribute("aria-label", "Email copiado");
      clearTimeout(btn._copyTimeout);
      btn._copyTimeout = setTimeout(() => {
        btn.classList.remove("is-copied");
        btn.setAttribute("aria-label", "Copiar email");
      }, 1600);
    });
  });
});
