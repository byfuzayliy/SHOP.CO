const commentsAll = document.querySelector(".comments-all");
const searchComments = document.querySelector(".search-comments");
const pagination = document.querySelector(".pagination");
let search = "";
let active = 1;
function getDataComments(url) {
  let promise = new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status === 200) {
        let dataJson = request.response;
        data = JSON.parse(dataJson);
        resolve(data);
      } else if (request.readyState === 4) {
        reject(request.statusText);
      }
    };
    request.timeout = 10000;

    request.open("GET", url);
    request.send();
  });

  return promise;
}

const getAllComments = async () => {
  try {
    commentsAll.innerHTML = "Loading...";
    let comments = await getDataComments(
      `https://jsonplaceholder.typicode.com/comments?q=${search}`
    );

    let paginationList = await getDataComments(
      `https://jsonplaceholder.typicode.com/comments?q=${search}&_page=${active}&_limit=16`
    );
    let pages = Math.ceil(comments.length / 16);

    if (pages) {
      pagination.innerHTML = `<button ${
        active === 1 ? "disabled" : ""
      }  onClick = "getPage('-')" >Previus</button>`;

      for (let i = 1; i <= pages; i++) {
        pagination.innerHTML += `<button onClick = "getPage(${i})">${i}</button>`;
      }

      pagination.innerHTML += `<button class = ${
        active === pages ? "disabled" : ""
      } onClick = "getPage('+')">Next</button>`;
    }

    commentsAll.innerHTML = "";

    if (comments.length) {
      paginationList.map((el) => {
        commentsAll.innerHTML += `<div class = "comment-card">
       <h3>${el.id}.${el.name}</h3>
        <p>${el.body} </p>
        <a href="mailto:${el.email}">${el.email}</a>
        <span class = "time-comment">21/12/2023</span>
       </div>`;
      });
    } else {
      commentsAll.innerHTML = "Not Found";
    }
  } catch (error) {
    console.log(error);
  }
};
getAllComments();

searchComments.addEventListener("keyup", function () {
  search = this.value;
  active = 1;
  getAllComments();
});

function getPage(page) {
  console.log(page);

  if (page === "+") {
    active++;
  } else if (page === "-") {
    active--;
  } else {
    active = page;
  }

  getAllComments();
}
