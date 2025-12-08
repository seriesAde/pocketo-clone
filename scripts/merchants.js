const baseApi = "http://ecommerce.reworkstaging.name.ng/v2";

let vendor = JSON.parse(localStorage.getItem("My_vendor"));


async function display() {
    let greetings = document.getElementById("greetings");
    if (vendor) {
        greetings.innerText += `Welcome, ${vendor.vendor_first_name}`;
    }
}
display();


let logoutBtn = document.getElementById("logoutBtn");
let login_logout = document.getElementById("login_logout");
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("My_vendor");
    window.location.href = "../merchant/merchantlogin.html";
});

if (vendor) {
    login_logout.innerText = "Sign Out"
} else {
    login_logout.innerHTML = "Log in"
}

async function loadProducts() {
    if (vendor) {
        let id = vendor.vendor_id
        try {
            const catRes = await fetch(`${baseApi}/products?merchant_id=${id}`);
            const catData = await catRes.json();

            // display cat starts here
            const wrapper = document.getElementById("categories");
            wrapper.innerHTML = "";

            wrapper.innerHTML =
                `
                       <a href="./allCat.html?category_id="${catData.id}"" class="w-[25%] grid grid-cols-1 justify-center items-center h-20 text-xs shadow-sm bg-white">
                        <div class="categories ">
                        <h1 class="font-semibold text-center  text-green-700 capitalize"> Total Products: <span class="font-bold text-lg"> ${catData.total}</span></h1>
                         </div></a>
                  
                     `;





            // display cat ends here
            const categoryRes = await fetch(`${baseApi}/categories?merchant_id=${id}`);
            const categoryData = await categoryRes.json();
            let categoryMap = {};
            categoryData.forEach(cat => {
                categoryMap[cat._id] = cat.name;
            });

            const productResult = await fetch(`${baseApi}/products?merchant_id=${id}`);
            const productData = await productResult.json();
            let content = "";
            const stopAfter = 5;
            let count = 0;
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
                          
                        </tr>
     `;
                count++;
                if (count === stopAfter) {
                    // You cannot use 'break' here.
                    // Returning here just skips the rest of the CURRENT iteration, not the whole loop.
                    return;
                }
                productsCont.innerHTML = content
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


loadProducts();
