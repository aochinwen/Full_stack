function printClosure(){
    layers = ['pending', 'approved'];

    //populate detail panel
    layers.forEach(layer => {
        map.on('click', layer, (e) => {
            console.log("printClosure")
            let Table = document.getElementById('closureTable')
            console.log(Table)
            let newRow = Table.insertRow(-1)

            let printData = [
                e.features[0].properties.Title,
                e.features[0].properties.Status,
                e.features[0].properties.ProjectOfficer,
                e.features[0].properties.Description,
                moment(e.features[0].properties.DateofClosure).format('YYYY MMMM Do') + " till "+ moment(e.features[0].properties.EndofClosure).format('YYYY MMMM Do'),
                e.features[0].properties.StartTime + "~" + e.features[0].properties.EndTime,
                e.features[0].properties.Type,
                e.features[0].properties.Remarks
            ];
            console.log(printData[2])
            for (i=0; i<8; i++){
                let newCell = newRow.insertCell(i)
                let newText = document.createTextNode(printData[i]);
                newCell.appendChild(newText)
            }
            
        });
    });
}