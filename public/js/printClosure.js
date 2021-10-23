function printClosure(){
    document.getElementById("divClosureTable").style.display = "block"
    layers = ['pending', 'approved'];
    alert('Click on closure to add to table')
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

function createPDF() {
    let sTable = document.getElementById('divClosureTable').innerHTML;
    var img = new Image();
    var mapCanvas = document.querySelector('.mapboxgl-canvas');
    img.src = mapCanvas.toDataURL();
    

    var style = "<style>";
    style = style + "table {width: 100%;font: 17px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";

    // CREATE A WINDOW OBJECT.
    let win = window.open('', '', 'height=700,width=700');

    win.document.write('<html><head>');
    win.document.write('<title>Closure List</title>');   // <title> FOR PDF HEADER.
    win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.body.appendChild(img);
    win.document.write('<span> List of Closures </span>')
    win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write('</body></html>');

    win.document.close(); 	// CLOSE THE CURRENT WINDOW.

    win.print();    // PRINT THE CONTENTS.
}