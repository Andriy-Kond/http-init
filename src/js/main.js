// import usersTpl from "../templates/users.hbs"; // ! не працює

const fetchUsersBtn = document.querySelector(".btnUsers");
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

// * Зручний метод передачі параметрів у рядок запиту
const searchParams = new URLSearchParams({
  _limit: 5,
  _sort: "name",
});

console.log("searchParams.toString():::", searchParams.toString()); // _limit=5&_sort=name

const urlSearchParams = `https://jsonplaceholder.typicode.com/users?${searchParams}`;
console.log("urlSearchParams:::", urlSearchParams); // https://jsonplaceholder.typicode.com/users?_limit=5&_sort=name

// * HTTP-заголовки
// Клас Headers дозволяє виконувати різні дії в заголовках HTTP-запиту і відповіді. До цих дій належать діставання, налаштування, додавання і видалення заголовків.
const headers = new Headers({
  "Content-Type": "application/json",
  "X-Custom-Header": "custom value",
});

headers.append("Content-Type", "text/bash");
headers.append("X-Custom-Header", "custom value");
headers.has("Content-Type"); // true
headers.get("Content-Type"); // "text/bash"
headers.set("Content-Type", "application/json");
headers.delete("X-Custom-Header");

// * Пагінація
const fetchPostsBtn = document.querySelector(".btnPosts");
const postList = document.querySelector(".posts");

// Controls the group number
let page = 1;
// Controls the number of items in the group
let perPage = 50;

fetchPostsBtn.addEventListener("click", async () => {
  try {
    const posts = await fetchPosts();
    renderPosts(posts);
    // Increase the group number
    page += 1;

    // Replace button text after first request
    if (page > 1) {
      fetchPostsBtn.textContent = "Fetch more posts";
    }
  } catch (error) {
    console.log(error);
  }
});

async function fetchPosts() {
  const params = new URLSearchParams({
    _limit: perPage,
    _page: page,
  });

  const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?${params}`);

  console.log("fetchPosts >> response:::", response);
  return response.data;
}

function renderPosts(posts) {
  const markup = posts
    .map(({ id, title, body, userId }) => {
      return `<li>
          <h2 class="post-title">${title.slice(0, 30)}</h2>
          <p><b>Post id</b>: ${id}</p>
          <p><b>Author id</b>: ${userId}</p>
          <p class="post-body">${body}</p>
        </li>`;
    })
    .join("");
  postList.insertAdjacentHTML("beforeend", markup);
}
