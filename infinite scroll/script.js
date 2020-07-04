const postContainer = document.getElementById("post-container");
const loader = document.getElementById("loader");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;

//Fetching posts from API
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();

  return data;
}

//Upload posts to DOM
async function setPosts() {
  const posts = await getPosts();

  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `<div class="number">${post.id}</div>
    <div class="post-info">
  <h2 class="post-title">${post.title}</h2>
  <p class="post-body">
  ${post.body}
  </p>
</div>
    `;
    postContainer.appendChild(postEl);
  });
}

//Show loading CSS
function showLoading() {
  loader.classList.add("show");
  setTimeout(() => {
    loader.classList.remove("show");

    setTimeout(() => {
      page++;
      setPosts();
    }, 300);
  }, 1000);
}

//Filter post based on texts
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const postsEl = document.querySelectorAll(".post");

  postsEl.forEach((item) => {
    const titles = item.querySelector(".post-title").innerText.toUpperCase();
    const postsbody = item.querySelector(".post-body").innerText.toUpperCase();

    if (titles.indexOf(term) > -1 || postsbody.indexOf(term) > -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

//Calling function to show post
setPosts();

//Add Event listners
//Event listners for window on scroll
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener("input", filterPosts);
