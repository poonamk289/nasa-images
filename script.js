localStorage.clear();

const api=`U0amRgbswgIt1qjO1OogoulOW76Y8LaDlYS6ORNZ`;
const image=document.getElementById("img");
const cont=document.getElementById("content");
const paragraph=document.getElementById("para");
const search=document.getElementById("search-input");
const button=document.getElementById("search-button");
const picheading=document.querySelector(".pic-heading");

console.log("sjhajx");

let arr= new Array();



async function getCurrentImageOfTheDay(selectdate){
  let date;

  if(selectdate){
    date=selectdate;
  }
  else{
    date=new Date().toISOString().split("T")[0];

  }
//   let date= new Date().toISOString().split("T")[0];
  console.log(date);
  const url=`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${api} `;
  const response = await fetch(url);
  const result= await response.json();
  console.log(result);


  image.innerHTML=`<img src="${result.hdurl}"alt="nasa image" id="img">`;
  cont.innerHTML=result.title;
  paragraph.innerHTML=result.explanation;


  if(selectdate){
    picheading.innerHTML=`pictuure on ${result.date}`;
     const li= document.createElement('li');
     li.innerHTML=`<a href="#">${selectdate}</a>`;
     dateHistory.appendChild(li);
    //  console.log(li.children[0]);
    const a= li.children[0];
     a.addEventListener("click",getImageOfTheDay)
     
     let obj={
        date: selectdate,
       
     }
     arr.push(obj);
     localStorage.setItem('history',JSON.stringify(arr));

  }
}


  getCurrentImageOfTheDay();
  button.addEventListener("click",(e)=>{
    e.preventDefault();
    const selectdate=search.value ;
    getCurrentImageOfTheDay(selectdate);
  })

  function getImageOfTheDay(event1){

  const adate= event1.target.innerHTML;

  getfromlocalstorage(adate);
  }


  async function getfromlocalstorage(date){
    const url=`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${api} `;
  const response = await fetch(url);
  const result= await response.json();


  image.innerHTML=`<img src="${result.url}"alt="nasa image" id="img">`;
  cont.innerHTML=result.title;
  paragraph.innerHTML=result.explanation;


    picheading.innerHTML=`pictuure on ${result.date}`;
  }