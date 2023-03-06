// fetch page url 
const url = new URLSearchParams(document.location.search);
// fetch id 
const id = url.get("_id");

fetch(`http://localhost:3000/api/products/${id}`)
  .then(response => {return response.json()})
  .then(data => {
    // image
    let itemimg = document.querySelector(".item__img")
    let imgg = document.createElement('img')
    imgg.setAttribute('src', data.imageUrl)
    itemimg.appendChild(imgg)
    // name 
    let title = document.querySelector("#title")
    title.innerHTML = data.name
    // price
    let price = document.querySelector("#price")
    price.innerHTML = data.price
    // description
    let description = document.querySelector("#description")
    description.innerHTML = data.description
    // color choices
    let colors = document.querySelector("#colors")

    data.colors.map((c) => {
      let option = document.createElement("option")
      option.setAttribute("value", c)
      option.innerHTML = c;
      colors.appendChild(option)
    })

    // quantity
    let quantity = document.querySelector("#quantity")

    // add to cart
    let elementData;

    if(localStorage.product != null){
      elementData = JSON.parse(localStorage.product)
    }else{
      elementData = [];
    }

    let addCart = document.querySelector("#addToCart")

    addCart.onclick = function() {
      // Check if the product already exists in the cart
      let productExists = elementData.find(product => product._id === id && product.option === colors.value);
      if (productExists) {
        // If the product already exists, show an alert and do not add it again
        Swal.fire({
          icon: 'warning',
          title: 'Product already exists in the cart!',
          showConfirmButton: false,
          timer: 1500
        });
        return;
      }

      let newElement = {
        _id: id, 
        img: data.imageUrl,
        title: data.name,
        price: data.price,
        option: colors.value,
        quantity: quantity.value,
      }

      elementData.push(newElement)
      localStorage.setItem('product', JSON.stringify(elementData))

      Swal.fire({
        icon: 'success',
        title: 'Product added successfully!',
        showConfirmButton: false,
        timer: 1500
      });
    };
    // add to cart end
  })
  .catch(err => console.log(err));

