//Getting elements
// const textarea = document.getElementById('textarea'); 
const guessEl = document.getElementById('guess'); 
const backDiv = document.getElementById('back'); 
const whiteBtn = document.getElementById('white-btn'); 
const blackBtn = document.getElementById('black-btn'); 
const okBtn = document.getElementById('ok-btn'); 
const printBtn = document.getElementById('print-btn'); 
const downloadBtn = document.getElementById('download-btn'); 
const backColor = document.getElementById('back-color'); 

//Creating neural network
const net = new brain.NeuralNetwork();

//Training
/*
let data = [
    {
        input: {r: 0, g: 0, b: 0},
        output: [1]
    },
    {
        input: {r: 1, g: 1, b: 1},
        output: [0]
    },
]
*/
net.train(data); //Getting data from "./train.js"


// Event Listeners
setRandCol();
whiteBtn.addEventListener('click', () => {
    chooseCol(1);
});
blackBtn.addEventListener('click', () => {
    chooseCol(0);
});
okBtn.addEventListener('click', () => {
    chooseCol(net.run(randCol)[0]>0.5?1:0);
});
printBtn.addEventListener('click', () => {
    console.log(JSON.stringify(data))
});
downloadBtn.addEventListener('click', ()=> {
    if(JSON.stringify(data).trim() == '') return alert('Please write something in the file to download !');
    let fName = new Date().getTime().toString();
    downloadFile(`f${fName}.json`, JSON.stringify(data));
});

backColor.addEventListener('input', (e)=> {
    let col = getRgb(backColor.value);
    backDiv.style.background = 
    `rgb(${col.r * 255}, ${col.g * 255}, ${col.b * 255})`;
})
backColor.addEventListener('change', (e)=> {
    let col = getRgb(backColor.value);
    backDiv.style.background = 
    `rgb(${col.r * 255}, ${col.g * 255}, ${col.b * 255})`;
    const guess = net.run(randCol)[0];
    // console.log(guess)
    // console.log(guess > 0.5)
    guessEl.style.color = guess > 0.5?"#FFF":"#000";
})
//Functions
function setRandCol() {
    randCol = {
        r: Math.random(),
        g: Math.random(),
        b: Math.random()
    }
    const guess = net.run(randCol)[0];
    // console.log(guess)
    // console.log(guess > 0.5)
    guessEl.style.color = guess > 0.5?"#FFF":"#000";
    backDiv.style.background = 
    `rgb(${randCol.r * 255}, ${randCol.g * 255}, ${randCol.b * 255})`;
   // return randCol;
}
function chooseCol(val) {
    data.push({
        input: randCol,
        output: [val]
    });
    setRandCol();
}
function downloadFile(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

  function getRgb(color) {
    const r = parseInt(color.substr(1,2), 16) / 255;
    const g = parseInt(color.substr(3,2), 16) / 255;
    const b = parseInt(color.substr(5,2), 16) / 255;
    // console.log(`red: ${r}, green: ${g}, blue: ${b}`)
    randCol = {
        r: r,
        g: g,
        b: b
    }
    return randCol;
    
  }