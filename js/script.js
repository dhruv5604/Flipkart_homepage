let products = JSON.parse(localStorage.getItem("flipkartProducts")) || []
let categories = JSON.parse(localStorage.getItem("flipkartCategories")) || ["fashion", "accessories"];
showProducts(products);
showCategories(categories);

function showProducts(products) {
    const productList = document.getElementById("product-list");

    productList.innerHTML = "";
    products.forEach((product, index) => {
        productList.innerHTML += `
        <tr>
            <td>${product.id}</td>
            <td><img src="${product.image}"></td>
            <td>${product.price}</td>
            <td>${product.description}</td>
            <td>${product.category}</td>
            <td>
                <button onclick="editProduct(${product.id})">Edit</button>
                <button onclick="deleteProduct(${index})">Delete</button>
            </td>
        </tr>`
    });
}

function addProduct() {
    const price = document.getElementById("productPrice").value.trim();
    const image = document.getElementById("productImage");
    const description = document.getElementById("productDescription").value.trim();
    const category = document.getElementById("categoryList").value.trim();

    if (!price || !description) {
        alert("Please fill in all details");
        return;
    }
    let file = image.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
        let imageBase64 = reader.result;
        let lastId = products.length > 0 ? products[products.length - 1].id : 0;

        products.push({
            id: parseInt(lastId) + 1,
            image: imageBase64,
            price,
            description,
            category
        });
        localStorage.setItem("flipkartProducts", JSON.stringify(products));

        showProducts(products);
    }

    document.getElementById("productImage").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productDescription").value = "";
    document.getElementById("categoryList").value = "";

    reader.readAsDataURL(file);
}

document.getElementById("form1").addEventListener("submit", (e) => {
    e.preventDefault();
    addProduct();
})

function editProduct(index) {
    localStorage.setItem("editProductId", index);
    window.location.href = "edit.html";
}

function deleteProduct(index) {
    if (confirm("Are you sure you want to delete this product?")) {
        products.splice(index, 1);
        showProducts(products);
        localStorage.setItem("flipkartProducts", JSON.stringify(products));
    }
}

function showCategories(categories) {
    const categoryDropdown = document.getElementById("categoryList");
    const categoryList = document.getElementById("category-list");
    categoryDropdown.innerHTML = `<option value="default" selected disabled>Select Category</option>`;

    categoryList.innerHTML = "";

    categories.forEach((category, index) => {
        let option = document.createElement("option");
        option.value = category;
        option.innerText = category;
        categoryDropdown.appendChild(option);

        categoryList.innerHTML += `
        <tr>
            <td>${category}</td>
            <td>
                <button onclick="deleteCategory(${index})">Delete</button>
            </td>
        </tr>`;
    });
}

function addCategory() {
    const newCategory = document.getElementById("newCategory").value.trim();

    if (!newCategory) {
        alert("Please enter a category name");
        return;
    }

    if (categories.includes(newCategory)) {
        alert("Category already exists!");
        return;
    }

    categories.push(newCategory);
    localStorage.setItem("flipkartCategories", JSON.stringify(categories));
    showCategories(categories);

    document.getElementById("newCategory").value = "";
}

function deleteCategory(index) {
    if (confirm("Are you sure you want to delete this category?")) {
        let categoryToDelete = categories[index];
        if(categoryToDelete == "fashion" || categoryToDelete == "accessories"){
            alert("can't delete this category because they are default category");
            return;
        }
        categories.splice(index, 1);
        localStorage.setItem("flipkartCategories", JSON.stringify(categories));
        showCategories(categories);

        products.forEach((product, index2) => {
            let toBeDeleted = (product.category == categoryToDelete) ? index2 : -1;
            if (toBeDeleted != -1) {
                products.splice(index2, 1);
                showProducts(products);
                localStorage.setItem("flipkartProducts", JSON.stringify(products));
            }
        })
    }
}

document.getElementById("categoryForm").addEventListener("submit", (e) => {
    e.preventDefault();
    addCategory();
});
