let categories = JSON.parse(localStorage.getItem("flipkartCategories")) || [];
let products = JSON.parse(localStorage.getItem("flipkartProducts")) || []
localStorage.removeItem("editCategoryItem");
showCategories(categories);

function showCategories(categories) {
    const categoryList = document.getElementById("category-list");

    categoryList.innerHTML = "";

    categories.forEach((category, index) => {
        let option = document.createElement("option");
        option.value = category.newCategory;
        option.innerText = category.newCategory;

        categoryList.innerHTML += `
        <tr>
            <td>${category.id}</td>
            <td>${category.newCategory}</td>
            <td>
                <button onclick="editCategory(${index})"><i class="fa-solid fa-pen"></i></button>
                <button onclick="deleteCategory(${index})"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>`;
    });
}

function addOrUpdateCategory() {
    const newCategoryItem = document.getElementById("newCategory").value.trim();

    if (!newCategoryItem) {
        alert("Please enter a category name");
        return;
    }

    if (categories.findIndex(c => c.newCategory.toLowerCase() == newCategoryItem.toLowerCase()) != -1) {
        alert("Category already exists!");
        return;
    }

    let index = localStorage.getItem("editCategoryItem");

    //logic for update
    if (index) {
        let id = categories[index].id;
        categories[index] = {
            id: id,
            newCategory: newCategoryItem
        };
        localStorage.setItem("flipkartCategories", JSON.stringify(categories));
        showCategories(categories);

        document.getElementById("newCategory").value = "";
        localStorage.removeItem("editCategoryItem");

        categories.forEach((categoryItem, index) => {
            products.forEach((product, index2) => {
                if (product.categoryId == categoryItem.id) {
                    let id = products[index2].id;
                    let image = products[index2].image;
                    let price = products[index2].price;
                    let description = products[index2].description;
                    let categoryId = products[index2].categoryId;
                    let category = categoryItem.newCategory
                    products[index2] = {
                        id,
                        image,
                        price,
                        description,
                        categoryId,
                        category
                    }
                }
            })
        })
        localStorage.setItem("flipkartProducts", JSON.stringify(products));
        return;
    }

    

    let lastId = categories.length > 0 ? categories[categories.length - 1].id : 0;

    categories.push({
        id: parseInt(lastId) + 1,
        newCategory: newCategoryItem
    });

    localStorage.setItem("flipkartCategories", JSON.stringify(categories));
    showCategories(categories);

    document.getElementById("newCategory").value = "";
}

function editCategory(index) {
    document.getElementById("newCategory").value = categories[index].newCategory;
    localStorage.setItem("editCategoryItem", index);
}

function deleteCategory(index) {
    if (confirm("Are you sure you want to delete this category?")) {
        let categoryToDelete = categories[index];
        if (categoryToDelete.newCategory == "fashion" || categoryToDelete.newCategory == "accessories") {
            alert("can't delete this category because they are default category");
            return;
        }
        categories.splice(index, 1);
        localStorage.setItem("flipkartCategories", JSON.stringify(categories));
        showCategories(categories);

        products.forEach((product, index2) => {
            let toBeDeleted = (product.category == categoryToDelete.newCategory) ? index2 : -1;
          
            if (toBeDeleted != -1) {
                products.splice(index2, 1);
                localStorage.setItem("flipkartProducts", JSON.stringify(products));
            }
        })
    }
}

document.getElementById("categoryForm").addEventListener("submit", (e) => {
    e.preventDefault();
    addOrUpdateCategory();
});

