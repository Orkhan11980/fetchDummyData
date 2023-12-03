$(document).ready(function() {
    const productId = new URLSearchParams(window.location.search).get('productId');
    if (productId) {
        ProductDetails.fetch(productId);
    } else {
        console.error("No product ID found in URL.");
    }

    
    $(document).on('click', '#goBackButton', function() {
        ProductDetails.goBack();
    });
});

const ProductDetails = (function() {
    const container = $('#detail-container');

    function fetch(productId) {
        $.ajax({
            url: `https://dummyjson.com/products/${productId}`,
            type: 'GET',
            success: display,
            error: handleAjaxError
        });
    }

    function display(product) {
        container.empty();

        const detailHtml = `
            <div class="detail-card">
                <div class="content-wrapper">
                    <div class="detail-image-container">
                        <img src="${product.images[0]}" alt="${product.title}" class="main-detail-image">
                        <div class="detail-thumbnails">
                            ${product.images.map(image => `<img src="${image}" alt="${product.title}" class="thumbnail-image">`).join('')}
                        </div>
                    </div>
                    <div class="detail-info">
                        <h2 class="detail-title">${product.title}</h2>
                        <p class="detail-price">Price: $${product.price}</p>
                        <p class="detail-desc">Description: ${product.description}</p>
                        <p class="detail-rating">Rating: ${product.rating}</p>
                        <p class="detail-discount">Discount: ${product.discountPercentage}%</p>
                        <p class="detail-category">Category: ${product.category}</p>
                        <p class="detail-stock">Stock: ${product.stock}</p>
                    </div>
                </div>
                <div class="go-back-container">
                    <button id="goBackButton">Go Back</button>
                </div>
            </div>
        `;

        container.append(detailHtml);
    }

 

    function goBack() {
        window.history.back();
    }

    return {
        fetch: fetch,
        goBack: goBack
    };
})();
