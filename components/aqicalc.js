export default class AQI {
    constructor(concentrations, tempF) {
        this.concentrations = concentrations;
        this.co = this.concentrations.co;
        this.no2 = this.concentrations.no2;
        this.o3 = this.concentrations.o3;
        this.pm10 = this.concentrations.pm10;
        this.pm25 = this.concentrations.pm2_5;
        this.so2 = this.concentrations.so2;
        this.tempF = tempF;
    }   

    tempInCentigrade() {
        return (this.tempF - 32) * 5 / 9;
    }

    convertMicroToPPB(conc) {
        const t = this.tempInCentigrade();
        const MW = 48;
        return (conc * 12.187 * MW) / (273.15 + t); 
    }

    linear(AQIhigh, AQIlow, Conchigh, Conclow, Concentration) {
        var Conc=parseFloat(Concentration);
        return Math.round(((Conc-Conclow)/(Conchigh-Conclow))*(AQIhigh-AQIlow)+AQIlow);
    }

    AQIPM25(concentration) {
        var Conc=parseFloat(concentration);
        var c;
        var AQI;
        c = (Math.floor(10*Conc))/10;
        if (c>=0 && c<12.1) {
            AQI=this.linear(50,0,12,0,c);
        } else if (c>=12.1 && c<35.5) {
            AQI=this.linear(100,51,35.4,12.1,c);
        } else if (c>=35.5 && c<55.5) {
            AQI=this.linear(150,101,55.4,35.5,c);
        } else if (c>=55.5 && c<150.5) {
            AQI=this.linear(200,151,150.4,55.5,c);
        } else if (c>=150.5 && c<250.5) {
            AQI=this.linear(300,201,250.4,150.5,c);
        } else if (c>=250.5 && c<350.5) {
            AQI=this.linear(400,301,350.4,250.5,c);
        } else if (c>=350.5 && c<500.5) {
            AQI=this.linear(500,401,500.4,350.5,c);
        } else {
            AQI="Out of Range";
        }
        return AQI;
    }

    AQIPM10(concentration) {
        var Conc=parseFloat(concentration);
        var c;
        var AQI;
        c = Math.floor(Conc);
        if (c>=0 && c<55) {
            AQI=this.linear(50,0,54,0,c);
        } else if (c>=55 && c<155) {
            AQI=this.linear(100,51,154,55,c);
        } else if (c>=155 && c<255) {
            AQI=this.linear(150,101,254,155,c);
        } else if (c>=255 && c<355) {
            AQI=this.linear(200,151,354,255,c);
        } else if (c>=355 && c<425) {
            AQI=this.linear(300,201,424,355,c);
        } else if (c>=425 && c<505) {
            AQI=this.linear(400,301,504,425,c);
        } else if (c>=505 && c<605) {
            AQI=this.linear(500,401,604,505,c);
        } else {
            AQI="Out of Range";
        }
        return AQI;
    }

    AQICO(concentration) {
        var Conc=parseFloat(concentration);
        var c;
        var AQI;
        c = (Math.floor(10*Conc))/10;
        if (c>=0 && c<4.5) {
            AQI=this.linear(50,0,4.4,0,c);
        } else if (c>=4.5 && c<9.5) {
            AQI=this.linear(100,51,9.4,4.5,c);
        } else if (c>=9.5 && c<12.5) {
            AQI=this.linear(150,101,12.4,9.5,c);
        } else if (c>=12.5 && c<15.5) {
            AQI=this.linear(200,151,15.4,12.5,c);
        } else if (c>=15.5 && c<30.5) {
            AQI=this.linear(300,201,30.4,15.5,c);
        } else if (c>=30.5 && c<40.5) {
            AQI=this.linear(400,301,40.4,30.5,c);
        } else if (c>=40.5 && c<50.5) {
            AQI=this.linear(500,401,50.4,40.5,c);
        } else {
            AQI="Out of Range";
        }
        return AQI;
    }

    AQISO21hr(concentration) {
        var Conc=parseFloat(concentration);
        var c;
        var AQI;
        c = Math.floor(Conc);
        if (c>=0 && c<36) {
            AQI=this.linear(50,0,35,0,c);
        } else if (c>=36 && c<76) {
            AQI=this.linear(100,51,75,36,c);
        } else if (c>=76 && c<186) {
            AQI=this.linear(150,101,185,76,c);
        } else if (c>=186 && c<=304) {
            AQI=this.linear(200,151,304,186,c);
        } else {
            AQI="Out of Range";
        }
        return AQI;
    }

    AQISO224hr(concentration) {
        var Conc=parseFloat(concentration);
        var c;
        var AQI;
        c = Math.floor(Conc);
        if (c>=0 && c<=304) {
            AQI="Out of Range";
        } else if (c>=304 && c<605) {
            AQI=this.linear(300,201,604,305,c);
        } else if (c>=605 && c<805) {
            AQI=this.linear(400,301,804,605,c);
        } else if (c>=805 && c<=1004) {	
            AQI=this.linear(500,401,1004,805,c);
        } else {
            AQI="Out of Range";
        }
        return AQI;
    }

    AQIOzone8hr(concentration) {
        var Conc=parseFloat(concentration);
        var c;
        var AQI;
        c = (Math.floor(Conc))/1000;
        if (c>=0 && c<.055) {
            AQI=this.linear(50,0,0.054,0,c);
        } else if (c>=.055 && c<.071) {
            AQI=this.linear(100,51,.070,.055,c);
        } else if (c>=.071 && c<.086) {
            AQI=this.linear(150,101,.085,.071,c);
        } else if (c>=.086 && c<.106) {
            AQI=this.linear(200,151,.105,.086,c);
        } else if (c>=.106 && c<.201) {
            AQI=this.linear(300,201,.200,.106,c);
        } else {
            AQI="Out of Range";
        }
        return AQI;
    }


    AQIOzone1hr(concentration) {
        console.log(concentration)
        var Conc=parseFloat(concentration);
        var c;
        var AQI;
        c = (Math.floor(Conc))/1000;
        console.log(c);
        if (c>=0 && c<=.124) {
            AQI="Out of Range";
        } else if (c>=.125 && c<.165) {
            AQI=this.linear(150,101,.164,.125,c);
        } else if (c>=.165 && c<.205) {
            AQI=this.linear(200,151,.204,.165,c);
        } else if (c>=.205 && c<.405) {
            AQI=this.linear(300,201,.404,.205,c);
        } else if (c>=.405 && c<.505) {
            AQI=this.linear(400,301,.504,.405,c);
        } else if (c>=.505 && c<.605) {
            AQI=this.linear(500,401,.604,.505,c);
        } else {
            AQI="Out of Range";
        }
        return AQI;
    }

    AQINO2(concentration) {
        var Conc=parseFloat(concentration);
        var c;
        var AQI;
        c = (Math.floor(Conc))/1000;
        if (c>=0 && c<.054) {
            AQI=this.linear(50,0,.053,0,c);
        } else if (c>=.054 && c<.101) {
            AQI=this.linear(100,51,.100,.054,c);
        } else if (c>=.101 && c<.361) {
            AQI=this.linear(150,101,.360,.101,c);
        } else if (c>=.361 && c<.650) {
            AQI=this.linear(200,151,.649,.361,c);
        } else if (c>=.650 && c<1.250) {
            AQI=this.linear(300,201,1.249,.650,c);
        } else if (c>=1.250 && c<1.650) {
            AQI=this.linear(400,301,1.649,1.250,c);
        } else if (c>=1.650 && c<=2.049) {
            AQI=this.linear(500,401,2.049,1.650,c);
        } else {
            AQI="Out of Range";
        }
        return AQI;
    }

    getAQICategory(AQIndex) {
        var AQI = parseFloat(AQIndex)
        var AQICategory;
        if (AQI <= 50) {
            AQICategory = "Good";
        } else if (AQI > 50 && AQI <= 100) {
            AQICategory = "Moderate";
        } else if (AQI > 100 && AQI <= 150) {
            AQICategory = "Unhealthy for Sensitive Groups";
        } else if (AQI > 150 && AQI <= 200) {
            AQICategory = "Unhealthy";
        } else if (AQI > 200 && AQI <= 300) {
            AQICategory = "Very Unhealthy";
        } else if (AQI > 300 && AQI < 500) {
            AQICategory = "Hazardous";
        } else {
            AQICategory = "Out of Range";
        }
        return AQICategory;
    }

    getPM25() {
        const pm25Index = this.AQIPM25(this.pm25);
        //console.log('pm25 > in: ' + this.pm25 + ' out: ' + pm25Index);
        return pm25Index;
    }

    getPM10() {
        const pm10Index = this.AQIPM10(this.pm10);
        //console.log('pm10 > in: ' + this.pm10 + ' out: ' + pm10Index);
        return pm10Index;
    }

    getO3() {
        const o3PPB = this.convertMicroToPPB(this.o3);
        const o3Index = this.AQIOzone1hr(o3PPB);
        console.log('o3 > in: ' + this.o3 + ' (' + o3PPB + ') ' + ' out: ' + o3Index);
        return o3Index;
    }

    getSO2() {
        const so2Index = this.AQISO21hr(this.so2);
        //console.log('so2 > in: ' + this.so2 + ' out: ' + so2Index);
        return so2Index;
    }

    getNO2() {
        const no2Index = this.AQINO2(this.no2);
        //console.log('no2 > in: ' + this.no2 + ' out: ' + no2Index)
        return no2Index;
    }

    getCO() {
        const coIndex = this.AQICO(this.co);
        //console.log('co > in: ' + this.co + ' out: ' + coIndex);
        return coIndex;
    }

    // Total should be the max value of all concentrations
    getAQI() {
        return Math.max(
            this.getCO(),
            this.getNO2(),
            this.getO3(),
            this.getPM10(),
            this.getPM25(),
            this.getSO2()
        );
    }


/*
    AQICalc(form1) {
        var b;
        var c;

        if (document.form1.pollutant.selectedIndex == '0') {
            alert("You have not selected a pollutant.")
        }
        if (document.form1.pollutant.selectedIndex == '1') {
            b = Math.round(document.form1.inputbox.value);
            if (b < 0 || b > 500) {
                b = "PM25message";
            } else {
                c = Math.floor(10 * ConcPM25(b)) / 10;
            }
        } else if (document.form1.pollutant.selectedIndex == '2') {
            b = (document.form1.inputbox.value);
            if (b < 0 || b > 500) {
                b = "PM10message";
            } else {
                c = Math.floor(ConcPM10(b));
            }
        } else if (document.form1.pollutant.selectedIndex == '3') {
            b = Math.round(document.form1.inputbox.value);
            if (b < 0 || b > 500) {
                b = "Out of Range";
            } else {
                c = Math.floor(10 * ConcCO(b)) / 10;
            }
        } else if (document.form1.pollutant.selectedIndex == '4') {
            b = Math.round(document.form1.inputbox.value);

            if (b < 0 || b > 500) {
                b = "Out of Range";

            } else if (b > 200 && b <= 500) {
                b = "SO21hrmessage";
            } else {
                c = Math.floor(ConcSO21hr(b));
            }
        } else if (document.form1.pollutant.selectedIndex == '5') {
            b = Math.round(document.form1.inputbox.value);
            if (b < 0 || b > 500) {
                b = "Out of Range";
            } else if (b >= 0 && b <= 200) {
                b = "SO224hrmessage";
            } else {
                c = Math.floor(ConcSO224hr(b));
            }
        } else if (document.form1.pollutant.selectedIndex == '6') {
            b = Math.round(document.form1.inputbox.value);
            if (b < 0 || b > 500) {
                b = "Out of Range";

            } else if (b > 300 && b <= 500) {
                b = "O3message";
            } else {
                c = Math.floor(ConcOzone8hr(b));
            }
        } else if (document.form1.pollutant.selectedIndex == '7') {
            b = Math.round(document.form1.inputbox.value);
            if (b < 0 || b > 500) {
                b = "Out of Range";
            } else if (b >= 0 && b <= 100) {
                b = "O31hrmessage";
            } else {
                c = Math.floor(ConcOzone1hr(b));
            }
        } else if (document.form1.pollutant.selectedIndex == '8') {
            b = Math.round(document.form1.inputbox.value);
            if (b < 0 || b > 500) {
                b = "Out of Range";
            } else {
                c = Math.floor(ConcNO2(b));
            }
        }
    }
    */
}