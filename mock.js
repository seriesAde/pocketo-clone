
content += `
    <div class="mt-10">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-5 w-full ">
                <!-- Item Image Placeholder -->
                <img src="${productData.images[0]}" alt="Headspace x Poketo Pens"
                    class="w-25 h-30 rounded object-cover">
                <div class="flex justify-between items-end w-full">
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
            </div>
        </div>
    </div>


            `;