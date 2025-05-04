document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("qrForm");
    const urlInput = document.getElementById("url");
    const qrCanvas = document.getElementById("qrCanvas");
    const qrResult = document.getElementById("qrResult");
    const qrLink = document.getElementById("qrLink");
    const copyBtn = document.getElementById("copyBtn");
    const whatsappBtn = document.getElementById("whatsappBtn");
    const confirmationMessage = document.getElementById("confirmationMessage");
    const toggleThemeBtn = document.getElementById("toggleThemeBtn");
  
    let qr;
  
    function showConfirmation(message) {
      confirmationMessage.textContent = message;
      confirmationMessage.classList.remove("hidden");
      confirmationMessage.style.opacity = "1";
  
      setTimeout(() => {
        confirmationMessage.style.opacity = "0";
      }, 2000);
    }
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const url = urlInput.value.trim();
  
      if (!url) {
        showConfirmation("Por favor ingresa una URL válida.");
        return;
      }
  
      qr = new QRious({
        element: qrCanvas,
        value: url,
        size: 250,
      });
  
      qrResult.classList.remove("hidden");
      qrLink.textContent = url;
      qrLink.href = url;
    });
  
    copyBtn.addEventListener("click", () => {
      if (!qr) {
        showConfirmation("Primero genera el código QR.");
        return;
      }
  
      qrCanvas.toBlob((blob) => {
        if (!blob) {
          showConfirmation("No se pudo copiar el código QR.");
          return;
        }
  
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item])
          .then(() => showConfirmation("Código QR copiado al portapapeles."))
          .catch(() => showConfirmation("Error al copiar el QR."));
      });
    });
  
    whatsappBtn.addEventListener("click", () => {
      const url = urlInput.value.trim();
      if (!url) {
        showConfirmation("Primero ingresa una URL.");
        return;
      }
  
      const whatsappURL = `https://wa.me/?text=${encodeURIComponent(url)}`;
      window.open(whatsappURL, "_blank");
    });
  
    toggleThemeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      toggleThemeBtn.textContent = document.body.classList.contains("dark-mode")
        ? "Modo claro"
        : "Modo oscuro";
    });
  });
  