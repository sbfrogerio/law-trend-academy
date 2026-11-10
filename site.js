const copyButton = document.querySelector("[data-copy]");
const copyStatus = document.getElementById("copy-status");

copyButton.addEventListener("click", async () => {
  const source = document.getElementById(copyButton.dataset.copy);

  try {
    await navigator.clipboard.writeText(source.textContent.trim());
    copyStatus.textContent = "Pedido copiado para a área de transferência.";
    copyButton.lastChild.textContent = " Pedido copiado";
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(source);
    selection.removeAllRanges();
    selection.addRange(range);
    copyStatus.textContent = "Pedido selecionado. Use o comando de copiar.";
    copyButton.lastChild.textContent = " Texto selecionado";
  }
});
