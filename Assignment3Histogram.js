let tb;

let leftMargin = 120;
let topMargin = 100;
let plotWidth = window.innerWidth - 4 * leftMargin;
let plotHeight = window.innerHeight - topMargin - 90;

function preload() {
    tb = loadTable("penguins.csv", "csv", "header");
}

let tempMap = {};
let temp2Map = {};
let binWidth = 8;
let min = 2000;
let max = 0;

function setup(){
    createCanvas(window.innerWidth,window.innerHeight);

    tb.rows.forEach(i => {
        if(i.obj["flipper_length_mm"] != "NA"){
            let temp = i.obj["flipper_length_mm"];
            if (temp > max){
                max = +temp;
            }
            if (temp < min){
                min = +temp;
            }
            if (!(+temp in tempMap))
                tempMap[+(temp)] = 1;
            else{
                tempMap[+(temp)] += 1;
            }
        }
    });

    Object.keys(tempMap).forEach((i, index) => {
        for(let j=0; binWidth * (j+1) < max;j++){
            let lower = min + binWidth * j;
            let upper = min + binWidth * (j+1);
            if(i < upper && i >= lower){
                if(!(+lower in temp2Map)){
                    temp2Map[+lower] = Object.values(tempMap)[index];
                }
                else {
                    temp2Map[+lower] += Object.values(tempMap)[index];
                }
            }
        }
    });


    // //To check if map is successfully loaded or not
    //  console.log("len = "+Object.keys(tempMap).length);
}

function draw() {
    background(220);
    fill(0);
    const len =  Object.keys(temp2Map).length;

    //To check if map is accessible or not
    // console.log("len = "+len);

    //Heading of the plot
    textSize(25);
    text("Histogram of number of penguins according to Flipper length in mm",plotWidth/2 + 300,topMargin);
    textSize(12);

    // plotting x-axis
    line(leftMargin,topMargin + plotHeight, plotWidth-420, topMargin + plotHeight);

    line(plotWidth -430, topMargin + plotHeight - 10, plotWidth-420, topMargin + plotHeight);
    line(plotWidth -430, topMargin + plotHeight + 10, plotWidth-420, topMargin + plotHeight)

    // plotting y-axis
    line(leftMargin, topMargin + plotHeight, leftMargin, topMargin+50);

    line(leftMargin - 10, topMargin + 60, leftMargin, topMargin+50);
    line(leftMargin + 10, topMargin + 60, leftMargin, topMargin+50);
    // console.log("max : "+max+" min : "+min);

    // plotting x - axis labels
    textAlign(LEFT);
    textSize(20);
    text("Flipper length (in mm)",(plotWidth/2) - 250,topMargin+plotHeight+70);
    textSize(12);

    let fixedBarWidth = plotWidth / 1500;
    const hztSpacing = plotWidth / 21.5;
    let j=1;
    let i;
    for(i = min; i <= max;i++){
        text(str(i), j * (fixedBarWidth + hztSpacing) - 10 + leftMargin, topMargin + plotHeight + 30);
        j++;
        i += binWidth-1;
    }
    text(str(i), j * (fixedBarWidth + hztSpacing) - 10 + leftMargin, topMargin + plotHeight + 30);

    console.log(temp2Map);
    // plotting y - axis labels
    angleMode(DEGREES);
    rotate(270);
    textAlign(CENTER);
    textSize(20);
    text("Number of penguins",-(topMargin + plotHeight/2),leftMargin - 70);
    textSize(12);
    rotate(90);

    let extraPixelsyaxis = 5;
    let minValYaxis = topMargin + plotHeight - extraPixelsyaxis;
    let verSpacing = plotHeight / 13;

    // Y axis label values according to scale
    textAlign(RIGHT);
    text("0", leftMargin - 25, minValYaxis + 5);
    for(i = 1; i < 11; i++){
        text(10*i, leftMargin - 25, minValYaxis - (verSpacing * i) + 5);
        line(leftMargin - 5, minValYaxis - (verSpacing * i ) , leftMargin + 5, minValYaxis - (verSpacing * i ) );
    }

    // plotting bars according to the values
    const barlenWidth  = 50;
    Object.values(temp2Map).forEach((i, index) => {
        fill(134, 231, 250);
        rect((index+1) * barlenWidth + leftMargin, topMargin + plotHeight - extraPixelsyaxis - (i/10 * verSpacing),barlenWidth, (i/10 * verSpacing)+extraPixelsyaxis);
    })
}
