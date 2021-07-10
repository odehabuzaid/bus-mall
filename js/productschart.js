let products = [];
let clicks = [];
let views = [];

const productsChart = ( product,click,view ) => {
  let chartdiv = document.getElementsByClassName( 'chart' )[0];
  chartdiv.classList.add( 'slided' );
  products.push( product );
  clicks.push( click );
  views.push( view );

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


  btnShowData.style.display = 'none';
  btnClearData.style.display = 'inline-flex';
  btnRestartSurvay.style.display = 'inline-flex';
};
