let cartHidden = document.getElementById("cartHidden")
let cartBtn = document.getElementById("cartHiddenBtn")
let cart = document.getElementById("cart")
let pocketoP = document.getElementById("pocketoP")
let pocketoPaTag = document.getElementById("pocketoPaTag")
let hidden = document.getElementById("hidden")
let hide = true;


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



let isHidden = true;

cartBtn.addEventListener("click", () => {
    // body.classList.add("overflow-hidden");
    if (isHidden) {
        cartHidden.classList.remove("hidden");
        isHidden = false
    } else {
        cartHidden.classList.add("hidden");
        isHidden = true
    }
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




// cart items


async function cartProductDetails() {
    const baseApi = "http://ecommerce.reworkstaging.name.ng/v2";
    let user = JSON.parse(localStorage.getItem("My_User"));
    if (user) {
        let cartItemDetails = document.getElementById("cartItemDetails")
        let totalCart = document.getElementById("totalCart")
        let user_id = user.user_id
        let content = "";
        let total = "";

        try {
            let cartRes = await fetch(`${baseApi}/carts?user_id=${user_id}`)
            let cartData = await cartRes.json()
            console.log(cartData)
            for (const item of cartData) {
                console.log(item)
                for (let product of item.products) {
                    // console.log(product.id)
                    const productRes = await fetch(`${baseApi}/products/${product.id}`);
                    const productData = await productRes.json();
                    console.log(productData)
                    console.log(product.quantity)

                    content += `
                <div class="mt-10"> 
                <div class="flex items-center justify-between">
                                <div class="flex items-center gap-5 w-full ">
                                    <!-- Item Image Placeholder -->
                                    <img src="${productData.images[0]}"
                                    alt="Headspace x Poketo Pens" class="w-25 h-30 rounded object-cover">
                                    <div class="flex justify-between items-end w-full">
                                        <div class=" w-full flex flex-col justify-between h-24">
                                         <div class="flex justify-between items-end w-full">
                                                <p class="text-sm font-medium text-black">${productData.title}</p>
                                                
                                                <button class="text-gray-400 hover:text-gray-600">
                                                    <svg xmlns="www.w3.org" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                                        stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                                 </div>

                                         <div class="flex justify-between items-end w-full">
                                            <div class="">
                                                <p class="text-sm font-medium text-black">₦${productData.price}</p>
                                            </div>
                                            <div class="flex items-center border border-[#0085ca] rounded-full">
                                                <button
                                                    class="px-2 cursor-pointer py-1 text-gray-600 hover:bg-gray-100 rounded-l-full">-</button>
                                                <span class="px-3 py-1 text-sm">${product.quantity}</span>
                                                <button
                                                    class="px-2 cursor-pointer py-1 text-gray-600 hover:bg-gray-100 rounded-r-full">+</button>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
        
                            </div></div>
                `;

                    total = `
               ₦${item.amount}
                `
                    cartItemDetails.innerHTML = content
                    totalCart.innerHTML = total
                }


            }






        } catch (error) {
            console.log(error)
        }
        user_id
    }

    // const showMore = document.getElementById('showMore');
    // showMore.addEventListener('click', toggleText);

}

cartProductDetails()



// clearing all iteams in cart
let XBtn = document.getElementById("XBtn")
XBtn.addEventListener("click", async (e) => {
    const baseApi = "http://ecommerce.reworkstaging.name.ng/v2";
    let user = JSON.parse(localStorage.getItem("My_User"));
    e.preventDefault
    try {
        if (confirm("are you sure you want to clear all items in cart?")) {
            let res = await fetch(`${baseApi}/carts`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: user.user_id
                }),
            })
            alert("cart items cleared")
            window.location.reload()
        }
    } catch (error) {
        console.log(error)
    }

})
