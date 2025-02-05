let products = JSON.parse(localStorage.getItem("flipkartProducts")) || [];

showProducts(products);

function showProducts(products) {

    products.forEach((product) => {
        let cardWrapper = (product.category == "fashion") ? document.getElementById("cards-wrapper-fashion") :
            document.getElementById("cards-wrapper-accessory")
        cardWrapper.innerHTML += "";

        let card = document.createElement("div");
        card.classList.add("card");

        let img = document.createElement("img");
        img.classList.add("card-img-top", "img-fluid");
        img.src = product.image;

        let card_body = document.createElement("div");
        card_body.classList.add("card-body");

        let ptag = document.createElement("p");
        ptag.classList.add("card-text");
        ptag.innerText = product.description;

        let strongTag = document.createElement("strong");
        strongTag.classList.add("card-text");
        strongTag.innerText = product.price

        card_body.appendChild(ptag);
        card_body.appendChild(strongTag);
        card.appendChild(img);
        card.appendChild(card_body);

        cardWrapper.appendChild(card);
    });
}
