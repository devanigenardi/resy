const linkTitle = document.getElementById('linkTitle');
const url = document.getElementById('url');
const linkCategory = document.getElementById('linkCategory');
const addCategories = document.getElementById('addCategories');
const submitButton = document.getElementById('submitButton');
const cancelButton = document.getElementById('cancelButton');
const addBtn = document.getElementById('addBtn');
const addLinkPanel = document.getElementById('addLinkPanel');
const linksList = document.getElementById('linksList');

let linkCategories = [];
let newlinksObject = [];

addBtn.addEventListener('click', () => {
    showForm();
});

cancelButton.addEventListener('click', event => {
    event.preventDefault();
    hideForm();
    clearLinkForm();
});

function showForm() {
    addLinkPanel.classList.remove('hide');
}

function hideForm() {
    addLinkPanel.classList.add('hide');
    clearLinkForm();
}

linkCategory.addEventListener('keydown', function(event){

    if(event.keyCode === 13){
        event.preventDefault(); // clear the coma event
        linkCategories.push(linkCategory.value); // push the value to the array
        linkCategory.value = ''; // removes duplicated copy

        //display updated categories
        displayLinksCategories();
    }
});

function displayLinksCategories() {
    addCategories.innerHTML = "";
    for(let eyebrow of linkCategories){
        var categoryHtmlString = `<span class="categorie">${eyebrow} </span>`;
        addCategories.innerHTML += categoryHtmlString;
    }

}

//clears content
function clearLinkForm() {
    linkTitle.value = '';
    linkUrl.value = '';
    linkCategory.value = '';
    linkCategories = [];
}

submitButton.addEventListener('click', event => {

    event.preventDefault();

    const title = linkTitle.value;
    const url   = linkUrl.value;
    const categories = linkCategories;

    const newLink = {
        title,
        url,
        categories
    };

    newlinksObject.unshift(newLink); //start from the top

    clearLinkForm();

    hideForm();

    displayLinks();

    addCategories.innerHTML = "";

});

function displayLinks() {
    linksList.innerHTML = '';

    let index = 0;

    for(let link of newlinksObject){

        let linkHtmlString = `
        
            <div class="link panel">
                <div class="link-options">
                    <button class="btn-sm" onClick="deleteLink(${index})">Delete</button>
                </div>
                <a href="${link.url}">
                    <h2 class="header">${link.title}</h2>
                </a>
                <p class="link-date">${Date.now()}</p>
                <div class="category">
                    Categories:`;
                    for(let category of link.categories){
                        linkHtmlString += `<span class="categorie"> ${category}</span>`
                    }

                    linkHtmlString += `
                    
                    
                    </div>
                </div>
            `
        ;

        linksList.innerHTML += linkHtmlString;
        index++;
        console.log(index);

    }
}

function deleteLink(index){
    newlinksObject.splice(index, 1);
    displayLinks();
}
