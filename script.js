$(document).ready(function() {
    fetchProducts();

    $('#search-button').click(function() {
        let keyword = $('#search-input').val();
        searchProducts(keyword);
    });

    $('#category-select').change(function() {
        let category = $(this).val();
        filterByCategory(category);
    });
});

function setupCategoryFilter(products) {
    let categories = new Set();
    products.forEach(product => categories.add(product.category));
    let select = $('#category-select');
    select.empty();
    
    
    select.append('<option value="">All Categories</option>');

    categories.forEach(category => {
        select.append(`<option value="${category}">${category}</option>`);
    });
}

function searchProducts(keyword) {
    $.ajax({
        url: 'https://dummyjson.com/products?limit=100',
        type: 'GET',
        success: function(data) {
            let filteredProducts = data.products.filter(product => 
                product.title.toLowerCase().includes(keyword.toLowerCase())
            );
            displayProducts(filteredProducts);
        },
    
        error: handleAjaxError
    });
}

function filterByCategory(category) {
    $.ajax({
        url: 'https://dummyjson.com/products?limit=100',
        type: 'GET',
        success: function(data) {
            let filteredProducts;
            if (category === "") {
                
                filteredProducts = data.products;
            } else {
                
                filteredProducts = data.products.filter(product => product.category === category);
            }
            displayProducts(filteredProducts);
        },
    
        error: handleAjaxError
    });
}

function displayProducts(products) {
    let container = $('#products-container');
    container.empty();

    if (products.length === 0) {
        container.append('<p id="noProd">No products found.</p>');
    } else {
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
}

function fetchProducts() {
    $.ajax({
        url: 'https://dummyjson.com/products?limit=100',
        type: 'GET',
        success: function(data) {
            displayProducts(data.products);
            setupCategoryFilter(data.products);
        },
       error: handleAjaxError
    });
}






