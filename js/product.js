let query = new URLSearchParams(location.search);
let productDetails = document.querySelector(".product-details");
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
    </div>
  </div>`;
}

// getData ishlatilmoqda — sizning alohida fayldan import qilingan funksiya
getData(`https://dummyjson.com/products/${id}`, (product) => {
  console.log("Product:", product);
  productDetails.innerHTML = getProductDetails(product);
});
