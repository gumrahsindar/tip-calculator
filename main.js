const radioButtons = document.querySelectorAll('input[name="tip-percentage"]');

radioButtons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log("Seçilen değer:", button.value);
  });
});
