let title = document.getElementById("name")
let image = document.getElementById("img")
let category = document.getElementById("category")
let thumbnail = document.getElementById("imgTmb")
let price = document.getElementById("price")
let description = document.getElementById("description")
let createProductBtn = document.getElementById("create_product_btn")
let merchant_info = localStorage.getItem("My_vendor")
const baseApi = "http://ecommerce.reworkstaging.name.ng/v2";
let parsed_merchant = JSON.parse(merchant_info);
let id = parsed_merchant.vendor_id
let moreImageBtn = document.getElementById("more_image")


let logoutBtn = document.getElementById("logoutBtn");
let login_logout = document.getElementById("login_logout");
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("My_vendor");
    window.location.href = "../merchant/merchantlogin.html";
});

if (merchant_info) {
    login_logout.innerText = "Sign Out"
    loadCategories();
} else {
    alert("please login to create products")
    login_logout.innerHTML = "Log in"
}

// additional images
function moreImage() {
    let imageContainer = document.getElementById("imageContainer");
    let new_input = document.createElement("input");
    new_input.classList.add("imageInput", "border", "border-gray-300", "outline-none", "p-2", "w-[95%]")
    imageContainer.append(new_input);
}

// aditional images btn
moreImageBtn.addEventListener("click", (e) => {
    e.preventDefault()
    moreImage();
})


async function loadCategories() {
    try {
        const response = await fetch(`${baseApi}/categories?merchant_id=${id}`);
        const data = await response.json();
        let option = null
        data.forEach(cat => {
            option = document.createElement("option");
            option.value = cat.id;
            option.textContent = cat.name;
            category.appendChild(option);
        });
        if (!option.value) {
            alert("please create a category first")
            window.location.href = "../merchant/createCategory.html";
            return
        }
    } catch (error) {
        console.log(error)
    }

}






async function createProduct() {

    if (!merchant_info) {
        alert("please login to create products")
        return
    }

    if (title.value == "" || price.value == "" || description.value == "" || category.value == "") {
        alert("all fields required.")
        return
    }

    if (!merchant_info) {
        alert("please login first");
        window.location.href = "../merchants/merchantLogin.html";
        return;
    }
    let imageInput = document.querySelectorAll(".imageInput")
    let imageArr = [];
    imageInput.forEach(image => {
        imageArr.push(image.value);
    });

    console.log(imageArr)
    let Product_obj = {
        title: title.value,
        price: price.value,
        images: imageArr,
        descp: description.value.trim(),
        merchant_id: id,
        currency: "NGN",
        category_id: category.value

    };
    try {
        let response = await fetch(`${baseApi}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Product_obj),
        })
        const data = await response.json();
        alert("product created successfully");
        console.log(data);
    } catch (error) {
        console.log(error)
        alert("an error occored")
    }
    window.location.reload()
}

createProductBtn.addEventListener("click", (e) => {
    e.preventDefault()
    createProduct()
})
