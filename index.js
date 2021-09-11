const fs = require('fs');
fs.readFile('data.json', (err, data) => {                                        //reading JSON file          
    if (err) {
        console.log(err);
    }
    else {
        try {
            let objData = JSON.parse(data);
            console.table(objData);                                            //printing data of JSON in tabular form    
            if (objData[objData.length - 1].TotalOverWeight == undefined) {     //to avoid repeataion of prev. data when calculating new entered data
                objData.push({ "TotalOverWeight": 0 });
            }
            for (var i = 0; i < objData.length - 1; i++) {
                if (objData[i].BMIRange == undefined)                            //to avoid repeataion of prev. data when calculating new entered data
                {
                    var height = objData[i].HeightCm / 100;
                    var weight = objData[i].WeightKg;
                    var bmi = (weight / (height * height));
                    console.log(bmi);
                }
            }
        }
        catch (err) {
            console.log('Error parsing JSON', err);
        }
    }
});