
let HeadspaceCollection = document.getElementById("HeadspaceCollection")
const baseApi = "http://ecommerce.reworkstaging.name.ng/v2";





function toggleText() {
    const container = document.getElementById('text-container');

    // Toggle the classes to switch between a small max-height and a large max-height
    container.classList.toggle('max-h-[50px]'); // The collapsed height
    container.classList.toggle('max-h-[500px]'); // The expanded height (ensure this is large enough)

    // Change button text based on state
    if (container.classList.contains('max-h-[50px]')) {
        showMore.innerHTML = 'Read more';
    } else {
        showMore.innerHTML = 'Read less';
    }
}

async function displayProducts() {
    const baseApi = "http://ecommerce.reworkstaging.name.ng/v2";
    let vendor = JSON.parse(localStorage.getItem("My_vendor"));
    let id = vendor.vendor_id
    try {
        let result = await fetch(`${baseApi}/products?merchant_id=${id}`)
        let data = await result.json();
        collection = "";
        data.data.forEach(prod => {
            collection += `
           <a href="../item-page.html?Product_id=${prod.id}">
            <div class="card flex-none w-[25%] snap-start">
                <div class="img-wrapper relative w-full">
                    <img 
                        class="w-full h-auto transition-opacity duration-300" 
                        src="${prod.image}" 
                        data-hover="${prod.images[1]}"
                        data-original="${prod.images[0]}"
                    />

                    <button class="hover-btn cursor-pointer w-[80%] m-auto absolute font-bold  bottom-4 left-1/2 -translate-x-1/2 
                        bg-white text-black px-3 py-4 rounded-full opacity-0 transition-opacity duration-300">
                        Add to Cart
                    </button>
                </div>

                <a href="#" class="hover:text-gray-700"><p class="font-medium text-2xl ">${prod.title}</p></a>
                <h5 class="font-medium text-lg">${prod.price}</h5>
            </div></a>
        `;
        });
        HeadspaceCollection.innerHTML = collection

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
}
displayProducts()
// let thumbnail = document.getElementById("thumbnail")
// let nextPic = document.getElementById("nextPic")
// let prevPic = document.getElementById("prevPic")
// let itemImg = document.getElementById("item_img")

async function displaySingleProduct() {
    let singleItemContainer = document.getElementById("singleItemContainer")
    let url = window.location.search;
    let id = new URLSearchParams(url).get("Product_id");
    let vendor = JSON.parse(localStorage.getItem("My_vendor"));
    let ven_id = vendor.vendor_id
    try {
        let response = await fetch(`${baseApi}/products/${id}`)
        let data = await response.json();
        let content = `
         <div class="w-[100%] pt-34 flex ">
            <div class="w-[10%] mx-auto" id="thumbnail"></div>
            <div class="  w-[50%] flex items-center justify-between px-5">
                <a id="prevBtn" class="cursor-pointer">
                  <div class="">
                <img class="" src="./images/icons/arrow.png" alt="">
            </div></a>
                <div class=" w-[80%]">
                    <img id="mainImage" class="" src="${data.images[0]}" alt="">
                </div>
                <a id="nextBtn" class="cursor-pointer">
                    <div class="">
                        <img class="" src="./images/icons/right-arrow.png" alt="">
                    </div>
                </a>
            </div>
            <div class="w-[40%] mr-5">
                <h2 class="font-medium capitalize text-3xl my-5">${data.title}</h2>
                <h4 class=" font-medium pb-5 text-lg">${data.price}</h4>
                <p class="capitalize text-gray-400 text-sm pb-1">color: <span class="text-black"></span></p>
                <button class="rounded-full border  h-5 w-5 bg-orange-400"></button>
                <div class=" flex gap-5 mb-5">
                    <div class=" flex gap-5 items-center border border-blue-500 p-5 rounded-full">
                        <img class="size-4" src="./images/icons/minus.png" alt="">
                        <span class="">2</span>
                        <img class="size-4" src="./images/icons/plus.png" alt="">
                    </div>
                    <button class="capitalize px-40 rounded-full bg-gray-200 text-gray-400 font-medium">Sold
                        Out</button>
                </div>
                <button class=" border-[#0085ca] py-2 border mb-5 px-40 capitalize cursor-pointer   "> notify me when
                    available</button>
                <!-- collapse content -->
                <div class="">
                    <!-- The main container for the collapsible content -->
                    <div id="text-container"
                        class="overflow-hidden max-h-[50px] transition-[max-height] duration-500 ease-in-out">
                        <p class="text-black font-medium">
                           ${data.descp}
                        </p>
                    </div>
                    <button id="showMore" class=" text-blue-600 hover:text-blue-800 font-semibold cursor-pointer">
                        Read more
                    </button>
                    <!-- The "Read More" Button -->
                </div>
                <hr class="border-blue-500">
                <div class="flex py-5 items-center justify-between">
                    <p class="capitalize">details</p>
                    <img class="size-4" src="./images/icons/plus.png" alt="">
                </div>
                <hr class="border-blue-500">
                <div class="flex py-5 items-center justify-between">
                    <p class="capitalize">Shipping & returns</p>
                    <img class="size-4" src="./images/icons/plus.png" alt="">
                </div>
                <hr class="border-blue-500">
            </div>
        </div>
        `;
        singleItemContainer.innerHTML = content
        let thumbnail = document.getElementById("thumbnail")
        let thumbnailContent = ""
        data.images.forEach(image => {
            thumbnailContent +=
                `
             <div class="w-[80px] m-auto">
            <img src="${image}">
        </div>;
                `
        });

        thumbnail.innerHTML = thumbnailContent
        let nextBtn = document.getElementById("nextBtn");
        let prevBtn = document.getElementById("prevBtn");
        let mainImage = document.getElementById("mainImage");
        let i = 0;

        nextBtn.addEventListener("click", (e) => {
            e.preventDefault();

            if (i < data.images.length - 1) {
                i++;
                mainImage.src = data.images[i];
            }
        });

        prevBtn.addEventListener("click", (e) => {
            e.preventDefault();

            if (i > 0) {
                i--;
                mainImage.src = data.images[i];
            }
        });


    } catch (error) {
        console.log(error)
    }


    const showMore = document.getElementById('showMore');
    showMore.addEventListener('click', toggleText);
}
displaySingleProduct()

