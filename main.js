const accessKey = "icsu9UtbL8eH1h5KQC8Tl-yfYQXzeJOE-4zIhqDQ9mI";

const formElement = document.querySelector("form")
const inputElement = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results")
const showMore = document.getElementById("show-more-button")

let inputData = "";
let pageNumber = 1;

async function searchImages() {
    inputData = inputElement.value;
    const url = `https://api.unsplash.com/search/photos?page=${pageNumber}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (pageNumber === 1)
        searchResults.innerHTML = "";

    results.map((result) => {
        const imageWrapper = document.createElement("div")
        imageWrapper.classList.add("search-result")

        const image = document.createElement("img")
        image.src = result.urls.small
        image.alt = result.alt_description

        const imageLink = document.createElement("a")
        imageLink.href = result.links.html
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description

        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageLink)
        searchResults.appendChild(imageWrapper)
    });

    pageNumber++

    if (pageNumber > 1)
        showMore.style.display = "block"
}

formElement.addEventListener("submit", (event) => {
    event.preventDefault()
    pageNumber = 1;
    searchImages()
})

showMore.addEventListener("click", () => {
    searchImages()
})