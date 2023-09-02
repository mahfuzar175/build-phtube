let sortByViewsAsc = true;

const handleCategory = async() =>{
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();

    const tabContainer = document.getElementById('tab-container');

    const trimedData = data.data.slice(0, 4);

    trimedData.forEach((category) =>{
        const div = document.createElement("div");
        div.innerHTML = `
        <a onclick="handleLoadCategory('${category.category_id}')" class="btn normal-case text-base hover:bg-[#FF1F3D] hover:text-white mt-4 mb-4">${category.category}</a>
        `;

        tabContainer.appendChild(div);
        
    });

    console.log(data.data);
    
};

const handleLoadCategory = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();


    data.data.sort((a, b) => {
        const viewsA = parseInt(a.others.views);
        const viewsB = parseInt(b.others.views);
        return sortByViewsAsc ? viewsA - viewsB : viewsB - viewsA;
    });
    
    const cardContainer = document.getElementById('card-container');
    const errorContainer = document.getElementById('error-container');
    const errorMessageText = document.getElementById('error-message-text');

    if (data.data.length === 0) {
        errorMessageText.textContent = data.message;
        errorContainer.classList.remove('hidden');
        cardContainer.innerHTML = "";
        
    }
    else{
        errorContainer.classList.add('hidden');
        cardContainer.innerHTML = "";

        data.data?.forEach((content) => {
            const div = document.createElement('div');
    
            const seconds = content.others?.posted_date;
            const hours = Math.floor(seconds / 3600);
            const remainingSeconds = seconds % 3600;
            const minutes = Math.floor(remainingSeconds / 60);
            console.log(hours, minutes);
    
            const timeAgo = seconds? `<div class="text-center lg:right-4 lg:top-40 lg:absolute lg:rounded bg-[#171717] text-white p-1"><h2>${hours}hrs ${minutes} min ago</h2></div>` : '';
    
            div.innerHTML = `
            <div class="card bg-base-100 shadow-xl">
                <figure><img class="thumbnail-img w-full lg:w-[312px] lg:h-[200px] md:w-full md:h-[200px]" src="${content?.thumbnail}" /></figure>
                ${timeAgo}
                <div class="card-body">
                    <div class="flex justify-start items-center gap-1">
                        <div><img class="rounded-full w-[40px] h-[40px]" src="${content.authors[0]?.profile_picture}"></div>
                        <div><h2 class="card-title">${content.title}</h2></div>
                    </div>
                    <div class="flex ml-12 gap-4">
                        <div><h2>${content.authors[0]?.profile_name}</h2></div>
                        <div><h2>${content.authors[0].verified ? '<img src="fi_10629607.svg"/>' : ''}</h2></div>
                    </div>
                    <div class="ml-12"><h2>${content.others?.views}</h2></div>
                </div>
            </div>
            `;
            cardContainer.appendChild(div);
            
        })
    } 
};


const sortByViews = () => {

    sortByViewsAsc = !sortByViewsAsc;
    const categoryId = getCurrentCategoryId();
    handleLoadCategory(categoryId);

};



const handleBlog = () =>{
    window.location.href = 'block.html';
}

const handleHome = () =>{
    window.location.href = 'index.html';
}


const getCurrentCategoryId = () => {

    return '1000'; 

};

handleCategory();
handleLoadCategory("1000", "1001", "1003", "1005");

