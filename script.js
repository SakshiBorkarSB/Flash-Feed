const API_KEY = "236f9d1d7d1841bf940d92b1a2f2a71f";
const API_URL = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query){
    const response = await fetch(`${API_URL}${query}&apiKey=${API_KEY}`)

    // convert data to json format
    const data = await response.json();
    bindData(data.articles);
}

function bindData(articles){
    const container = document.getElementById('cardsCollection');
    const cardTemplate = document.getElementById('newsCardTemplate');

    container.innerHTML = "";

    articles.forEach(article => {
        if(!article.urlToImage){
            return;
        }

        const cardClones = cardTemplate.content.cloneNode(true)

        fillData(cardClones, article);

        container.appendChild(cardClones);
    });
}

function fillData(cardClones, article){
    const cardImage = cardClones.querySelector('#newsImage');
    const cardTitle = cardClones.querySelector('#newsTitle');
    const cardSource = cardClones.querySelector('#newsSource');
    const cardDescription = cardClones.querySelector('#newsDescription');


    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });


    cardImage.src = article.urlToImage;
    cardTitle.innerHTML = article.title;
    cardSource.innerHTML = `${article.source.name} , ${date}`;
    cardDescription.innerHTML = article.description;

    cardClones.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");
    })
}

let currSelect = null;
function clickNavItem(id){

    fetchNews(id);
    const navItem = document.getElementById(id);

    currSelect?.classList.remove('active');

    currSelect = navItem;
    currSelect.classList.add('active');
}

const searchBtn = document.getElementById('searchButton');
const searchText = document.getElementById('searchNews');

searchBtn.addEventListener('click', () => {
    const searchQuery = searchText.value;

    if(!searchQuery){
        return;
    }
    fetchNews(searchQuery);
    
    currSelect?.classList.remove('active');
    currSelect = null;
})


let menuIcon = document.querySelector('#hamburger');
let navLinks = document.querySelector('.navLinks');
let navItems = document.querySelectorAll('.navLinks ul li');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navLinks.classList.toggle('active');
};

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuIcon.classList.remove('bx-x');
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const toggleIcon = document.getElementById("dark-mode-toggle");
    const body = document.body;

    function updateIcon() {
        if (body.classList.contains("dark-mode")) {
            toggleIcon.classList.replace("bx-moon", "bx-sun"); 
        } else {
            toggleIcon.classList.replace("bx-sun", "bx-moon"); 
        }
    }

    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        updateIcon(); 
    }

    toggleIcon.addEventListener("click", function () {   
        body.classList.toggle("dark-mode");

        // Store the preference in localStorage
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }

        updateIcon(); 
    });
});
