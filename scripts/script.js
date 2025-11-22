let products = [
    {
        image: "./images/pkImages/PK-FeelItAllGelPens-Product-1.webp",
        description: "Headspace X poketo pens",
        hoverIMG: "./images/pkImages/PK-FeelItAllGelPens-Product-2.webp",
        price: 14
    },
    {
        image: "./images/pkImages/PK-loveYourMindJournal-Product-1.webp",
        description: "Headspace X poketo journal",
        hoverIMG: "./images/pkImages/PK-loveYourMindJournal-Product-2.webp",
        price: 28
    },
    {
        image: "./images/pkImages/PK-MentalNotes-Product-1.webp",
        description: "Headspace X poketo sticky notes",
        hoverIMG: "./images/pkImages/PK-MentalNotes-Product-2.webp",
        price: 8
    },
    {
        image: "./images/pkImages/1-PK-Headspace-MindfulnessCards.jpg",
        description: "Headspace X poketo mindfulness cards",
        hoverIMG: "./images/pkImages/PK-Headspace-MindfulnessCards-1.jpg",
        price: 15
    },
    {
        image: "./images/pkImages/YieldXHeadspace-instantsunshine-product.webp",
        description: "Headspace X YIELD instant sunshine candle",
        hoverIMG: "./images/pkImages/HeadspaceCollabPoketoandyield1940-pdpv1copia_6772a246-58c9-4f18-902f-fc2ba7e9e561.jpg",
        price: "sold out"
    },
    {
        image: "./images/pkImages/PK-EverydayMindfulnessCalendar-Product-1.webp",
        description: "Headspace X poketo calendar",
        hoverIMG: "./images/pkImages/PK-EverydayMindfulnessCalendar-Product-2.webp",
        price: 24
    }
];
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

function displayPkHeadspace() {
    let collection = ``;
    const loopItems = [...products, ...products, ...products];

    for (let i = 0; i < loopItems.length; i++) {
        collection += `
            <div class="card flex-none w-[25%] snap-start">
                <div class="img-wrapper relative w-full">
                    <img 
                        class="w-full transition-opacity duration-300" 
                        src="${loopItems[i].image}" 
                        data-hover="${loopItems[i].hoverIMG}"
                        data-original="${loopItems[i].image}"
                    />

                    <button class="hover-btn cursor-pointer w-[80%] m-auto absolute font-bold  bottom-4 left-1/2 -translate-x-1/2 
                        bg-white text-black px-3 py-4 rounded-full opacity-0 transition-opacity duration-300">
                        Add to Cart
                    </button>
                </div>

                <p class="font-medium text-2xl ">${loopItems[i].description}</p>
                <h5 class="font-medium text-lg">$${loopItems[i].price}</h5>
            </div>
        `;
    }

    HeadspaceCollection.innerHTML = collection;

    // JS hover 
    let wrappers = HeadspaceCollection.querySelectorAll(".img-wrapper");

    for (let i = 0; i < wrappers.length; i++) {
        let wrapper = wrappers[i];
        let img = wrapper.querySelector("img");
        let btn = wrapper.querySelector(".hover-btn");

        wrapper.addEventListener("mouseenter", () => {
            img.style.opacity = 0;
            btn.style.opacity = 1; // fade button in

            setTimeout(() => {
                img.src = img.dataset.hover;
                img.style.opacity = 1;
            }, 200);
        });

        wrapper.addEventListener("mouseleave", () => {
            img.style.opacity = 0;
            btn.style.opacity = 0; // fade button out

            setTimeout(() => {
                img.src = img.dataset.original;
                img.style.opacity = 1;
            }, 200);
        });
    }
}


displayPkHeadspace();
let singleLoopWidth;
requestAnimationFrame(() => {
    singleLoopWidth = HeadspaceCollection.scrollWidth / 3;

    HeadspaceCollection.scrollLeft = singleLoopWidth;
});




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

function leftScroll(direction) {
    direction.addEventListener('click', () => {
        scrollContainer(HeadspaceCollection, -scrollAmount); // scroll left for cards
    });
}
leftScroll(scrollLeft)
function heroLeftScroll(direction) {
    direction.addEventListener('click', () => {
        scrollContainer(heroSlider, -heroScrollAmount); // scroll left for hero
    });
}
heroLeftScroll(leftBtn)

function rightScroll(direction) {
    direction.addEventListener('click', () => {
        scrollContainer(HeadspaceCollection, scrollAmount); // scroll right for cards
    });

}
rightScroll(rightBtn)
function heroRightScroll(direction) {
    direction.addEventListener('click', () => {
        scrollContainer(heroSlider, heroScrollAmount); // scroll right for hero
    });

}
heroRightScroll(rightBtn)
