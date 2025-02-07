let categories = JSON.parse(localStorage.getItem("flipkartCategories")) || [];
let products = JSON.parse(localStorage.getItem("flipkartProducts"));
localStorage.removeItem("editCategoryItem");
showCategories(categories);

function showCategories(categories) {
    const categoryList = document.getElementById("category-list");

    categoryList.innerHTML = "";

    categories.forEach((category, index) => {
        let option = document.createElement("option");
        option.value = category.newCategory;
        option.innerText = category.newCategory;

        let tr = document.createElement("tr");
        let td_id = document.createElement("td");
        td_id.innerHTML = category.id;

        let td_name = document.createElement("td");
        td_name.innerHTML = category.newCategory;

        let td_btn = document.createElement("td");

        let btn_edit = document.createElement("button");
        btn_edit.innerHTML = '<i class="fa-solid fa-pen"></i>';
        btn_edit.addEventListener("click", () => editCategory(index));

        let btn_delete = document.createElement("button");
        btn_delete.innerHTML = '<i class="fa-solid fa-trash"></i>';
        btn_delete.addEventListener("click", () => deleteCategory(index));

        td_btn.appendChild(btn_edit);
        td_btn.appendChild(btn_delete);

        tr.appendChild(td_id);
        tr.appendChild(td_name);
        tr.appendChild(td_btn);

        categoryList.appendChild(tr);
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
    if (categories[index].newCategory == "fashion" || categories[index].newCategory == "accessories") {
        alert("You can't edit this category because this is default category!!!");
        return;
    }
    document.getElementById("newCategory").value = categories[index].newCategory;
    localStorage.setItem("editCategoryItem", index);
}

function deleteCategory(index) {
    let categoryToDelete = categories[index];
    if (categoryToDelete.newCategory == "fashion" || categoryToDelete.newCategory == "accessories") {
        alert("You can't delete this category because they are default category");
        return;
    }
    if (confirm("Are you sure you want to delete this category?")) {
        categories.splice(index, 1);
        localStorage.setItem("flipkartCategories", JSON.stringify(categories));
        showCategories(categories);

        let len = products.length
        for (let i = 0; i < len; i++) {
            console.log(i);
            let ind = products.findIndex(product => product['category'] == categoryToDelete.newCategory);
            if (ind != -1)
                products.splice(ind, 1);
        }

        localStorage.setItem("flipkartProducts", JSON.stringify(products));
    }
}

document.getElementById("categoryForm").addEventListener("submit", (e) => {
    e.preventDefault();
    addOrUpdateCategory();
});

