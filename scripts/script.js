



let HeadspaceCollection = document.getElementById("HeadspaceCollection")
let heroSlider = document.getElementById("heroSlider")
let scrollLeft = document.getElementById("scrollLeft")
let scrollRight = document.getElementById("scrollRight")
let firstcard = HeadspaceCollection.querySelector(".card");
let body = document.querySelector("body")
let pocketoP = document.getElementById("pocketoP")
let rightBtn = document.getElementById("rightBtn")
let leftBtn = document.getElementById("leftBtn")
let pocketoPaTag = document.getElementById("pocketoPaTag")
let hidden = document.getElementById("hidden")
let removePocketop = pocketoP
let cartHidden = document.getElementById("cartHidden")
let cartHiddenBtn = document.getElementById("cartHiddenBtn")


cartHiddenBtn.addEventListener("click", () => {
    // body.classList.add("overflow-hidden");
    cartHidden.classList.remove("hidden");
});

// pocketo window scroll hide
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        pocketoP.classList.add("opacity-0", "-translate-y-2", "pointer-events-none", "max-h-0");
    } else {
        pocketoP.classList.remove("opacity-0", "-translate-y-2", "pointer-events-none", "max-h-0");
    }
});
let hide = true
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
            <div class="card flex-none w-[25%] snap-start">
                <div class="img-wrapper relative w-full">
                    <img 
                        class="w-full transition-opacity duration-300" 
                        src="${prod.image}" 
                        data-hover="${prod.images[1]}"
                        data-original="${prod.images[0]}"
                    />

                    <button class="hover-btn cursor-pointer w-[80%] m-auto absolute font-bold  bottom-4 left-1/2 -translate-x-1/2 
                        bg-white text-black px-3 py-4 rounded-full opacity-0 transition-opacity duration-300">
                        Add to Cart
                    </button>
                </div>

                <p class="font-medium text-2xl ">${prod.title}</p>
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
}
displayProducts()



let singleLoopWidth;
requestAnimationFrame(() => {
    singleLoopWidth = HeadspaceCollection.scrollWidth / 3;

    HeadspaceCollection.scrollLeft = singleLoopWidth;
});


// infinite scroll card
HeadspaceCollection.addEventListener("scroll", () => {

    if (!singleLoopWidth) return;

    if (HeadspaceCollection.scrollLeft >= singleLoopWidth * 2) {
        HeadspaceCollection.style.scrollBehavior = "auto";
        HeadspaceCollection.scrollLeft -= singleLoopWidth;
        HeadspaceCollection.style.scrollBehavior = "smooth";
    }

    if (HeadspaceCollection.scrollLeft <= 0) {
        HeadspaceCollection.style.scrollBehavior = "auto";
        HeadspaceCollection.scrollLeft += singleLoopWidth;
        HeadspaceCollection.style.scrollBehavior = "smooth";
    }
});






let marquee = document.querySelector('.marquee');
let marqueeContent = document.querySelector('.marquee-content');
let scrollPos = 0;

function tick() {
    scrollPos += 1; // pixels per frame
    if (scrollPos >= marqueeContent.scrollWidth / 2) {
        scrollPos -= marqueeContent.scrollWidth / 2;

    } // reset after half (duplicate)
    marquee.scrollLeft = scrollPos;
    requestAnimationFrame(tick);
}

tick();


function scrollContainer(container, amount) {
    container.scrollBy({
        left: amount,
        behavior: 'smooth'

    });
}





let scrollAmount;
if (firstcard) {
    scrollAmount = firstcard.offsetWidth

} else {
    scrollAmount = 360;
}

let heroScrollAmount;
if (heroSlider) {
    heroScrollAmount = heroSlider.offsetWidth

} else {
    heroScrollAmount = 360;
}



// infinite btn
function leftScroll(direction) {
    direction.addEventListener('click', () => {
        scrollContainer(HeadspaceCollection, -scrollAmount); // scroll left for cards
    });
}
leftScroll(scrollLeft)

function rightScroll(direction) {
    direction.addEventListener('click', () => {
        scrollContainer(HeadspaceCollection, scrollAmount); // scroll right for cards
    });

}
rightScroll(scrollRight)


// hero btn
function heroLeftScroll(direction) {
    direction.addEventListener('click', () => {
        scrollContainer(heroSlider, -heroScrollAmount); // scroll left for hero
    });
}

function heroRightScroll(direction) {
    direction.addEventListener('click', () => {
        scrollContainer(heroSlider, heroScrollAmount); // scroll right for hero
    });

}
heroLeftScroll(leftBtn)
heroRightScroll(rightBtn)
