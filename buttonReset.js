export function resetGame() {
  let resetButton = document.getElementById("resetButton");
  resetButton.onclick = function () {
    location.reload(true);

    window.location.href = "index.html";
  };
}
