function renderProducts() {
  
let items = document.querySelector('.items');

// FETCH DATA 
    fetch("http://localhost:3000/api/products")

    .then(response => {return response.json()})
    .then(data => {

        data.forEach(element => {

            var html = `<a href="./product.html?_id=${element._id}">
                        <article>
                        <img src="${element.imageUrl}" alt="${element.altTxt}">
                        <h3 class="productName">${element.name}</h3>
                        <p class="productDescription">${element.description}</p>
                        </article>
                    </a>`;
                    items.insertAdjacentHTML("beforeend", html);  // The insertAdjacentHTML() method inserts HTML code(html) into a specified position(beforend)
        });
    })
    .catch(err => console.log(err))
}
renderProducts()

