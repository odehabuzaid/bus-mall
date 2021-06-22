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
let btnClearData = document.getElementById( 'btnClearData' );
let btnRestartSurvay = document.getElementById( 'btnRestartSurvay' );

let rounds  = 25;
let Products = function( productName, imageUrl ,clicks,viewCount ) {
  this.productName = productName;
  this.imageUrl = `./assets/${imageUrl}`;
  this.clicks = clicks;
  this.viewCount = viewCount;
  Products.allProducts.push( this );
};
Products.allProducts = [];

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
  if( rounds > 0 ){
    switch ( e.target.id ) {
    case 'firstImg':
      Products.allProducts[currentVIewIndex[0]].clicks++; render(); rounds--;
      break;
    case 'secondImg':
      Products.allProducts[currentVIewIndex[1]].clicks++; render(); rounds--;
      break;
    case 'thirdImg':
      Products.allProducts[currentVIewIndex[2]].clicks++; render(); rounds--;
      break;
    default:
      break;
    }
  }else if ( rounds <= 0 ){
    imgContainer.removeEventListener( 'click', clickPerformed );
    btnShowData.style.display = 'inline-flex';
    firstImage.classList.remove( 'zoom' );
    secondImage.classList.remove( 'zoom' );
    thirdImage.classList.remove( 'zoom' );
  }
}

btnShowData.style.display = 'none';
btnClearData.style.display = 'none';
btnRestartSurvay.style.display = 'none';
btnShowData.addEventListener( 'click', showData );
btnClearData.addEventListener( 'click', clearData );
btnRestartSurvay.addEventListener( 'click', restartSurvay );
function clearData(){
  localStorage.clear();
}
function restartSurvay(){
  location.reload();
}
function showData(){
  let productsUnorderedList = document.getElementById( 'productsUnorderedList' );
  productsUnorderedList.innerHTML = '';
  let sorted = Products.allProducts.sort( ( a, b ) => ( b.viewCount > a.viewCount ? 1 : -1 ) );
  for ( let i = 0 ; i < sorted.length ; i++ ) {
    let productsList = document.createElement( 'li' );
    productsList.innerHTML = `${sorted[i].productName} : had ${sorted[i].clicks} Votes, and was seen ${sorted[i].viewCount} times.`;
    productsUnorderedList.appendChild( productsList );
    btnShowData.style.display = 'none';
    btnClearData.style.display = 'inline-flex';
    btnRestartSurvay.style.display = 'inline-flex';
  }
  let chartdiv = document.getElementsByClassName( 'chart' )[0];
  chartdiv.classList.add( 'slided' );
  productsChart();
  localStorage.setItem( 'products', JSON.stringify( sorted ) );
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
  // eslint-disable-next-line no-undef
  new Chart( ctx, {
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

function getData() {
  let data = JSON.parse( localStorage.getItem( 'products' ) );
  if( data ) {
    btnClearData.style.display = 'inline-flex';
    btnRestartSurvay.style.display = 'inline-flex';

    for( let i = 0; i < data.length; i++ ) {
      new Products( data[i].productName,( ( data[i].imageUrl ).replace( './assets/', '' ) ) , data[i].clicks, data[i].viewCount );
    }
    render(); console.log( Products.allProducts );
    showData();
  }else {
    for( let i = 0; i < fileNames.length; i++ ) {
      new Products( fileNames[i].split( '.' )[0], fileNames[i],0,0 );
    }
    render();
  }
}
getData();
