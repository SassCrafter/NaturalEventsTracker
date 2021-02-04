import '../sass/style.scss';

fetch('https://eonet.sci.gsfc.nasa.gov/api/v2.1/categories/8')
.then(response => response.json()).then(data => console.log(data))