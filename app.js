'use strict';



// global variables
var votesRemaining = 25;
var resultsEl = document.getElementById('results');
var picOneEl = document.getElementById('pic-one');
var picTwoEl = document.getElementById('pic-two');
var picThreeEl = document.getElementById('pic-three');
var containerEl = document.getElementById('pictureContainer');
var allProductArr = [];
var recentIndex = [];
var canvasEl = document.getElementById('myChart');

if(localStorage.length > 0){
    //  local storage get item
    console.log('getting items from LS');
        var localStorageProducts = localStorage.getItem('Products');
        console.log('Local storage products', localStorageProducts);
    // json Parse
        var parsedProducts = JSON.parse(localStorageProducts);
        allProductArr = parsedProducts;
    } else {
      newItems();
      console.log('no items in storage, instanciating object ')
    }

function Product (filePath, productName){
    this.alt = productName;
    this.title = productName;
    this.src = filePath;
    this.votes = 0;
    this.views = 0;

    allProductArr.push(this);
}
// pulls random image from the constructor array
function imageGenerator(){
    while(recentIndex.length > 6){
        recentIndex.shift();
    }

    var index = random(allProductArr.length);

    while(recentIndex.includes(index)) {
        index = random(allProductArr.length);
    }
    picOneEl.src = allProductArr[index].src;
    picOneEl.alt = allProductArr[index].alt;
    picOneEl.title = allProductArr[index].title;
    allProductArr[index].views++;
    recentIndex.push(index);

    var indexTwo = random(allProductArr.length);

    while(recentIndex.includes(indexTwo)) {
        indexTwo = random(allProductArr.length);
    }
    picTwoEl.src = allProductArr[indexTwo].src;
    picTwoEl.alt = allProductArr[indexTwo].alt;
    picTwoEl.title = allProductArr[indexTwo].title;
    allProductArr[indexTwo].views++;
    recentIndex.push(indexTwo);

    var indexThree = random(allProductArr.length);

    while(recentIndex.includes(indexThree)) {
        indexThree = random(allProductArr.length);
    }
    picThreeEl.src = allProductArr[indexThree].src;
    picThreeEl.alt = allProductArr[indexThree].alt;
    picThreeEl.title = allProductArr[indexThree].title;
    allProductArr[indexThree].views++;
    recentIndex.push(indexThree);


}

// Generate a random number for index position in the image generating function
function random(max){
    return Math.floor(Math.random() * Math.floor(max));
}

function newItems(){
    new Product('img/bag.jpg','R2D2 bag');
    new Product('img/banana.jpg','Banana slicer');
    new Product('img/bathroom.jpg','Bathroom iPad holder');
    new Product('img/boots.jpg','Open-toe rainboots');
    new Product('img/breakfast.jpg','Breakfast maker');
    new Product('img/bubblegum.jpg','Meatball bubblegum');
    new Product('img/chair.jpg','Chair');
    new Product('img/cthulhu.jpg','Cthulhu action figure');
    new Product('img/dog-duck.jpg','Duck bill for dogs');
    new Product('img/dragon.jpg','Can of Dragon meat');
    new Product('img/pen.jpg','Pen with utensil tops');
    new Product('img/pet-sweep.jpg','Pet booties');
    new Product('img/scissors.jpg','Pizza scissors');
    new Product('img/shark.jpg','Shark sleeping bag');
    new Product('img/sweep.png','Baby onesie with sweeper');
    new Product('img/tauntaun.jpg','Tauntaun sleeping bag');
    new Product('img/unicorn.jpg','Can of unicorn meat');
    new Product('img/usb.gif','Moving tentacle USB');
    new Product('img/water-can.jpg','Impossible watering can');
    new Product('img/wine-glass.jpg','Really annoying wine glass');
}






function renderMostPopular(){
    //once votes run out, 
    var mostPopular;
    var clicks = 0;

    // identifying the most popular item
    for(var i = 0; i < allProductArr.length; i++){
      if(allProductArr[i].votes > clicks){
        clicks = allProductArr[i].votes;
        mostPopular = allProductArr[i];
      }
    }
    var h2El = document.createElement('h2');
    h2El.textContent = `The most popular product is ${mostPopular.title} with ${mostPopular.votes} votes.`;
    resultsEl.appendChild(h2El);
  }
function handleClick(event){
    var clickedProduct = event.target.title;
    for(var i = 0; i < allProductArr.length; i++){
        if(clickedProduct === allProductArr[i].title){
            allProductArr[i].votes++;


        }
    }
    imageGenerator();
    votesRemaining--;

    if(votesRemaining === 0){
        containerEl.removeEventListener('click', handleClick);
        chartGenerator();
        // Stringify
        var stringifyedProducts = JSON.stringify(allProductArr);
  
    //  local storage set item
        localStorage.setItem('Products', stringifyedProducts);
        console.log('setting items in LS');
    }
}

containerEl.addEventListener('click', handleClick);
imageGenerator();


function chartGenerator(){

var productNameArr = [];
var votesArr = [];
var colorSelector = [];
var red = 0;
var green = 0;
var blue = 0;

for(var i = 0; i < allProductArr.length; i++){
    productNameArr.push(allProductArr[i].alt);
    votesArr.push(allProductArr[i].votes);
    colorSelector.push(`rgb(${red}, ${green}, ${blue})`)
    red = red+i;
    green = green+i;
    blue = blue+i;
}

var ctx = canvasEl.getContext('2d');

new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: productNameArr,
        datasets: [{
            label: '# of Votes',
            data: votesArr,
            backgroundColor: colorSelector,
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}



//////////LOCAL STORAGE NOTES: NUMBERED ITEMS ARE THE ORIGINAL STEPS
// 1. USER COMES TO BUSMALL
    //CREATING NEW OBJECT INSTANCES (MAKING AN ARRAY OF INSTANCES)
//2. USER VOTES
    //STORE USERS PROGRESS/EACH VOTE (THIS IS HARDER)
//3. SEE THIER RESULTS
    //NOTES: STORE VOTING RESULTS TO LOCAL STORAGE
    //STORE THE ENTIRE 'ALLPRODUCTSARR' TO LOCAL STORAGE
//4. USER LEAVES
//5. NEW USER ARRIVES TO THE SAME COMPUTER
    //GET 'ALLPRODUCTARR' FROM LOCAL STORAGE
        //PARSE IT BACK, ASSIGN 'ALLPRODUCTARR' TO THE STUFF WE GOT OUT OF LOCAL STORAGE
//6. NEW USER VOTES
//7. SEES THEIR RESULTS
//8. LEAVES.... AND SO ON
