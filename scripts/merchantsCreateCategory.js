let cat_name = document.getElementById("cat_name");
let cat_image = document.getElementById("cat_img");
let create_cat_btn = document.getElementById("create_cat_btn");
let categories = document.getElementById("categories");
const baseApi = "http://ecommerce.reworkstaging.name.ng/v2";
let merchant_info = localStorage.getItem("My_vendor");
let parsed = JSON.parse(merchant_info);
let id = parsed.vendor_id




let logoutBtn = document.getElementById("logoutBtn");
let login_logout = document.getElementById("login_logout");
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("My_vendor");
    window.location.href = "../merchant/merchantlogin.html";
});

if (merchant_info) {
    login_logout.innerText = "Sign Out"
    getCatefories()

} else {
    alert("please login to create Category")
    login_logout.innerHTML = "Log in"
}


create_cat_btn.addEventListener("click", async (e) => {
    e.preventDefault();
    if (!merchant_info) {
        alert("please login to create Category")
        return
    }
    if (cat_name.value == "" || cat_image.value == "") {
        alert("All fields are required");
        return;
    }

    if (!merchant_info) {
        alert("Please login first");
        window.location.href = "../merchants/merchantLogin.html";
        return;
    }


    let categoryObject = {
        name: cat_name.value,
        image: cat_image.value,
        merchant_id: id
    };

    try {
        let response = await fetch(`${baseApi}/categories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(categoryObject)
        });

        let data = await response.json();
        alert("Category created successfully");
        window.location.reload()
        return
    }
    catch (err) {
        console.log(err);
        alert("Something went wrong");
    }

});


async function getCatefories() {
    try {
        let id = parsed.vendor_id
        let res = await fetch(`${baseApi}/categories?merchant_id=${id}`)
        let data = await res.json()
        content = "";
        data.forEach(item => {
            content +=
                `
                  <tr>
                            <td>
                                <p class="font-bold capitalize">${item.name}</p>
                            </td>
                            <td>
                                <div class="flex justify-center"><img class="size-15"
                                        src="${item.image}" alt="">
                                </div>
                            </td>
                            <td>
                                <p class="font-bold ">${item.total_sold}</p>
                            </td>
                            
                            <td><button  class="category_delete_btn text-sm cursor-pointer" id="${item.id}">❌</button></td>
                        </tr>
            `
            categories.innerHTML = content
        });
    } catch (error) {
        console.log(error)
    }
    let deleteCategory = document.querySelectorAll(".category_delete_btn")
    deleteCategory.forEach(btn => {
        // /products?merchant_id=123&category_id=321
        try {
            let cat_id = btn.id
            btn.addEventListener("click", async () => {
                let prodRes = await fetch(`${baseApi}/products?merchant_id=${id}&category_id=${cat_id}`)
                let data = await prodRes.json()
                if (data.total < 1) {
                    console.log(cat_id)
                    if (confirm("are you sure you want to delete?")) {
                        let response = await fetch(`${baseApi}/categories/${cat_id}`, {
                            method: "DELETE"
                        });
                        alert("Product deleted")
                        window.location.reload()
                        return
                    }

                } else {
                    if (confirm("category contains some products, are you sure you want to delete?")) {
                        let response = await fetch(`${baseApi}/categories/${cat_id}`, {
                            method: "DELETE"
                        });
                        alert("Product deleted")
                        window.location.reload()
                    }
                }


            })
        } catch (error) {
            console.log(error)
        }
    });
}

