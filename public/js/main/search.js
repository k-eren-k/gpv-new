const modal = document.getElementById("myModal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const searchInput = document.getElementById("searchInput");
const userList = document.getElementById("userList");
const body = document.body;

openModalBtn.addEventListener("click", function () {
  modal.style.animation = "slideDown 0.5s ease";
  modal.style.display = "block";
  body.style.overflow = "hidden";
});

closeModalBtn.addEventListener("click", function () {
  modal.style.animation = "slideUp 0.5s ease";
  setTimeout(() => {
    modal.style.display = "none";
    modal.style.animation = "none";
    body.style.overflow = "auto";
  }, 500);
});

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.animation = "slideUp 0.5s ease";
    setTimeout(() => {
      modal.style.display = "none";
      modal.style.animation = "none";
      body.style.overflow = "auto";
    }, 500);
  }
});

searchInput.addEventListener("input", function () {
  const searchValue = this.value.trim().toLowerCase();
  if (searchValue !== "") {
    fetchUsers(searchValue);
  } else {
    clearUserList();
  }
});

function fetchUsers(searchValue) {
  fetch(`https://api.github.com/search/users?q=${searchValue}`)
    .then(handleResponse)
    .then(displayUsers)
    .catch(handleError);
}

function handleResponse(response) {
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

function displayUsers(data) {
  userList.innerHTML = "";
  data.items.forEach((item) => {
    const userItem = document.createElement("div");
    userItem.classList.add("user-item");
    userItem.innerHTML = `
      <img src="${item.avatar_url}" class="user-img" alt="User Profile">
      <span class="user-name">${item.login}</span>
    `;
    userList.appendChild(userItem);
  });
}

function handleError(error) {
  console.error("Error fetching data:", error);
}

userList.addEventListener("click", function(event) {
  if (event.target.classList.contains("user-item")) {
    const username = event.target.querySelector(".user-name").textContent;
    window.location.href = `https://gitpv.xyz/${username}`;
  }
});

function clearUserList() {
  userList.innerHTML = "";
}
