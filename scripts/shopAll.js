let HeadspaceCollection = document.getElementById("HeadspaceCollection")
let firstcard = HeadspaceCollection.querySelector(".card");
// let body = document.querySelector("body")
const baseApi = "http://ecommerce.reworkstaging.name.ng/v2";

async function displayProducts() {
    let vendor = JSON.parse(localStorage.getItem("My_vendor"));
    let id = vendor.vendor_id
    try {
        let result = await fetch(`${baseApi}/products?merchant_id=${id}`)
        let data = await result.json();
        collection = "";
        data.data.forEach(prod => {
            collection += `
 
         <div class="card flex-none snap-start">
                <div class="img-wrapper relative w-full">
                       <a href="../item-page.html?Product_id=${prod.id}">   
                    <img 
                        class="w-full transition-opacity duration-300" 
                        src="${prod.image}" 
                        data-hover="${prod.images[1]}"
                        data-original="${prod.images[0]}"
                    /></a>

                    <button id="addtoCartBtn" data-id="${prod.id}" class="cartBtn hover-btn cursor-pointer w-[80%] m-auto absolute font-bold  bottom-4 left-1/2 -translate-x-1/2 
                        bg-white text-black px-3 py-4 rounded-full opacity-0 transition-opacity duration-300">
                        Add to Cart
                    </button>
                </div>

                <p class="font-medium text-lg ">${prod.title}</p>
                <h5 class="font-medium text-lg">${prod.price}</h5>
            </div>
        `;
            HeadspaceCollection.innerHTML = collection
        });

        let container = document.querySelectorAll(".img-wrapper")
        container.forEach(item => {
            let img = item.querySelector("img");
            let btn = item.querySelector(".hover-btn");

            item.addEventListener("mouseenter", () => {
                img.style.opacity = 0;
                btn.style.opacity = 1; // fade button in

                setTimeout(() => {
                    img.src = img.dataset.hover;
                    img.style.opacity = 1;
                }, 200);
            });

            item.addEventListener("mouseleave", () => {
                img.style.opacity = 0;
                btn.style.opacity = 0; // fade button out

                setTimeout(() => {
                    img.src = img.dataset.original;
                    img.style.opacity = 1;
                }, 200);
            });
        });
    } catch (error) {
        console.log(error)
    }

    let cartBtn = document.querySelectorAll(".cartBtn")
    cartBtn.forEach(btn => {
        btn.addEventListener("click", async () => {
            let productId = btn.dataset.id;
            let user = JSON.parse(localStorage.getItem("My_User"));
            let user_id = user.user_id
            let cart_obj = {
                quantity: 1,
                user_id: user_id,
                product_id: productId,
                has_variation: false
            }
            console.log(user_id)
            console.log(productId)
            try {
                let response = await fetch(`${baseApi}/carts`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(cart_obj),
                });
                if (!response.ok) {
                    const msg = await response.text();
                    console.log("Server error:", msg);
                    alert("Registration failed.");
                    return;
                } else {
                    alert("product added to cart")
                    window.location.reload()
                }
            } catch (error) {
                console.log(error);
            }
        })
    });
}
displayProducts()


async function cartProductDetails() {
    let user = JSON.parse(localStorage.getItem("My_User"));
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


    // const showMore = document.getElementById('showMore');
    // showMore.addEventListener('click', toggleText);
}
// cartProductDetails()