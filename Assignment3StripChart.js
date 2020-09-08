//References
//https://p5js.org/reference/#/p5/random

let tb;

let leftMargin = 120;
let topMargin = 120;
let plotWidth = window.innerWidth - 2 * leftMargin;
let plotHeight = window.innerHeight - 2 * topMargin;

function preload() {
    tb = loadTable("penguins.csv", "csv", "header");
}

let numRows;

let bodyMass = [];
let islands = [];

let tempMap = {};

let uniqueIslands = [];

let jitter = [];

function setup(){
    createCanvas(window.innerWidth,window.innerHeight);

    numRows = tb.getRowCount();

    bodyMass = tb.getColumn("body_mass_g");
    islands = tb.getColumn("island");

    for(let i = 0; i < numRows;i++)
    {
        if(bodyMass[i] != "NA")
        {
            if(!(islands[i] in tempMap))
            {
                tempMap[islands[i]] = [Number(bodyMass[i])];
            }
            else
            {
                tempMap[islands[i]].push(Number(bodyMass[i]));
            }
        }
    }

    Object.values(tempMap).forEach((i,index) => {
        i.forEach((j,index2)=>{
            let r = random(-25, 25);
            jitter.push(round(r,1));
        });
    });

    console.log("Total number of islands : "+ Object.keys(tempMap).length);

    Object.keys(tempMap).forEach((i,index) => {
        uniqueIslands.push(i);
    });

    console.log("Jitter : "+ jitter);
}

function draw() {
    background(220);
    fill(0);
    const len =  Object.keys(tempMap).length;
    console.log("map : "+tempMap);

    //Heading of the plot
    textSize(25);
    text("Strip chart showing distribution of penguins according to body mass in g on different islands",plotWidth/2 + 500,topMargin - 50);
    textSize(12);

    // plotting x-axis
    line(leftMargin,topMargin + plotHeight, plotWidth - 150, topMargin + plotHeight);

    line(plotWidth - 160, topMargin + plotHeight - 10, plotWidth - 150, topMargin + plotHeight);
    line(plotWidth - 160, topMargin + plotHeight + 10, plotWidth - 150, topMargin + plotHeight)

    // plotting y-axis
    line(leftMargin, topMargin + plotHeight, leftMargin, topMargin-10);

    line(leftMargin - 10, topMargin , leftMargin, topMargin-10);
    line(leftMargin + 10, topMargin , leftMargin, topMargin-10);
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
    text("body mass (in grams)",-(topMargin + plotHeight/2),leftMargin - 70);
    textSize(12);
    rotate(90);

    let extraPixelsyaxis = 5;
    let minValYaxis = topMargin + plotHeight - extraPixelsyaxis;
    let verSpacing = 1 / 13;

    // Y axis label values according to scale
    textAlign(RIGHT);
    for(i = 1000; i <= 6600; i=i+400){
        text(i, leftMargin - 25, minValYaxis - (verSpacing * (i)) + 59);
        line(leftMargin - 5, minValYaxis - (verSpacing * (i)) + 55, leftMargin + 5,minValYaxis - (verSpacing * (i)) + 55);
    }

    let scale  = 32;

    Object.values(tempMap).forEach((i,index) => {
       console.log("Length of i : "+i.length);
       i.forEach((j,index2) =>{
           // fill(13,132,233);
           strokeWeight(6);
           stroke(169,174,39,150);
           point(index * 300 + leftMargin + 220 + jitter[index2],topMargin + plotHeight - (j-1000)/15);
           stroke(1);
           strokeWeight(0.5);

           // fill(0);
       });
    });
}
