
const API_KEY = "ef555cc72da843c4835681c813322194";
const url = "https://newsapi.org/v2/everything?q=";

async function fetchNews(query) {
    try {
        const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        const data = await response.json();
        
        displayBreakingNews(data.articles.slice(0, 2));
        bindData(data.articles.slice(2));
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

function displayBreakingNews(articles) {
    const breakingNews1 = document.getElementById("breaking-news-1");
    const breakingNews2 = document.getElementById("breaking-news-2");

    if (articles.length > 0) {
        breakingNews1.innerHTML = articles[0].title;
        breakingNews1.addEventListener("click", () => {
            window.open(articles[0].url, "_blank");
        });
    }

    if (articles.length > 1) {
        breakingNews2.innerHTML = articles[1].title;
        breakingNews2.addEventListener("click", () => {
            window.open(articles[1].url, "_blank");
        });
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
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

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}
function updateLiveTelecast(id) {
    const liveTelecastContainer = document.getElementById("live-telecast-container");

    const existingIframe = liveTelecastContainer.querySelector("iframe");
    if (existingIframe) {
        liveTelecastContainer.removeChild(existingIframe);
    }

    let channel;
    switch (id) {
        case "sports":
            channel = "UCqZQlzSHbVJrwrn5XvzrzcA"; 
            break;
        case "finance":
            channel = "UCcyq283he07B7_KUX07mmtA"; 
            break;
        case "politics":
            channel = "UCbiFt3UdxX7LxferwDmuegQ"; 
            break;
        case "technology":
            channel = "UCj34AOIMl_k1fF7hcBkD_dw"; 
            break;
        case "health":
            channel = "UCj_pCfDTL3HAWR-0b6oj5wQ";
            break;
        case "entertainment":
            channel = "UCi8e0iOVk1fEOogdfu4YgfA";
            break;
        default:
            return;
    }
    const liveTelecastFrame = document.createElement("iframe");
    liveTelecastFrame.id = "live-stream";
    liveTelecastFrame.src = `https://www.youtube.com/embed/live_stream?channel=${channel}`;
    liveTelecastFrame.allowFullscreen = true;
    liveTelecastFrame.width = "100%";
    liveTelecastFrame.height = "400";
    liveTelecastContainer.appendChild(liveTelecastFrame);
}
window.addEventListener("load", () => {
    fetchNews("India"); 
    updateLiveTelecast("sports"); 
});
function onNavItemClick(id) {
    fetchNews(id); 
    updateLiveTelecast(id);
    const navItem = document.getElementById(id);
    const curSelectedNav = document.querySelector(".nav-item.active");
    curSelectedNav?.classList.remove("active");
    navItem.classList.add("active");
}
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value.trim();
    if (query) {
        fetchNews(query);
        const curSelectedNav = document.querySelector(".nav-item.active");
        curSelectedNav?.classList.remove("active");
    }
});
