const fs = require('fs');
fs.readFile('data.json', (err, data) => {                                        //reading JSON file          
    if (err) {
        console.log(err);
    }
    else {
        try {
            let objData = JSON.parse(data);
            console.table(objData);                                            //printing data of JSON in tabular form    
        }
        catch (err) {
            console.log('Error parsing JSON', err);
        }
    }
});