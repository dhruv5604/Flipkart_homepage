let productId = localStorage.getItem("editProductId");

if(!productId){
    alert("Product not found!!!!");
    window.location.href = "index.html";
}

let products = JSON.parse(localStorage.getItem("flipkartProducts"));

let product = products.find(p=>p.id == productId);

if(product){
    document.getElementById("productId").value = product.id;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productDescription").value = product.description;
    document.getElementById("categoryList").value = product.category;
}

document.getElementById("productImage").addEventListener("change", function () {
    let file = this.files[0];
    if(file){
        let reader = new FileReader();
        reader.onloadend = () => {
            localStorage.setItem("updatedImage" , reader.result);
        }
        reader.readAsDataURL(file);
    }
});

function updateProduct(){
    const id = document.getElementById("productId").value;
    const price = document.getElementById("productPrice").value;
    const description = document.getElementById("productDescription").value;
    const category = document.getElementById("categoryList").value;

    let index = products.findIndex(p => p.id == id);
    if (index != -1) {
        let image =localStorage.getItem("updatedImage") || products[index].image;
        products[index] = {id, image, price, description, category};
        localStorage.setItem("flipkartProducts",JSON.stringify(products));
        localStorage.removeItem("editProductId");
        localStorage.removeItem("updatedImage");
        window.location.href = "products.html";
    }
}

document.getElementById("form1").addEventListener("submit", (e) => {
    e.preventDefault();
    updateProduct();
})