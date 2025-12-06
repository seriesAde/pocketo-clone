let loopItems = [
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



const showMore = document.getElementById('showMore');
showMore.addEventListener('click', toggleText);

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
function displayPkHeadspace() {
    let collection = ``;

    for (let i = 0; i < 4; i++) {
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