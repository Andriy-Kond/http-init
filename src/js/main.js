// import usersTpl from "../templates/users.hbs"; // ! не працює

const fetchUsersBtn = document.querySelector(".btn");
const userList = document.querySelector(".user-list");

fetchUsersBtn.addEventListener("click", () => {
  fetchUsers()
    .then(users => {
      console.log("fetchUsersBtn.addEventListener >> users:::", users);

      renderUsers(users);
    })
    .catch(error => console.log(error));
});

// & non-async fn
function fetchUsers() {
  return fetch("https://jsonplaceholder.typicode.com/users").then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

// & async fn
async function fetchUsersAsync() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
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
