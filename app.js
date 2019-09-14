'use strict';

// global variables
var votesRemaining = 25;
var picturesEl = document.getElementById('pictures');
var resultsEl = document.getElementById('results');
var picOneEl = document.getElementById('picOne');
var picTwoEl = document.getElementById('picTwo');
var picThreeEl = document.getElementById('picThree');
var containerEl = document.getElementById('pictureContainer');
var allProductArr = [];

function Product (filePath, productName){
    this.alt = productName;
    this.title = productName;
    this.src = filePath;
    this.votes = 0;
    this.views = 0;

    allProductArr.push(this);
}
// pulls random image from the constructor
function imageGenerator(){
    var index = random(allProductArr.length);
    picOneEl.src = allProductArr[index].src;
    picOneEl.alt = allProductArr[index].alt;
    picOneEl.title = allProductArr[index].title;

    allProductArr[index].views++;

    var indexTwo = random(allProductArr.length);
    while(indexTwo === index){
        indexTwo = random(allProductArr.length);
    }
    picTwoEl.src = allProductArr[indexTwo].src;
    picTwoEl.alt = allProductArr[indexTwo].alt;
    picTwoEl.title = allProductArr[indexTwo].title;
   
    var indexThree = random(allProductArr.length);
    while(indexThree === index|indexThree === indexTwo){
        indexTwo = random(allProductArr.length);
    }
    picThreeEl.src = allProductArr[indexThree].src;
    picThreeEl.alt = allProductArr[indexThree].alt;
    picThreeEl.title = allProductArr[indexThree].title;
}

// Generate a random number for index position in the image generating function
function random(max){
    return Math.floor(Math.random() * Math.floor(max));
}

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

function handleClick(event){
    var clickedProduct = event.target.title;
    for(var i = 0; i < allProductArr.length; i++){
        if(clickedProduct === allProductArr[i].title){
            allProductArr[i].votes++;
        }
    }
    imageGenerator();
}

containerEl.addEventListener('click', handleClick);
imageGenerator();

