const productCards = document.querySelector(".products");

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

getData("https://dummyjson.com/products", (products) => {
  let data = products.products;
  console.log(data);

  data.map((el) => {
    productCards.innerHTML += getCard(el);
  });
});
