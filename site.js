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
const launchEnd = Date.parse(deadline.dateTime);
const launchPanels = [...document.querySelectorAll("[data-launch]")].map(panel => ({
  title: panel.querySelector("[data-launch-title]"),
  message: panel.querySelector("[data-launch-message]"),
  date: panel.querySelector("[data-launch-date]"),
  countdown: panel.querySelector("[data-launch-countdown]"),
  hours: panel.querySelector("[data-clock-hours]"),
  minutes: panel.querySelector("[data-clock-minutes]"),
  seconds: panel.querySelector("[data-clock-seconds]")
}));
const twoDigits = value => String(value).padStart(2, "0");

function updateCountdown() {
  const secondsLeft = Math.ceil((launchEnd - Date.now()) / 1000);
  if (secondsLeft <= 0) {
    for (const panel of launchPanels) {
      panel.countdown.hidden = true;
      panel.title.textContent = "Janela de lançamento encerrada";
      panel.message.textContent = "O kit continua disponível. Escolha uma ferramenta e faça o primeiro teste.";
      if (panel.date) panel.date.hidden = true;
    }
    return false;
  }
  const hours = twoDigits(Math.floor(secondsLeft / 3600));
  const minutes = twoDigits(Math.floor((secondsLeft % 3600) / 60));
  const seconds = twoDigits(secondsLeft % 60);
  for (const panel of launchPanels) {
    panel.hours.textContent = hours;
    panel.minutes.textContent = minutes;
    panel.seconds.textContent = seconds;
    panel.countdown.hidden = false;
  }
  return true;
}

if (Number.isFinite(launchEnd) && updateCountdown()) {
  const countdownInterval = setInterval(() => {
    if (!updateCountdown()) clearInterval(countdownInterval);
  }, 1000);
}
