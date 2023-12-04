$(document).ready(function() {
    const searchInput = $('#search-input');
    const categorySelect = $('#category-select');
    const container = $('#products-container');
    const paginationContainer = $('#pagination-container');

    let currentProducts = []; 
    let currentPage = 1;
    const itemsPerPage = 10;

    fetchProducts();

    $('#search-button').click(function() {
        let keyword = searchInput.val();
        searchProducts(keyword);
    });

    categorySelect.change(function() {
        let category = $(this).val();
        filterByCategory(category);
    });

    async function fetchProducts() {
        try {
            const response = await fetch('https://dummyjson.com/products?limit=100');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            currentProducts = data.products;
            displayProducts(currentProducts);
            setupCategoryFilter(currentProducts);
        } catch (error) {
            handleAjaxError(error);
        }
    }
    

    function displayProducts(products) {
        container.empty();
        let start = (currentPage - 1) * itemsPerPage;
        let end = start + itemsPerPage;
        let paginatedItems = products.slice(start, end);

        if (paginatedItems.length === 0) {
            container.append('<p id="noProd">No products found.</p>');
        } else {
            paginatedItems.forEach(product => {
                let productElement = $(`
                    <div class="product-card">
                        <div class="product-image">
                            <img src="${product.thumbnail}" alt="${product.title}" loading="lazy">
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
        setupPagination(products.length);
    }

    function setupCategoryFilter(products) {
        let categories = new Set();
        products.forEach(product => categories.add(product.category));
        categorySelect.empty();
        categorySelect.append('<option value="">All Categories</option>');
        categories.forEach(category => {
            categorySelect.append(`<option value="${category}">${category}</option>`);
        });
    }

    function searchProducts(keyword) {
        let filteredProducts = currentProducts.filter(product => 
            product.title.toLowerCase().includes(keyword.toLowerCase())
        );
        currentPage = 1;
        displayProducts(filteredProducts);
    }

    function filterByCategory(category) {
        let filteredProducts = category === "" ? currentProducts :
            currentProducts.filter(product => product.category === category);
        currentPage = 1;
        displayProducts(filteredProducts);
    }

    function setupPagination(totalProducts) {
        let pageCount = Math.ceil(totalProducts / itemsPerPage);
        paginationContainer.empty();
        
        let backButton = $('<button id="back-button">Back</button>').on('click', function() {
            if (currentPage > 1) {
                currentPage--;
                displayProducts(currentProducts);
            }
        });
        paginationContainer.append(backButton);

        let startPage = Math.max(currentPage - 2, 1); 
        let endPage = Math.min(currentPage + 2, pageCount); 

        for (let i = startPage; i <= endPage; i++) {
            let button = $(`<button>${i}</button>`).on('click', function() {
                currentPage = i;
                displayProducts(currentProducts);
            });
            if (i === currentPage) {
                button.addClass('current-page');
            }
            paginationContainer.append(button);
        }

        let nextButton = $('<button id="next-button">Next</button>').on('click', function() {
            if (currentPage < pageCount) {
                currentPage++;
                displayProducts(currentProducts);
            }
        });
        paginationContainer.append(nextButton);

        $("#back-button").prop('disabled', currentPage === 1);
        $("#next-button").prop('disabled', currentPage === pageCount);
    }

   
});





