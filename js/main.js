const productCards = document.querySelector(".products");
const message = document.querySelector(".message");
const messageClose = document.querySelector(".message-close");
const counters = document.querySelectorAll(".counter");
const productsList = document.querySelector(".products-list");
const topsList = document.querySelector(".tops-list");
function getCard(el) {
  return `<div class="new-card">
        <div class = "bgImg">  <img src="${el.images[0]}" alt="ads" /></div>

          <h3>${el.title}</h3>
          <div class="rating">
            <span>Rating: ${el.rating}/5</span>
          </div>
          <div class="prices">
            <p>$${Math.floor(
              el.price - (el.price * el.discountPercentage) / 100
            )}</p>
            <p>${el.price}</p>
            <p>-${Math.floor(el.discountPercentage)}%</p>
          </div>
          <a href="product.html?id=${el.id}"  class="btn">More view</a>
        </div> `;
}

function getNewProducts(el) {
  return `<div class="new-card">
        <div class = "bgImg">  <img src="${el.images[0]}" alt="ads" /></div>

          <h3>${el.title}</h3>
          <div class="rating">
            <span>Rating: ${el.rating}/5</span>
          </div>
          <div class="prices">
            <p>$${Math.floor(
              el.price - (el.price * el.discountPercentage) / 100
            )}</p>
            <p>${el.price}</p>
            <p>-${Math.floor(el.discountPercentage)}%</p>
          </div>
          <a href="product.html?id=${el.id}"  class="btn">More view</a>
        </div> `;
}

function getTopPruducts(el) {
  return `<div class="new-card">
        <div class = "bgImg">  <img src="${el.images[0]}" alt="ads" /></div>

          <h3>${el.title}</h3>
          <div class="rating">
            <span>Rating: ${el.rating}/5</span>
          </div>
          <div class="prices">
            <p>$${Math.floor(
              el.price - (el.price * el.discountPercentage) / 100
            )}</p>
            <p>${el.price}</p>
            <p>-${Math.floor(el.discountPercentage)}%</p>
          </div>
          <a href="product.html?id=${el.id}"  class="btn">More view</a>
        </div> `;
}

getData("https://dummyjson.com/products", (products) => {
  let data = products.products;

  let newProducts = data.filter((el) => el.stock > 50);

  newProducts.slice(0, 4).map((el) => {
    productsList.innerHTML += getNewProducts(el);
  });
  let topSelling = data.filter((el) => el.minimumOrderQuantity > 30);

  topSelling.slice(0, 4).map((el) => {
    topsList.innerHTML += getTopPruducts(el);
  });

  let categories = data.map((el) => {
    console.log(el.category);
  });
});

messageClose.addEventListener("click", () => {
  message.style.display = "none";
});

const startCount = (counter) => {
  const target = +counter.getAttribute("data-target");
  let count = 0;
  const speed = target / 200; // qancha kichik bo'lsa, shuncha tez

  const updateCount = () => {
    count += speed;
    if (count < target) {
      counter.innerText = Math.ceil(count);
      requestAnimationFrame(updateCount);
    } else {
      counter.innerText = target.toLocaleString(); // 30000 -> 30,000
    }
  };

  updateCount();
};

// Faqat sahifada ko'rinadigan paytida boshlash uchun:
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => {
  observer.observe(counter);
});
