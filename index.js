const fs = require('fs');
fs.readFile('data.json', (err, data) => {                                        //reading JSON file          
    if (err) {
        console.log(err);
    }
    else {
        try {
            let objData = JSON.parse(data);
            console.table(objData);                                            //printing data of JSON in tabular form    
            if (objData[objData.length - 1].TotalUnderweight == undefined || 
                objData[objData.length - 1].TotalNormalweight == undefined ||
                objData[objData.length - 1].TotalOverweight == undefined ||
                objData[objData.length - 1].TotalModeratelyobese == undefined ||
                objData[objData.length - 1].TotalSeverelyobese == undefined ||
                objData[objData.length - 1].TotalVeryseverelyobese == undefined) {     //to avoid repeataion of prev. data when calculating new entered data
                objData.push({ "TotalUnderweight": 0,"TotalNormalweight": 0,"TotalOverweight": 0,
                "TotalModeratelyobese": 0, "TotalSeverelyobese": 0, "TotalVeryseverelyobese": 0});
            }
            for (var i = 0; i < objData.length - 1; i++) {
                if (objData[i].BMIRange == undefined)                            //to avoid repeataion of prev. data when calculating new entered data
                {
                    var height = objData[i].HeightCm / 100;
                    var weight = objData[i].WeightKg;
                    var bmi = (weight / (height * height));
                    objData[i].BMIRange = bmi;
                    if (bmi <= 18.4) {
                        objData[i].BMICategory = "Underweight";
                        objData[i].Healthrisk = "Malnutrition risk";
                        objData[objData.length - 1].TotalUnderweight += 1;
                    }
                    else if (18.5 <= bmi && bmi <= 24.9) {
                        objData[i].BMICategory = "Normal weight";
                        objData[i].Healthrisk = "Low risk";
                        objData[objData.length - 1].TotalNormalweight += 1;
                    }
                    else if (25 <= bmi && bmi <= 29.9) {
                        objData[i].BMICategory = "Overweight";
                        objData[i].Healthrisk = "Enhanced risk";
                        objData[objData.length - 1].TotalOverweight += 1;
                    }
                    else if (30 <= bmi && bmi <= 34.9) {
                        objData[i].BMICategory = "Moderately obese";
                        objData[i].Healthrisk = "Medium risk";
                        objData[objData.length - 1].TotalModeratelyobese += 1;
                    }
                    else if (35 <= bmi && bmi <= 39.9) {
                        objData[i].BMICategory = "Severely obese";
                        objData[i].Healthrisk = "High risk";
                        objData[objData.length - 1].TotalSeverelyobese += 1;
                    }
                    else {
                        objData[i].BMICategory = "Veryseverely obese";
                        objData[i].Healthrisk = "Very high risk";
                        objData[objData.length - 1].TotalVeryseverelyobese += 1;
                    }
                }
            }
            const newData = JSON.stringify(objData, null, 4);
            fs.writeFile('data.json', newData, err => {                      // write data in JSON
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Writting in JSON file");
                    let newdata = fs.readFileSync('data.json');
                    let data = JSON.parse(newdata);
                    console.table(data.Gender,data.HeightCm,data.WeightKg,
                        data,BMIRange,data.BMICategory,data.Healthrisk);      // for printing new entered data in Tabuler form
                    console.log("Total of BMI Category");
                    console.table(data.TotalUnderweight,data.TotalNormalweight,data.TotalOverweight,
                        data.TotalModeratelyobese,data.TotalSeverelyobese,data.TotalVeryseverelyobese);
                }
            });
        }
        catch (err) {
            console.log('Error parsing JSON', err);
        }
    }
});