import './style.css';

const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // prevent page refresh
  showSpinner();
  clearErrorMessage();

  const data = new FormData(form);
  const response = await fetch('http://localhost:8080/dream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: data.get('prompt'),
    }),
  }); // end fetch()

  if (response.ok) {
    const { image } = await response.json();
    const result = document.querySelector("#result");
    result.innerHTML = `<img src="${image}" width="512" />`;
  } else {
    const err = await response.text();
    setErrorMessage(err);
  }
  hideSpinner();

}); // end async () => {}


function hideSpinner() {
  const button = document.querySelector('button');
  button.disabled = false;
  button.innerHTML = 'Click to create art';
}

function showSpinner() {
  const button = document.querySelector('button');
  button.disabled = true;
  button.innerHTML = `Working on art... <span class="spinner">↺</span>`;
}

function setErrorMessage(msg) {
  const error_msg = document.getElementById("error_msg");
  error_msg.innerHTML = `Error: ${msg}`;
}


function clearErrorMessage(msg) {
  const error_msg = document.getElementById("error_msg");
  error_msg.innerHTML = "";
}