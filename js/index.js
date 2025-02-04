let products = JSON.parse(localStorage.getItem("flipkartProducts")) || [];

showProducts(products);

function showProducts(products) {
    let cardWrapper = document.getElementById("cards-wrapper-id");

    if (!cardWrapper) {
        console.error("Card wrapper not found!");
        return;
    }

    cardWrapper.innerHTML = ""; // Clear existing content

    products.forEach((product) => {
        let card = document.createElement("div");
        card.classList.add("card");

        let img = document.createElement("img");
        img.classList.add("card-img-top", "img-fluid");
        img.src = product.image || "img/soft.jpeg"; // Use product image or fallback

        let card_body = document.createElement("div");
        card_body.classList.add("card-body");

        let ptag = document.createElement("p");
        ptag.classList.add("card-text");
        ptag.innerText = product.description || "Soft Toys";

        let strongTag = document.createElement("strong");
        strongTag.classList.add("card-text");
        strongTag.innerText = product.price ? `Upto ${product.price}% off` : "Upto 70% off";

        card_body.appendChild(ptag);
        card_body.appendChild(strongTag);
        card.appendChild(img);
        card.appendChild(card_body);

        cardWrapper.appendChild(card);
    });
}


// function showProducts(products){
//     let cardWrapper = document.getElementById("cards-wrapper-id");
//     console.log(cardWrapper)
//     products.forEach((product,index) => {
        
//         let card = document.createElement("div");
//         card.classList.add("card-body");

//         let img = document.createElement("img");
//         img.classList.add("card-img-top");
//         img.classList.add("img-fluid");
//         img.src = product.image;

//         let card_body = document.createElement("div");
//         card_body.classList.add("card-body");

//         let ptag = document.createElement("p");
//         ptag.classList.add("card-text");
//         ptag.innerHTML = product.description;

//         let strongTag = document.createElement("strong");
//         strongTag.classList.add("card-text");
//         strongTag.innerHTML = product.price;

//         card_body.appendChild(ptag);
//         card_body.appendChild(strongTag);
//         card.appendChild(img);
//         card.appendChild(card_body);

//         cardWrapper.appendChild(card);
//     });
// }
