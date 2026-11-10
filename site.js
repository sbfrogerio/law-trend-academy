const copyStatus = document.getElementById("copy-status");

for (const button of document.querySelectorAll("[data-copy]")) {
  button.addEventListener("click", async () => {
    const source = document.getElementById(button.dataset.copy);
    const label = button.querySelector("span");

    try {
      await navigator.clipboard.writeText(source.textContent.trim());
      copyStatus.textContent = "Pedido copiado para a área de transferência.";
      label.textContent = "Pedido copiado";
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(source);
      selection.removeAllRanges();
      selection.addRange(range);
      copyStatus.textContent = "Pedido selecionado. Use o comando de copiar.";
      label.textContent = "Texto selecionado";
    }
  });
}

const deadline = document.getElementById("launch-deadline");
const countdown = document.getElementById("launch-countdown");
const launchTitle = document.getElementById("launch-title");
const launchMessage = document.getElementById("launch-message");
const launchEnd = Date.parse(deadline.dateTime);
const clockHours = countdown.querySelector("[data-clock-hours]");
const clockMinutes = countdown.querySelector("[data-clock-minutes]");
const clockSeconds = countdown.querySelector("[data-clock-seconds]");
const twoDigits = value => String(value).padStart(2, "0");

function updateCountdown() {
  const secondsLeft = Math.ceil((launchEnd - Date.now()) / 1000);
  if (secondsLeft <= 0) {
    countdown.hidden = true;
    launchTitle.textContent = "Janela de lançamento encerrada";
    launchMessage.textContent = "O kit continua disponível. Escolha uma ferramenta e faça o primeiro teste.";
    deadline.parentElement.hidden = true;
    return false;
  }
  clockHours.textContent = twoDigits(Math.floor(secondsLeft / 3600));
  clockMinutes.textContent = twoDigits(Math.floor((secondsLeft % 3600) / 60));
  clockSeconds.textContent = twoDigits(secondsLeft % 60);
  countdown.hidden = false;
  return true;
}

if (Number.isFinite(launchEnd) && updateCountdown()) {
  const countdownInterval = setInterval(() => {
    if (!updateCountdown()) clearInterval(countdownInterval);
  }, 1000);
}
