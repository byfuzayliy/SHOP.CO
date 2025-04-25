let query = new URLSearchParams(location.search);
let productDetails = document.querySelector(".product-details");
let clientsComments = document.querySelector(".clients-comments");
let id = query.get("id");
console.log("Product ID:", id);

function getProductDetails(product) {
  return `<div class="product-card ">
    <img src="${product.images[0]}" alt="${product.title}"/>
    <div class="product-info">
      <h3>${product.id}.${product.title} </h3>
      <p>${product.description}</p>
            <div class="prices-info">
            <p>$${Math.floor(
              product.price - (product.price * product.discountPercentage) / 100
            )}</p>
            <p>${product.price}</p>
            <p>-${Math.floor(product.discountPercentage)}%</p>
          </div>
      <div class = "about-product">
      <p>Brand: <span>${product.brand}</span></p>
      <p>Category: <span> ${product.category}</span></p>
      <p>Return Policy: <span>${product.returnPolicy}</span></p>
      </div>
      <div class = "btn-collect">
       <a href="../products.html" class = "btn">Home Back</a>
       <button class = "btn">Add to Cart</button>
      </div>
    </div>
  </div>`;
}
function getStars(rating) {
  const filledStars = "★".repeat(rating); // to'liq yulduzlar
  const emptyStars = "☆".repeat(5 - rating); // qolgan bo'sh yulduzlar
  return filledStars + emptyStars;
}

function getComment(el) {
  return `<div class = "comment-card">
  <span class = "stars-rating">${getStars(el.rating)}</span>
  <h3>${el.reviewerName}</h3>
  <p>${el.comment} </p>
  <a href="mailto:${el.reviewerEmail}">${el.reviewerEmail}</a>

  <span class = "time-comment">${el.date.split("T")[0]}</span>
  </div>`;
}
// getData ishlatilmoqda — sizning alohida fayldan import qilingan funksiya
getData(`https://dummyjson.com/products/${id}`, (product) => {
  console.log("Product:", product);
  productDetails.innerHTML = getProductDetails(product);

  product.reviews.map((el) => {
    clientsComments.innerHTML += getComment(el);
    console.log(el);
  });
});
