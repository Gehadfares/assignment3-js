const nameInput = document.querySelector("#name");
const urlInput = document.querySelector("#url");
const btn = document.querySelector("form > button");
const tbody = document.querySelector("table tbody");

let data = JSON.parse(localStorage.getItem("bookmarks")) || [];
let validUrl = false;
let validName = false;

if (data?.length > 0) {
  generateRows();
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (validUrl && validName) {
    const name = nameInput.value;
    const url = urlInput.value;

    if (!data.find((el) => el.name === nameInput.value)) {
      const newBookmark = { name, url };
      data.push(newBookmark);
      generateRows();
      nameInput.classList.add("is-valid");
      nameInput.classList.remove("is-invalid");
    } else {
      nameInput.classList.add("is-invalid");
      nameInput.classList.remove("is-valid");
    }
  }
});

function urlValidation() {
  const pattern = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.?[a-z]{2,6}\b\.([-a-zA-Z0-9@:%_\+.~#?&//=]+)/gi;
  if (pattern.test(urlInput.value)) return true;
  else return false;
}

function nameValidation() {
  const pattern = /^.{3,}$/;
  if (pattern.test(nameInput.value)) return true;
  else return false;
}

nameInput.addEventListener("input", () => {
  validName = nameValidation();
  if (validName) {
    nameInput.classList.remove("is-invalid");
    nameInput.classList.add("is-valid");
  } else {
    nameInput.classList.remove("is-valid");
    nameInput.classList.add("is-invalid");
  }
});

urlInput.addEventListener("input", () => {
  validUrl = urlValidation();
  if (validUrl) {
    urlInput.classList.add("is-valid");
    urlInput.classList.remove("is-invalid");
  } else {
    urlInput.classList.add("is-invalid");
    urlInput.classList.remove("is-valid");
  }
});

function generateRows() {
  let container = "";
  data.forEach((el, i) => {
    let url = el.url.includes("https://") || el.url.includes("http://") ? el.url : `https://${el.url}`;
    container += `<tr>
    <td>${i + 1}</td>
    <td>${el.name}</td>
    <td><a href="${url}" target="_blank" class="btn btn-primary"><i class="fa-solid fa-eye"></i> Visit</a></td>
    <td><button class="btn btn-danger" onclick="handleDelete(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    </tr>`;
  });
  tbody.innerHTML = container;
  localStorage.setItem("bookmarks", JSON.stringify(data));
}

function handleDelete(index) {
  data.splice(index, 1);
  generateRows();
}
