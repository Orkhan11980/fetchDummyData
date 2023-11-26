$(document).ready(function(){
    fetchProducts();
})



function displayProducts(products)  {

let container = $('#products-container');
container.empty();

products.forEach(product => {

    let productElement = $('<div class="product">')
    productElement.append(`<h3> ${product.title} </h3>`);
    productElement.append(`<p>Price:   $${product.price}</p>`);
    productElement.append(`<p>Discount:   ${product.discountPercentage}%</p>`);
    productElement.append(`<p>Category:  ${product.category}</p>`);
    productElement.append(`<p>Stock:  ${product.stock}</p>`);
    productElement.append(`<img src="${product.thumbnail}" alt="${product.title}" class="product-image"/>`);
    productElement.on('click', () => ProductInfo(product));
    container.append(productElement);
});

}


function fetchProducts() {
    $.ajax({
        url: 'https://dummyjson.com/products',
        type: 'GET',
        timeout: 2000,
        success: function(data) {
            console.log(data)
            displayProducts(data.products);
        },
        error: function(xhr, status, error){
            let errorMesage ='';

            if (status === "timeout") {
                errorMessage = "Request timed out. Please try again later.";
            } else if (xhr.status === 0) {
                errorMessage = "Please ensure you are connected to the internet.";
            } else if (xhr.status === 404) {
                errorMessage = "Requested resource not found.";
            } else if (xhr.status === 500) {
                errorMessage = "Internal Server Error.";
            } else {
                errorMessage = `An error occurred: ${xhr.status} ${error}`;
            }

            console.error(errorMessage);
            
        }

    });
}


function ProductInfo(product){
    console.log("Product info: ", product);
}




