const commentsAll = document.querySelector(".comments-all");
const searchComments = document.querySelector(".search-comments");

let search = "";
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
    commentsAll.innerHTML = "";

    if (comments.length) {
      comments.map((el) => {
        commentsAll.innerHTML += ` <div class = "comment-card">
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
  getAllComments();
});
