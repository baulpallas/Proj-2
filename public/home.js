let inputform = document.getElementById("inputform");
let submitbtn = document.getElementById("submitbtn");

submitbtn.addEventListener("click", evt => {
  evt.preventDefault();
  console.log("Hello!");
  let formInputs = document.querySelectorAll("input");
  const newUser = {};
  for (let input of formInputs) {
    newUser[input.name] = input.value;
  }
  fetch("/api/creator", {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(data => console.log("successfully created new creator: ", data))
    .catch(err => console.log("error creating new creator : ", err));
});