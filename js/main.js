/* variables to hold HTML elements */
var layer = document.getElementById('layer');
var layerDiv = document.querySelector('#layer div');
var siteName = document.getElementById('siteName');
var siteURL = document.getElementById('siteUrl');
var table = document.getElementById('table-data-id');
var submitBtn = document.querySelector('.btn-submit');
var validTrueIcon = document.querySelectorAll('.fa-check');
var validFalseIcon = document.querySelectorAll('.false');
var layerCloseBtn = document.querySelector('#layer-xmark');

/* bookmarks list */
var bookmarks = [];

/* getting saved URLs from the local storage if exists */
if(localStorage.getItem('bookMarks')){
    /* saving the bookmarks in URLs variable */
    bookmarks = JSON.parse(localStorage.getItem('bookMarks'));

    /* display the URLs */
    displayURLs(bookmarks);
}

/* display function */
/**
 * Function to show the stored URLs
 */
function displayURLs(list){
    var content = '';
    for(var i = 0 ; i < list.length ; i++){
        var localLink = list[i].link.includes('https://')?list[i].link: "https://"+list[i].link;
        content +=  `
                    <tr>
                        <td>${i+1}</td>
                        <td>${list[i].name}</td>
                        <td>
                            <div class="text-center mt-3">
                                <a target="_blank" href="${localLink}" class="btn btn-visit m-auto">
                                    <i class="fa-regular fa-eye"></i>
                                    Visit
                                </a>
                            </div>
                        </td>
                        <td>
                            <div class="text-center mt-3">
                                <button onclick="deleteURL(${i});" class="btn btn-delete m-auto">
                                    <i class="fa-solid fa-trash-can"></i>
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                    `;
    }
    table.innerHTML = content;

}

/**
 * Function to show the last index of 
 * the bookmarks list.
 */
function displayLastIndex(){
    var localLink = bookmarks[bookmarks.length -1].link.includes('https://')?bookmarks[bookmarks.length -1].link: "https://"+bookmarks[bookmarks.length -1].link;   
    table.innerHTML += `
                    <tr>
                        <td>${bookmarks.length}</td>
                        <td>${bookmarks[bookmarks.length -1].name}</td>
                        <td>
                            <div class="text-center mt-3">
                                <a target="_blank" href="${localLink}" class="btn btn-visit m-auto">
                                    <i class="fa-regular fa-eye"></i>
                                    Visit
                                </a>
                            </div>
                        </td>
                        <td>
                            <div class="text-center mt-3">
                                <button onclick="deleteURL(${bookmarks.length -1});" class="btn btn-delete m-auto">
                                    <i class="fa-solid fa-trash-can"></i>
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                    `;
}

/* Clear function */
/**
 * Function to clear the siteName and 
 * siteURL inputs
 */
function clearForm(){
    siteName.value = null;
    siteURL.value = null;
}

/* URLs functions: addURL , deleteURL */
/**
 * Function to add a bookmark from
 * local storage.
 */
function addURL(){
    var bookmark = {
        name: siteName.value,
        link: siteURL.value
    }
    /* pushing to the bookmarks list */
    bookmarks.push(bookmark);
    
    /* updating the local storage */
    localStorage.setItem('bookMarks' , JSON.stringify(bookmarks));

    /* displaying last index */
    displayLastIndex();
}

/**
 * Function to delete a bookmark from
 * local storage.
 */
function deleteURL(index){
    /* delete the item from the bookmarks list */
    bookmarks.splice(index , 1);

    /* update the local storage */
    localStorage.setItem('bookMarks' , JSON.stringify(bookmarks));

    /* display the update bookmarks list */
    displayURLs(bookmarks);

}

/* Layer functions: */
/**
 * Function to close the layer
 */
function closeLayer(){
    layer.classList.replace('d-flex' , 'd-none');
}

/**
 * Function to close the layer
 */
function showLayer(){
    layer.classList.replace('d-none' , 'd-flex');
}

/*************** validation section ***************/
var nameValidationFlag = false;
var urlValidationFlag = false;
/* validation events */
siteName.addEventListener('blur' , function(){
    var siteNameRegex = /^[a-zA-z]{3}/;
    if(siteNameRegex.test(siteName.value)){
        nameValidationFlag = true;
        validTrueIcon[0].classList.replace('d-none' , 'd-block');
        validTrueIcon[0].classList.add('icon-valid');
        validFalseIcon[0].classList.replace('d-block' , 'd-none');
        siteName.classList.remove('input-invalid');
        siteName.classList.add('input-valid');
    } else{
        nameValidationFlag = false;
        validTrueIcon[0].classList.replace('d-block' , 'd-none');
        validFalseIcon[0].classList.replace('d-none' , 'd-block');
        validFalseIcon[0].classList.add('icon-invalid');
        siteName.classList.remove('input-valid');
        siteName.classList.add('input-invalid');
    }
});

siteURL.addEventListener('blur' , function(){
    var siteURLRegex = /.{1,}(.com)/;
    if(siteURLRegex.test(siteURL.value)){
        urlValidationFlag = true;
        validTrueIcon[1].classList.replace('d-none' , 'd-block');
        validTrueIcon[1].classList.add('icon-valid');
        validFalseIcon[1].classList.replace('d-block' , 'd-none');
        siteURL.classList.remove('input-invalid');
        siteURL.classList.add('input-valid');
    } else{
        urlValidationFlag = false;
        validTrueIcon[1].classList.replace('d-block' , 'd-none');
        validFalseIcon[1].classList.replace('d-none' , 'd-block');
        validFalseIcon[1].classList.add('icon-invalid');
        siteURL.classList.remove('input-valid');
        siteURL.classList.add('input-invalid');
    }
});

/* adding events to the corresponding HTML element */
submitBtn.addEventListener('click' , function(){
    if( nameValidationFlag && urlValidationFlag ){
        /* add the bookmark to the local storage */
        addURL();
        /* clearing the form for new input */
        clearForm();
    } else{  
        /* showing layer if validation not *
        * succeeded.                      */
        showLayer();
    }
});

/* adding event to the layer */
layer.addEventListener('click' , function(e){
    if(e.target === layer){
        closeLayer();
    }
});

/* adding event to the layer close btn */
layerCloseBtn.addEventListener('click' , function(e){
    closeLayer();
})