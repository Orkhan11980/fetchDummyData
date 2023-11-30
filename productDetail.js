$(document).ready(function() {
    
    var productId = new URLSearchParams(window.location.search).get('productId');
    if (productId) {
        fetchProductDetails(productId);
    }else {
        console.error("No product ID found in URL.");
    }
});

function fetchProductDetails(productId) {
    $.ajax({
        url: 'https://dummyjson.com/products/' + productId,
        type: 'GET',
        success: function(product) {
            displayProductDetails(product);
        },
        error: function(xhr, status, error) {
            console.error("Error occured fetching product details:", error);
           
        }
    });
}

function displayProductDetails(product) {
    var container = $('#product-info');
    container.empty(); // Make sure to clear previous content

    var detailHtml = `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.title}">
            </div>
            <div class="product-info">
                <h2 class="product-title">${product.title}</h2>
                <p class="product-price">Price: ${product.price}</p>
                <p class="product-discount">Discount: ${product.discountPercentage}%</p>
                <p class="product-category">Category: ${product.category}</p>
            
                <p class="product-stock">Stock: ${product.stock}</p>
            
            </div>
        </div>
        <div id="product-images" class="product-images-container">
            ${product.images.map(image => `<img src="${image}" alt="${product.title}" class="product-detail-image">`).join('')}
        </div>
    `;
    container.append(detailHtml);
}
$(document).on('click', '.product-detail-image', function() {
    var src = $(this).attr('src');
    console.log('Image clicked:', src);
});