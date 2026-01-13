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
            obj = {
                id: prod.id,
                title: prod.title,
                price: prod.price,
                image: prod.images[0],
                quantity: 1
            }
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

            let addtoCartBtn = document.querySelectorAll(".hover-btn")
            addtoCartBtn.forEach(cardBtn => {
                cardBtn.addEventListener("click", (e) => {
                    e.preventDefault()
                    addToCart()

                })
            })
        });
    } catch (error) {
        console.log(error)
    }

    let cartBtn = document.querySelectorAll(".cartBtn")
    cartBtn.forEach(btn => {
        btn.addEventListener("click", async () => {

            console.log(user_id)
            console.log(productId)
            try {


            } catch (error) {
                console.log(error);
            }
        })
    });
}
displayProducts()
let arr = JSON.parse(localStorage.getItem("myCartDetails")) || [];
let obj = {}

// cart function 
function addToCart() {
    // if (arr.id == obj.id) {
    //     alert("its thesame")
    //     console.log(obj)
    //     return;
    // }

    if (arr != []) {
        let find = arr.find((item) => item.id == obj.id)
        if (find) {
            alert("order already in cart")
            return
        } else {
            arr.push(obj)
            localStorage.setItem("myCartDetails", JSON.stringify(arr));
            alert("Food added to orders successfully");
            console.log(obj)
        }
    } else {
        arr.push(obj)
        localStorage.setItem("myCartDetails", JSON.stringify(arr));
        alert("Food added to orders successfully");
        console.log(obj)
    }
    window.location.reload()

}


// cartProductDetails()