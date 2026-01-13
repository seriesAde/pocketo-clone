let HeadspaceCollection = document.getElementById("HeadspaceCollection")
const baseApi = "http://ecommerce.reworkstaging.name.ng/v2";
let vendor = JSON.parse(localStorage.getItem("My_vendor"));



async function displayGreetings() {
    let greetings = document.getElementById("greetings");
    if (vendor) {
        greetings.innerText += `Welcome, ${vendor.vendor_first_name}`;
    }
}
displayGreetings();

let logoutBtn = document.getElementById("logoutBtn");
let login_logout = document.getElementById("login_logout");
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("My_vendor");
    window.location.href = "../merchant/merchantlogin.html";
});

if (vendor) {
    login_logout.innerText = "Log out"
} else {
    login_logout.innerHTML = "Log in"
}
async function loadProducts() {
    if (vendor) {
        let id = vendor.vendor_id
        try {
            const catRes = await fetch(`${baseApi}/categories?merchant_id=${id}`);
            const catData = await catRes.json();

            let categoryMap = {};
            catData.forEach(cat => {
                categoryMap[cat._id] = cat.name;
            });

            const productResult = await fetch(`${baseApi}/products?merchant_id=${id}`);
            const productData = await productResult.json();
            let content = "";
            productData.data.forEach(product => {
                let categoryName = categoryMap[product.category_id] || "No Category";

                const productsCont = document.getElementById("products");
                // Example UI insert:

                content += `
     
       <tr class="border-b border-gray-200 text-left">
                            <td class="py-3 px-5">${product.title}</td>
                            <td class="py-3 px-5">${categoryName}</td>
                            <td class="py-3 px-5"><img class="size-15" src="${product.images[1]}"></td>
                            <td class="py-3 px-5">₦ ${product.price}</td>
                            <td class="py-3 px-5 "> <button id="${product.id}" 
                                    class="deleteProductBtn border cursor-pointer border-red-400 text-red-600 px-2 py-1 rounded-sm text-xs">❌
                                </button>

                            </td>
                        </tr>
    `;
                HeadspaceCollection.innerHTML = content
            });
        } catch (error) {
            console.log(error)
        }
    }
    // let categories = document.querySelectorAll(".categories")
    // categories.forEach(category)

    let deleteProductBtn = document.querySelectorAll(".deleteProductBtn")
    deleteProductBtn.forEach(btn => {
        try {
            btn.addEventListener("click", async () => {
                let product_id = btn.id
                let response = await fetch(`${baseApi}/products/${product_id}`, {
                    method: "DELETE"
                });
                alert("Product deleted")
                window.location.reload()
            })
        } catch (error) {
            console.log(error)
        }
    });

}
loadProducts()

//     let collection = ``;
//     const loopItems = [...products, ...products, ...products];

//     for (let i = 0; i < loopItems.length; i++) {
//         collection += `
//             <div class="card flex-none  snap-start">
//                 <div class="img-wrapper relative w-full">
//                     <img
//                         class="w-full transition-opacity duration-300"
//                         src="${loopItems[i].image}"
//                         data-hover="${loopItems[i].hoverIMG}"
//                         data-original="${loopItems[i].image}"
//                     />

//                     <button class="hover-btn cursor-pointer w-[80%] m-auto absolute font-bold  bottom-4 left-1/2 -translate-x-1/2
//                         bg-white text-black px-3 py-4 rounded-full opacity-0 transition-opacity duration-300">
//                         Add to Cart
//                     </button>
//                 </div>

//                 <p class="font-medium text-2xl ">${loopItems[i].description}</p>
//                 <h5 class="font-medium text-lg">$${loopItems[i].price}</h5>
//             </div>
//         `;
//     }

//     HeadspaceCollection.innerHTML = collection;

//     // JS hover
//     let wrappers = HeadspaceCollection.querySelectorAll(".img-wrapper");

//     for (let i = 0; i < wrappers.length; i++) {
//         let wrapper = wrappers[i];
//         let img = wrapper.querySelector("img");
//         let btn = wrapper.querySelector(".hover-btn");

//         wrapper.addEventListener("mouseenter", () => {
//             img.style.opacity = 0;
//             btn.style.opacity = 1; // fade button in

//             setTimeout(() => {
//                 img.src = img.dataset.hover;
//                 img.style.opacity = 1;
//             }, 200);
//         });

//         wrapper.addEventListener("mouseleave", () => {
//             img.style.opacity = 0;
//             btn.style.opacity = 0; // fade button out

//             setTimeout(() => {
//                 img.src = img.dataset.original;
//                 img.style.opacity = 1;
//             }, 200);
//         });
//     }
// }


// displayPkHeadspace();