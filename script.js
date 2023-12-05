$(document).ready(function() {
    const searchInput = $('#search-input');
    const categorySelect = $('#category-select');
    const container = $('#products-container');
    const paginationContainer = $('#pagination-container');

    let currentPage = 1;
    const itemsPerPage = 10;

    
    fetchProducts(currentPage);
    fetchCategories();

    $('#search-button').click(function() {
        let keyword = searchInput.val().trim();
        if (keyword) {
            fetchProductsBySearch(keyword);
        } else {
           
            fetchProducts(currentPage);
        }
    });

    categorySelect.change(function() {
        let category = $(this).val();
        fetchProductsByCategory(category);
    });

    function fetchProducts(page) {
        let skip = (page - 1) * itemsPerPage;
    
        fetch(`https://dummyjson.com/products?limit=${itemsPerPage}&skip=${skip}&select=title,price,thumbnail,discountPercentage,stock,category`)
        .then(res => res.json())
        .then(data => {
            displayProducts(data.products);
            setupPagination(data.total, page);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
    }

    function displayProducts(products) {
        container.empty();
        if (products.length === 0) {
            container.append('<p id="noProd">No products found.</p>');
        } else {
            products.forEach(product => {
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
    }



    function fetchCategories() {
        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then(data => {
                populateCategorySelect(data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }

    
    function populateCategorySelect(categories) {
        categorySelect.empty();
        categorySelect.append('<option value="">Select a category</option>');
        categories.forEach(category => {
            categorySelect.append(`<option value="${category}">${category}</option>`);
        });
    }

   
    function fetchProductsByCategory(category) {
        if (!category) {
            fetchProducts(currentPage); 
            return;
        }
        
        fetch(`https://dummyjson.com/products/category/${category}`)
            .then(res => res.json())
            .then(data => {
                displayProducts(data.products);
                setupPagination(data.products.length, currentPage); 
            })
            .catch(error => {
                console.error(`Error fetching products for category ${category}:`, error);
            });
    }

        function fetchProductsBySearch(query) {
                fetch(`https://dummyjson.com/products/search?q=${query}`)
                    .then(res => res.json())
                    .then(data => {
                        displayProducts(data.products);
                        setupPagination(data.products.length, currentPage); 
                    })
                    .catch(error => {
                        console.error(`Error fetching search results for query "${query}":`, error);
                    });
            }





    function setupPagination(totalProducts, currentPage) {
        let pageCount = Math.ceil(totalProducts / itemsPerPage);
        paginationContainer.empty();
        
        if (currentPage > 1) {
            let backButton = $('<button id="back-button">Back</button>').on('click', function() {
                currentPage--;
                fetchProducts(currentPage);
            });
            paginationContainer.append(backButton);
        }

        let startPage = Math.max(currentPage - 2, 1); 
        let endPage = Math.min(currentPage + 2, pageCount); 

        for (let i = startPage; i <= endPage; i++) {
            let button = $(`<button>${i}</button>`).on('click', function() {
                currentPage = i;
                fetchProducts(currentPage);
            }).addClass(i === currentPage ? 'current-page' : '');
            paginationContainer.append(button);
        }

        if (currentPage < pageCount) {
            let nextButton = $('<button id="next-button">Next</button>').on('click', function() {
                currentPage++;
                fetchProducts(currentPage);
            });
            paginationContainer.append(nextButton);
        }
    }

    
    
});
