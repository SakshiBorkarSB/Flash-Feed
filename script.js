const API_KEY = "236f9d1d7d1841bf940d92b1a2f2a71f";
const API_URL = "https://newsapi.org/v2/everything?q=";

/* 

    url = https://newsapi.org/v2/everything?q=tesla&from=2025-03-02&sortBy=publishedAt&apiKey=236f9d1d7d1841bf940d92b1a2f2a71f 

    where q=tesla will give news related to tesla... further specifying the date and sorting the news by published at date followed with an API key... Similarly we did in async function fetch... where query will give news about specified content

*/

// Calls fetch news function (When the page load we see news related to India)
window.addEventListener('load', () => fetchNews("India"));


// When clicked on logo, page reloads
function reload() {
    window.location.reload();
}

// Fetch News Function (Asynchronous) - Will bring the news of whatever query we specify
// Since news will take time to fetch... we used async and await so that a promise is made
async function fetchNews(query){
    const response = await fetch(`${API_URL}${query}&apiKey=${API_KEY}`)

    // convert data to json format
    const data = await response.json();
    bindData(data.articles);
}



// Bind data function which binds the articles - basically creating cards(templates) equal to the articles fetched and append it in the newsCards
function bindData(articles){
    // Get cardsCollection (container of cards)
    const container = document.getElementById('cardsCollection');

    // Get template
    const cardTemplate = document.getElementById('newsCardTemplate');

    // Container will become empty before bindData is called otherwise it will keep appending new cards to the ones called before
    container.innerHTML = "";

    articles.forEach(article => {
        // If any article has no image then return
        if(!article.urlToImage){
            return;
        }

        // Making card clones (deep cloning)
        const cardClones = cardTemplate.content.cloneNode(true)

        // Fill data in the cards
        fillData(cardClones, article);

        // Append cardClones to container
        container.appendChild(cardClones);
    });
}



// Fill data function
function fillData(cardClones, article){
    const cardImage = cardClones.querySelector('#newsImage');
    const cardTitle = cardClones.querySelector('#newsTitle');
    const cardSource = cardClones.querySelector('#newsSource');
    const cardDescription = cardClones.querySelector('#newsDescription');


    // Convert date to readable format
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });


    // Source for news image
    cardImage.src = article.urlToImage;
    cardTitle.innerHTML = article.title;
    cardSource.innerHTML = `${article.source.name} , ${date}`;
    cardDescription.innerHTML = article.description;

    // When clicked on a card, it will redirect to the article where "_blank" means a new tab
    cardClones.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");
    })
}



// To highlight current selected items
let currSelect = null;
// Opens related news when clicked on nav options
function clickNavItem(id){

    // Will fetch the news and bind data as well
    fetchNews(id);
    const navItem = document.getElementById(id);

    // When a new nav item is clicked, active class from old one is removed
    currSelect?.classList.remove('active');

    // Add active class to the new selected item
    currSelect = navItem;
    currSelect.classList.add('active');
}


// Fetch news when searched using search bar
const searchBtn = document.getElementById('searchButton');
const searchText = document.getElementById('searchNews');

// When clicked on search button this function will get executed
searchBtn.addEventListener('click', () => {
    const searchQuery = searchText.value;

    // If user didn't enter a value and hit the search button, return
    if(!searchQuery){
        return;
    }
    // If search bar is NOT empty then fetch the entered news
    fetchNews(searchQuery);
    
    // When user seaches on searhc bar , active class from old one is removed
    currSelect?.classList.remove('active');
    currSelect = null;
})


// Hamburger menu
let menuIcon = document.querySelector('#hamburger');
let navLinks = document.querySelector('.navLinks');
let navItems = document.querySelectorAll('.navLinks ul li');

// Toggle the hamburger menu
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navLinks.classList.toggle('active');
};

// Close menu when a nav item is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuIcon.classList.remove('bx-x');
    });
});



// For Dark Mode
document.addEventListener("DOMContentLoaded", function () {
    const toggleIcon = document.getElementById("dark-mode-toggle");
    const body = document.body;

    // Function to update the icon based on mode
    function updateIcon() {
        if (body.classList.contains("dark-mode")) {
            toggleIcon.classList.replace("bx-moon", "bx-sun"); // Change to sun
        } else {
            toggleIcon.classList.replace("bx-sun", "bx-moon"); // Change to moon
        }
    }

    // Check if dark mode is enabled in local storage
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        updateIcon(); // Ensure correct icon on page load
    }

    toggleIcon.addEventListener("click", function () {   
        body.classList.toggle("dark-mode");

        // Store the preference in localStorage
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }

        updateIcon(); // Change the icon dynamically
    });
});
