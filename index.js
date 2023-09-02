 const API_KEY = "a8c097f0b34e41bc85029551bb123604";
 const url = "https://newsapi.org/v2/everything?q="


 window.addEventListener('load',()=>fetchNews("India"));

function reload(){
    window.location.reload();
}

 async function fetchNews(query){
    const res = await fetch (`${url}${query}&apiKey=${API_KEY}`)
    const data = await res.json();
    console.log(data)
    bindData(data.articles);

 }
 
 function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    
    const newsCardTemplate = document.getElementById('template-news-card')
  
    cardsContainer.innerHTML = '' //ye blank rakhi h and isko bind data k starting me isliye rakha h taki agar phele se 100 data h or dobara se hamne api call kardi to wapis se 100 or add ho jayege isliye  is problem ko avoid karne k liye ye blank rakha h 

    articles.forEach((article)=>{

        if(!article.urlToImage)return;

        const cardClone = newsCardTemplate.content.cloneNode(true); //yha se hamne deep clone kar liya h or fir isko ham cardcontainer me daal denge 

        fillDataInCard(cardClone,article);

        cardsContainer.appendChild(cardClone);
        // cloning se hoga kya ki hamre article k andar jitne be hoge vo sab ak ak karke clone bante jayege 


    });

    
 }

 
function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;
// console.log(cardClone.firstElementChild)
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}



 let curSelectedNav = null;
 function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active")
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active")
 }

 const searchButton= document.getElementById("search-button")
 const searchText= document.getElementById("search-text")
  searchButton.addEventListener("click",()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=null;
})