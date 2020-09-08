//References :
//https://www.geeksforgeeks.org/p5-js-round-function/


let tb;

let leftMargin = 120;
let topMargin = 120;
let plotWidth = window.innerWidth - 2 * leftMargin;
let plotHeight = window.innerHeight - 2 * topMargin;

function preload() {
    tb = loadTable("penguins.csv", "csv", "header");
}

let numRows;

let billDepth = [];
let islands = [];

let tempMap = {};

let maxArray = [];
let minArray = [];

let medians = [];
let firstQuartiles = [];
let thirdQuartiles = [];

let uniqueIslands = [];

function setup(){
    createCanvas(window.innerWidth,window.innerHeight);

    numRows = tb.getRowCount();

    billDepth = tb.getColumn("bill_depth_mm");
    islands = tb.getColumn("island");

    for(let i = 0; i < numRows;i++)
    {
        if(billDepth[i] != "NA")
        {
            if(!(islands[i] in tempMap))
            {
                tempMap[islands[i]] = [Number(billDepth[i])];
            }
            else
            {
                tempMap[islands[i]].push(Number(billDepth[i]));
            }
        }
    }

    console.log("Total number of islands : "+ Object.keys(tempMap).length);

    Object.keys(tempMap).forEach((i,index) => {
       uniqueIslands.push(i);
    });

    Object.values(tempMap).forEach((i,index) => {

        const len = i.length;

        i.sort();

        maxArray.push(i[len-1]);
        minArray.push(i[0]);

        let mid = Math.round(len/2);

        if(len % 2 != 0){
            medians.push(i[mid]);
        }
        else{
            medians.push(round(((i[mid] + i[mid+1])/2),1));
        }

        let firstQuartileMid = round(mid/2);

        if(mid % 2 != 0){
            firstQuartiles.push(i[firstQuartileMid]);
        }
        else{
            firstQuartiles.push(round(((i[firstQuartileMid] + i[firstQuartileMid+1])/2),1));
        }

        let thirdQuartileMid = mid + round(mid/2);

        if((len - mid) % 2 != 0){
            thirdQuartiles.push(i[thirdQuartileMid]);
        }
        else{
            thirdQuartiles.push(round(((i[thirdQuartileMid] + i[thirdQuartileMid+1])/2),1));
        }
    });

    console.log("Maximum values : "+maxArray);
    console.log("Minimum values : "+minArray);
    console.log("Median values : "+medians);
    console.log("First Quartile values : "+firstQuartiles);
    console.log("Third Quartile values : "+thirdQuartiles);
}

function draw() {
    background(220);
    fill(0);
    const len =  Object.keys(tempMap).length;
    console.log("map : "+tempMap);

    //Heading of the plot
    textSize(25);
    text("Box plot showing distribution of penguins according to bill_depth in mm among islands",plotWidth/2 + 450,topMargin - 50);
    textSize(12);

    // plotting x-axis
    line(leftMargin,topMargin + plotHeight, plotWidth - 150, topMargin + plotHeight);

    line(plotWidth - 160, topMargin + plotHeight - 10, plotWidth - 150, topMargin + plotHeight);
    line(plotWidth - 160, topMargin + plotHeight + 10, plotWidth - 150, topMargin + plotHeight)

    // plotting y-axis
    line(leftMargin, topMargin + plotHeight, leftMargin, topMargin);

    line(leftMargin - 10, topMargin + 10, leftMargin, topMargin);
    line(leftMargin + 10, topMargin + 10, leftMargin, topMargin);
    // console.log("max : "+max+" min : "+min);

    // plotting x - axis labels
    textAlign(LEFT);
    textSize(20);
    text("Islands",(plotWidth/2)-40,topMargin+plotHeight+70);
    textSize(12);

    for(let i = 0; i <= uniqueIslands.length; i++){
        text(uniqueIslands[i], i * 300 + leftMargin + 200, topMargin + plotHeight + 30);
    }

    // plotting y - axis labels
    angleMode(DEGREES);
    rotate(270);
    textAlign(CENTER);
    textSize(20);
    text("bill depth (in mm)",-(topMargin + plotHeight/2),leftMargin - 70);
    textSize(12);
    rotate(90);

    let extraPixelsyaxis = 5;
    let minValYaxis = topMargin + plotHeight - extraPixelsyaxis;
    let verSpacing = plotHeight / 15;

    // Y axis label values according to scale
    textAlign(RIGHT);
    for(i = 11; i < 24; i++){
        text(i, leftMargin - 25, minValYaxis - (verSpacing * (i-11)) - 21);
        line(leftMargin - 5, minValYaxis - (verSpacing * (i-11)) - 25, leftMargin + 5,minValYaxis - (verSpacing * (i-11)) - 25);
    }

    //plotting max values
    textAlign(RIGHT);
    for(let i = 0; i <= uniqueIslands.length; i++){
        text("Max value("+ maxArray[i] +")",i * 300 + leftMargin + 190,topMargin + plotHeight - (maxArray[i]-10) * 32)
        line(i * 300 + leftMargin + 200,topMargin + plotHeight - (maxArray[i]-10) * 32, i * 300 + leftMargin + 240, topMargin + plotHeight - (maxArray[i]-10) * 32);
    }

    //plotting min values
    for(let i = 0; i <= uniqueIslands.length; i++){
        text("Min value("+ minArray[i] +")",i * 300 + leftMargin + 190,topMargin + plotHeight - (minArray[i]-10) * 32)
        line(i * 300 + leftMargin + 200,topMargin + plotHeight - (minArray[i]-10) * 32, i * 300 + leftMargin + 240, topMargin + plotHeight - (minArray[i]-10) * 32);
    }

    // plotting box
    let scale  = 32;
    for(let i = 0; i <= uniqueIslands.length; i++){
        text("First quartile("+ firstQuartiles[i] +")",i * 300 + leftMargin + 160,topMargin + plotHeight - (firstQuartiles[i]-10) * 32)
        fill(240);
        rect(i * 300 + leftMargin + 175,topMargin + plotHeight - ((thirdQuartiles[i] -10) * scale), 90,(thirdQuartiles[i]-firstQuartiles[i]) * scale);
        fill(0);
        text("Third quartile("+ thirdQuartiles[i] +")",i * 300 + leftMargin + 160,topMargin + plotHeight - (thirdQuartiles[i]-10) * 32)
    }

    //joining line between box and max-min
    for(let i = 0; i <= uniqueIslands.length; i++){
        line(i * 300 + leftMargin + 220,topMargin + plotHeight - (maxArray[i]-10) * 32,i * 300 + leftMargin + 220,topMargin + plotHeight - ((thirdQuartiles[i] -10) * 32));
        line(i * 300 + leftMargin + 220,topMargin + plotHeight - (minArray[i]-10) * 32,i * 300 + leftMargin + 220,topMargin + plotHeight -(firstQuartiles[i]-10)*32);
    }

    //median line in the box
    for(let i = 0; i <= uniqueIslands.length; i++){
        text("Median value("+ medians[i] +")",i * 300 + leftMargin + 160,topMargin + plotHeight - (medians[i]-10) * 32)
        line(i * 300 + leftMargin + 175,topMargin + plotHeight - (medians[i]-10) * 32, i * 300 + leftMargin + 175 + 90, topMargin + plotHeight - ((medians[i] -10) * 32));
    }
}
