
mapboxgl.accessToken = 'pk.eyJ1IjoicmF5MTExMzIwMDIiLCJhIjoiY2tvY3kwb3Y5MmliZDJub24wdnpjMTB5NiJ9.kPPmudTylSbhH27w2lwsoQ';

const filterType = document.getElementById('filterType')
const filterProperty = document.getElementById('filterProperty')
const value = document.getElementById('filterValue')

function activateFilter(){
    map.setFilter('closures', ['==', ['get', filterProperty], value]);
}


function removeFilter(){
    map.setFilter('closures', null);
};
