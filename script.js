localStorage.clear();

const apiKey =`8OjLgsvkucmiZPO344zRocig6OYSLFO0WuELCRYQ`;

const currentDayImage = document.querySelector(".image-cont");
const ImgHeading = document.querySelector(".image-heading");
const description = document.querySelector(".desc");
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const dateHistory = document.querySelector(".history-date");
const pictureDate = document.querySelector("#picture-date");

let arr = new Array();

async function getImageOfTheDay(selectdate){
    let date ;
    if(selectdate){
        date = selectdate;
    }else{
        date = new Date().toISOString().split("T")[0];
    }
    // let date = new Date().toISOString().split("T")[0];
    // console.log(date);
    const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey} `;
    const response = await fetch(url);
    const result = await response.json();
    // console.log(result);

    currentDayImage.innerHTML=`<img src="${result.url}" alt="nasa image" id="image-current">`;
    
    ImgHeading.innerHTML = result.title;
    description.innerHTML = result.explanation;

    if(selectdate){
        pictureDate.innerHTML = `Picture on ${result.date}`;
        addSearchToHistory(selectdate);
        let obj = {
            date :selectdate, 
        }
        arr.push(obj);
        saveSearch(arr);
    }

}

function getCurrentImageOfTheDay(){
    getImageOfTheDay();
}
getCurrentImageOfTheDay();


searchBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    // console.log(searchInput.value);
    const selectDate = searchInput.value;
    getImageOfTheDay(selectDate);

})

function getImageOfTheDayClick(event){
   
    const adate = event.target.innerHTML;
   getFromLocalStorage(adate);
}

 async function getFromLocalStorage(date){

    const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey} `;
    const response = await fetch(url);
    const result = await response.json();
    
    currentDayImage.innerHTML=`<img src="${result.url}" alt="nasa image" id="image-current">`;
    
    ImgHeading.innerHTML = result.title;
    description.innerHTML = result.explanation;

    pictureDate.innerHTML = `Picture on ${result.date}`;
   

}

function saveSearch(arr){
    localStorage.setItem('history',JSON.stringify(arr));
}

function addSearchToHistory(selectdate){
    const li = document.createElement('li');
        li.innerHTML = `<a href="#">${selectdate}</a>`;
        dateHistory.appendChild(li);
        // console.log(li.children[0]);
        const a = li.children[0];
        a.addEventListener("click",getImageOfTheDayClick)
}

