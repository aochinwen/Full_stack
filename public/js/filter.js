let SearchStart = document.getElementById('searchStartDate');
let SearchEnd = document.getElementById('searchEndDate');
const layers = ['approved','pending','outline']


function filterDate(){
    console.log("original type is "+ typeof(SearchStart.value))
    console.log("original value is " + SearchStart.value);
    const timestampStart = DateTime.fromISO(SearchStart.value);
    const timestampEnd = DateTime.fromISO(SearchEnd.value);

    console.log("in epoch time is "+ timestampStart);
    const color = {'approved':'#64bdbb', 'pending':'#fbd2d7'}
    layers.forEach(function(layer) {
        map.setFilter(layer, 
            ['all',
                ['>=', ['get','DateofClosure'],timestampStart.ts], 
                ['<=', ['get','EndofClosure'],timestampEnd.ts]
            ],
            ['all',
                ['<=', ['get','DateofClosure'],timestampStart.ts], 
                ['>=', ['get','EndofClosure'],timestampEnd.ts]
            ],
            ['all',
                ['<=', ['get','DateofClosure'],timestampStart.ts], 
                ['<=', ['get','EndofClosure'],timestampEnd.ts]
            ]
            );
        
        map.setPaintProperty('approved', 'fill-color', '#64bdbb');
        
        
    })
    
}

function clearFilter(){
    
    layers.forEach(function(layer) {
        map.setFilter(layer, null )
        })
    map.setPaintProperty('approved', 'fill-color', '#64bdbb');
}

function clearPolygon(){
    map.setFilter('approved',false)
}

dateSearch.addEventListener('submit', filterDate())