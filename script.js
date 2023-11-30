$(document).ready(function(){
    fetchProducts();
})




function displayProducts(products) {
    let container = $('#products-container');
    container.empty();

    products.forEach(product => {
        let productElement = $(`
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.thumbnail}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h2 class="product-title">${product.title}</h2>
                    <p class="product-price">Price: $${product.price}</p>
                    <p class="product-discount">Discount: ${product.discountPercentage}%</p>
                    <p class="product-category">Category: ${product.category}</p>
                    <p class="product-stock">Stock: ${product.stock}</p>
                    <button class="details-button" onclick="location.href='productDetail.html?productId=${product.id}'">More Details</button>
                </div>
            </div>
        `);
        container.append(productElement);
    });
}




function fetchProducts() {
    $.ajax({
        url: 'https://dummyjson.com/products?limit=100',
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






