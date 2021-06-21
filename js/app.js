'use strict';
const fileNames = ['bag.jpg','banana.jpg','bathroom.jpg' ,'boots.jpg','breakfast.jpg',
  'bubblegum.jpg','chair.jpg' ,'cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg',
  'pet-sweep.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif',
  'water-can.jpg','wine-glass.jpg' ];
let currentVIewIndex = [];
let firstImage = document.getElementById( 'firstImg' );
let secondImage = document.getElementById( 'secondImg' );
let thirdImage = document.getElementById( 'thirdImg' );
let imgContainer = document.getElementById( 'imgContainer' );
let btnShowData = document.getElementById( 'btnShowData' );
let productsUnorderedList = document.getElementById( 'productsUnorderedList' );
let rounds  = 25;
let Products = function( productName, imageUrl ) {
  this.productName = productName;
  this.imageUrl = `./assets/${imageUrl}`;
  this.clicks = 0;
  this.viewCount = 0;
  Products.allProducts.push( this );
};
Products.allProducts = [];
for( let i = 0; i < fileNames.length; i++ ) {
  new Products( fileNames[i].split( '.' )[0], fileNames[i] );
}
function randomNumber( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) + min );
}
function render() {
  let leftIndex ,rightIndex ,midIndex ;
  do {
    midIndex = randomNumber( 0, fileNames.length - 1 );
    leftIndex = randomNumber( 0, fileNames.length - 1 );
    rightIndex = randomNumber( 0, fileNames.length - 1 );
  } while( ( leftIndex === midIndex || midIndex === rightIndex ) || leftIndex === rightIndex );
  if ( ( currentVIewIndex.includes( leftIndex ) || currentVIewIndex.includes( midIndex ) ) || currentVIewIndex.includes( rightIndex ) ) {
    render();
  }else{
    firstImage.src = Products.allProducts[leftIndex].imageUrl;
    secondImage.src = Products.allProducts[midIndex].imageUrl;
    thirdImage.src = Products.allProducts[rightIndex].imageUrl;
    Products.allProducts[rightIndex].viewCount++;
    Products.allProducts[midIndex].viewCount++;
    Products.allProducts[leftIndex].viewCount++;
    currentVIewIndex.length = 0;
    currentVIewIndex.push( leftIndex,midIndex,rightIndex );
  }
}
imgContainer.addEventListener( 'click', clickPerformed );
function clickPerformed( e ){
  if( ( ( e.target.id === 'firstImg' || e.target.id === 'secondImg' ) || e.target.id === 'thirdImg' ) && rounds > 0 ){
    switch ( e.target.id ) {
    case 'firstImg':
      Products.allProducts[currentVIewIndex[0]].clicks++;
      break;
    case 'secondImg':
      Products.allProducts[currentVIewIndex[1]].clicks++;
      break;
    case 'thirdImg':
      Products.allProducts[currentVIewIndex[2]].clicks++;
      break;
    default:
      break;
    }
    render();
    rounds--;
    // console.log( rounds );
  }else if ( rounds <= 0 ){btnShowData.style.display = 'inline';}
}
btnShowData.style.display = 'none';
btnShowData.addEventListener( 'click', showData );
function showData(){
  productsUnorderedList.innerHTML = '';
  let sorted = Products.allProducts.sort( ( a, b ) => ( b.viewCount > a.viewCount ? 1 : -1 ) );
  console.log( sorted );
  for ( let i = 0 ; i < sorted.length ; i++ ) {
    let productsList = document.createElement( 'li' );
    productsList.innerHTML = `${sorted[i].productName} : had ${sorted[i].clicks} Votes, and was seen${sorted[i].viewCount} times.`;
    productsUnorderedList.appendChild( productsList );
    imgContainer.removeEventListener( 'click', clickPerformed );
    btnShowData.removeEventListener( 'click', showData );
    btnShowData.style.display = 'none';
  }
  productsChart();
}

function productsChart() {
  let products = [];
  let clicks = [];
  let views = [];
  for ( let i = 0; i < Products.allProducts.length; i++ ) {
    products.push( Products.allProducts[i].productName );
    clicks.push( Products.allProducts[i].clicks );
    views.push( Products.allProducts[i].viewCount );
  }
  let ctx = document.getElementById( 'Chart' ).getContext( '2d' );
  let myChart = new Chart( ctx, {
    type: 'bar',
    data: {
      labels: products,
      datasets: [{
        label: 'Clicks',
        data: clicks,
        backgroundColor: '#2F4F4F',
        borderWidth: 1,
      }
      , {
        label: 'Views',
        data: views,
        backgroundColor: '#B8860B',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  } );
}

render();
