const handleCategory = async() =>{
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();

    const tabContainer = document.getElementById('tab-container');

    data.data.slice(0, 4).forEach((category) =>{
        const div = document.createElement("div");
        div.innerHTML = `
        <a class="btn normal-case text-base hover:bg-[#FF1F3D] hover:text-white">${category.category}</a>
        `;
        tabContainer.appendChild(div);
    })

    console.log(data.data);
    
}
handleCategory();