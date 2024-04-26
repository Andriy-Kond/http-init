// import usersTpl from "../templates/users.hbs"; // ! не працює

const fetchUsersBtn = document.querySelector(".btn");
const userList = document.querySelector(".user-list");

const url = "https://jsonplaceholder.typicode.com/users";
const urlParams = "https://jsonplaceholder.typicode.com/users?_limit=7&_sort=name"; // поверне масив із семи користувачів (всього їх 10), відсортованих за ім'ям (поле name) в алфавітному порядку.

fetchUsersBtn.addEventListener("click", () => {
  fetchUsers(url)
    .then(users => {
      console.log("fetchUsersBtn.addEventListener >> users:::", users);
      renderUsers(users);
    })
    .catch(error => console.log(error));
});

// & non-async fn
function fetchUsers(url) {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

// & async fn
async function fetchUsersAsync(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
}

// w/o handlebars
function renderUsers(users) {
  const markup = users
    .map(user => {
      return `<li>
          <p><b>Name</b>: ${user.name}</p>
          <p><b>Email</b>: ${user.email}</p>
          <p><b>Company</b>: ${user.company.name}</p>
        </li>`;
    })
    .join("");
  userList.insertAdjacentHTML("beforeend", markup);
}

// ! with handlebars - не працює
// function renderUsers(users) {
//   const markup = usersTpl(users);
//   userList.insertAdjacentHTML("beforeend", markup);
// }
