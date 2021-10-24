function printClosure(){
    document.getElementById("divClosureTable").style.display = "block"
    layers = ['pending', 'approved'];
    alert('Click on closure to add to table')
    var selectedStateId = null;
    //populate detail panel
    layers.forEach(layer => {
        map.on('click', layer, (e) => {
            console.log("printClosure")
            let Table = document.getElementById('closureTable')
            let newRow = Table.insertRow(-1)

            if (e.features.length > 0) {
                // if (selectedStateId) {
                //     map.setFeatureState(
                //         { source: 'closures', id: selectedStateId },
                //         { select: false }
                //     );
                // }
                selectedStateId = e.features[0].id;
                map.setFeatureState(
                    { source: 'closures', id: selectedStateId },
                    { select: true }
                );
            }

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

function createPDF() {
    let sTable = document.getElementById('divClosureTable').innerHTML;
    var img = new Image();
    var mapCanvas = document.querySelector('.mapboxgl-canvas');
    img.src = mapCanvas.toDataURL();
    
    
    var style = "<style>";
    style = style + "* { font-family: Calibri;}"
    style = style + "table {width: 100%;font: 13px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "img {max-width: 100%; max-height: 500px; border-radius: 5px;}"
    style = style + "button {display:none;}"
    style = style + "</style>";

    // CREATE A WINDOW OBJECT.
    let win = window.open('', '', 'height=1754,width=1240');

    win.document.write('<html><head>');
    win.document.write('<title>Closure List</title>');   // <title> FOR PDF HEADER.
    win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.body.appendChild(img);
    win.document.write('<h2> List of Closures </h2>')
    win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write('</body></html>');

    win.document.close(); 	// CLOSE THE CURRENT WINDOW.

    win.print();    // PRINT THE CONTENTS.
}