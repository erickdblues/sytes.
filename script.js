// Configure seu número com DDI e DDD, somente números. Exemplo: 5547999999999
// Deixe vazio até ter um número comercial definido.
const WHATSAPP_NUMBER = "554788437356";

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

document.querySelector("#quote-form").addEventListener("submit", async event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = form.get("name").trim();
  const project = form.get("project");
  const details = form.get("details").trim();
  const message = `Olá, Sytes Studio! Meu nome é ${name}.\\n\\nQuero criar: ${project}.\\n\\nSobre a ideia: ${details || "Ainda quero conversar sobre os detalhes."}`;
  const note = document.querySelector("#form-note");

  if (WHATSAPP_NUMBER) {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    note.textContent = "Sua mensagem foi preparada no WhatsApp. É só revisar e enviar.";
    return;
  }

  try {
    await navigator.clipboard.writeText(message);
    note.textContent = "Mensagem copiada! Agora é só colar na conversa da Sytes Studio pelo WhatsApp.";
  } catch {
    note.textContent = "Mensagem montada. Não foi possível abrir o WhatsApp automaticamente. Use o contato +55 47 8843-7356.";
    window.prompt("Copie sua mensagem:", message);
  }
});
