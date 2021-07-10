'use strict';
console.groupCollapsed( 'Logs.' );

const fileNames = ['bag.jpg','banana.jpg','bathroom.jpg' ,'boots.jpg','breakfast.jpg',
  'bubblegum.jpg','chair.jpg' ,'cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg',
  'pet-sweep.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif',
  'water-can.jpg','wine-glass.jpg' ];

let currentVIewIndex = [];
let rounds  = 25;

function Products( productName, imageUrl ,clicks,viewCount ) {
  this.productName = productName;
  this.imageUrl = `./assets/${imageUrl}`;
  this.clicks = clicks;
  this.viewCount = viewCount;
  Products.allProducts.push( this );
}
Products.allProducts = [];

Products.prototype.loadFromLocalStorage = () => JSON.parse( localStorage.getItem( 'products' ) ) || [];
Products.prototype.saveToLocalStorage = ( array ) => { localStorage.setItem( 'products', JSON.stringify( array ) );};
Products.prototype.randomNumber = ( min, max ) => Math.floor( Math.random() * ( max - min + 1 ) + min );

Products.prototype.handlesImageClick = ( e ) => {
  if( rounds > 0 ){
    switch ( e.target.id ) {
    case 'firstImg':
      Products.allProducts[currentVIewIndex[0]].clicks++; Products.prototype.displayImages(); rounds--;
      break;
    case 'secondImg':
      Products.allProducts[currentVIewIndex[1]].clicks++; Products.prototype.displayImages(); rounds--;
      break;
    case 'thirdImg':
      Products.allProducts[currentVIewIndex[2]].clicks++; Products.prototype.displayImages(); rounds--;
      break;
    default:
      break;
    }
    Products.prototype.saveToLocalStorage( Products.allProducts );
  }else if ( rounds <= 0 ){
    document.getElementById( 'imgContainer' ).removeEventListener( 'click', Products.prototype.handlesImageClick );
    htmlElementsStyle();
  }
};

Products.prototype.displayImages = ( ) => {
  let firstImage = document.getElementById( 'firstImg' );
  let secondImage = document.getElementById( 'secondImg' );
  let thirdImage = document.getElementById( 'thirdImg' );

  let imagesArray = [firstImage,secondImage,thirdImage];
  let leftIndex,midIndex,rightIndex ;

  do {
    leftIndex = Products.prototype.randomNumber( 0, fileNames.length - 1 );
    midIndex = Products.prototype.randomNumber( 0, fileNames.length - 1 );
    rightIndex = Products.prototype.randomNumber( 0, fileNames.length - 1 );
  } while( ( leftIndex === midIndex || midIndex === rightIndex ) || leftIndex === rightIndex );

  let newIndices = [leftIndex,midIndex ,rightIndex];
  const checkNewIndices = () => newIndices.some( item => currentVIewIndex.includes( item ) );

  if ( checkNewIndices === true ) {
    Products.prototype.displayImages();
  }else{
    let count = 0;
    for ( let i of imagesArray ) {
      i.src = Products.allProducts[newIndices[count]].imageUrl;
      Products.allProducts[newIndices[count]].viewCount++;
      count++;}
    currentVIewIndex.length = 0;
    currentVIewIndex.push( leftIndex,midIndex,rightIndex );
  }
};

Products.prototype.append = ( i ) =>{
  let productsUnorderedList = document.getElementById( 'productsUnorderedList' );
  let productsList = document.createElement( 'li' );
  productsList.innerHTML = `${i.productName} : had ${i.clicks} Votes, and was seen ${i.viewCount} times.`;
  productsUnorderedList.appendChild( productsList );
  productsChart( i.productName ,i.clicks , i.viewCount );
};

window.onload = () => {
  let data = Products.prototype.loadFromLocalStorage();
  if( data.length > 0 ) {
    for( let i of data ) { new Products( i.productName,( ( i.imageUrl ).replace( './assets/', '' ) ) , i.clicks, i.viewCount ); }
  }else {
    for( let i = 0; i < fileNames.length; i++ ) { new Products( fileNames[i].split( '.' )[0], fileNames[i],0,0 ); }
  }
  Products.prototype.displayImages();
  htmlElements();
};

const htmlElementsStyle = () =>{
  let btnShowData = document.getElementById( 'btnShowData' );
  btnShowData.style.display = 'inline-flex';
  let firstImage = document.getElementById( 'firstImg' );
  let secondImage = document.getElementById( 'secondImg' );
  let thirdImage = document.getElementById( 'thirdImg' );
  firstImage.classList.remove( 'zoom' );
  secondImage.classList.remove( 'zoom' );
  thirdImage.classList.remove( 'zoom' );
};

const showData = () =>{
  document.getElementById( 'productsUnorderedList' ).innerHTML = '';
  products = [];
  clicks = [];
  views = [];
  for ( const i of Products.allProducts ) {
    Products.prototype.append( i );
  }

};

const htmlElements = () => {
  let btnShowData = document.getElementById( 'btnShowData' );
  let btnClearData = document.getElementById( 'btnClearData' );
  let btnRestartSurvay = document.getElementById( 'btnRestartSurvay' );
  btnShowData.style.display = 'none';
  btnClearData.style.display = 'none';
  btnRestartSurvay.style.display = 'none';
  btnShowData.addEventListener( 'click', showData );
  btnClearData.addEventListener( 'click',() => {localStorage.removeItem( 'products' );location.reload();} );
  btnRestartSurvay.addEventListener( 'click', () => { location.reload();} );
  document.getElementById( 'imgContainer' )
    .addEventListener( 'click', Products.prototype.handlesImageClick );
};

// Odeh abuzaid
