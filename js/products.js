let products = JSON.parse(localStorage.getItem("flipkartProducts")) || []
let categories = JSON.parse(localStorage.getItem("flipkartCategories"));

categories.forEach((category) => {
    let select = document.getElementById("categoryList");
    let option = document.createElement("option");
    option.value = category.newCategory;
    option.innerHTML = category.newCategory;

    select.appendChild(option);
});

showProducts(products);

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
            <td>${product.categoryId}</td>
            <td>${product.category}</td>
            <td>
                <button onclick="editProduct(${product.id})"><i class="fa-solid fa-pen"></i></button>
                <button onclick="deleteProduct(${index})"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>`
    });
}

{/* <button onclick="editProduct(${product.id})">Edit</button> */}
                // <button onclick="deleteProduct(${index})">Delete</button>

function addProduct() {
    const price = document.getElementById("productPrice").value.trim();
    const image = document.getElementById("productImage");
    const description = document.getElementById("productDescription").value.trim();
    const category = document.getElementById("categoryList").value.trim();
    const tempCategory = categories.find(c => c.newCategory == category);
    const categoryId = tempCategory.id;

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
            categoryId,
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
    console
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
