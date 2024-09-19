const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const msg1 = document.querySelector("#message-1");
const msg2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const address = searchInput.value;
  msg1.textContent = "Loading...";
  msg2.textContent = "";
  fetch(`/weather?address=${address}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        return (msg1.textContent = data.error);
      }
      msg1.textContent = data.title;
      msg2.textContent = `${data.summary}, ${data.report}`;
    });
  });
});
