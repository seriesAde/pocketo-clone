let cartHidden = document.getElementById("cartHidden")
let cartBtn = document.getElementById("cartHiddenBtn")
let cart = document.getElementById("cart")
let pocketoP = document.getElementById("pocketoP")
let pocketoPaTag = document.getElementById("pocketoPaTag")
let hidden = document.getElementById("hidden")
let hide = true


// cart
document.addEventListener("click", function (e) {
    const clickedInsideCart = cart.contains(e.target);
    const clickedCartBtn = cartBtn.contains(e.target);
    let clickedInsideShop = hidden.contains(e.target);
    let clickedBtn = pocketoPaTag.contains(e.target);

    if (!clickedInsideCart && !clickedCartBtn) {
        cartHidden.classList.add("hidden");
    }
    if (!clickedInsideShop && !clickedBtn) {
        hidden.classList.add("opacity-0", "-translate-y-6", "pointer-events-none", "max-h-0");
        hidden.classList.remove("max-h-[500px]");
        hide = true
    }
});




cartBtn.addEventListener("click", () => {
    // body.classList.add("overflow-hidden");
    cartHidden.classList.remove("hidden");
});
// cart ends here





// pocketo hidden 

hidden.classList.add("opacity-0", "-translate-y-6", "pointer-events-none", "max-h-0");
pocketoPaTag.addEventListener("click", () => {
    if (hide) {
        // hidden.classList.replace("hidden", "block")
        hidden.classList.remove("opacity-0", "-translate-y-6", "pointer-events-none", "max-h-0");
        hidden.classList.add("max-h-[500px]");
        hide = false
    } else {
        hidden.classList.add("opacity-0", "-translate-y-6", "pointer-events-none", "max-h-0");
        hidden.classList.remove("max-h-[500px]");
        hide = true
    }
})