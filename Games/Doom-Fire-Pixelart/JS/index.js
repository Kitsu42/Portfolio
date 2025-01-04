const firePixelsArray = []
const fireWidth = 60
const fireHeight = 50

const red = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]
const green = [{'r':7,'g':7,'b':7},{'r':7,'g':31,'b':7},{'r':15,'g':47,'b':7},{'r':15,'g':71,'b':7},{'r':23,'g':87,'b':7},{'r':31,'g':103,'b':7},{'r':31,'g':119,'b':7},{'r':39,'g':143,'b':7},{'r':47,'g':159,'b':7},{'r':63,'g':175,'b':7},{'r':71,'g':191,'b':7},{'r':71,'g':199,'b':7},{'r':79,'g':223,'b':7},{'r':87,'g':223,'b':7},{'r':87,'g':223,'b':7},{'r':95,'g':215,'b':7},{'r':95,'g':215,'b':7},{'r':103,'g':215,'b':15},{'r':111,'g':207,'b':15},{'r':119,'g':207,'b':15},{'r':127,'g':207,'b':15},{'r':135,'g':207,'b':23},{'r':135,'g':199,'b':23},{'r':143,'g':199,'b':23},{'r':151,'g':199,'b':31},{'r':159,'g':191,'b':31},{'r':159,'g':191,'b':31},{'r':167,'g':191,'b':39},{'r':167,'g':191,'b':39},{'r':175,'g':191,'b':47},{'r':175,'g':183,'b':47},{'r':183,'g':183,'b':47},{'r':183,'g':183,'b':55},{'r':207,'g':207,'b':111},{'r':223,'g':223,'b':159},{'r':239,'g':239,'b':199},{'r':255,'g':255,'b':255}]
const blue = [{'r':7,'g':7,'b':7},{'r':7,'g':7,'b':31},{'r':7,'g':15,'b':47},{'r':7,'g':15,'b':71},{'r':7,'g':23,'b':87},{'r':7,'g':31,'b':103},{'r':7,'g':31,'b':119},{'r':7,'g':39,'b':143},{'r':7,'g':47,'b':159},{'r':7,'g':63,'b':175},{'r':7,'g':71,'b':191},{'r':7,'g':71,'b':199},{'r':7,'g':79,'b':223},{'r':7,'g':87,'b':223},{'r':7,'g':87,'b':223},{'r':7,'g':95,'b':215},{'r':7,'g':95,'b':215},{'r':15,'g':103,'b':215},{'r':15,'g':111,'b':207},{'r':15,'g':119,'b':207},{'r':15,'g':127,'b':207},{'r':23,'g':135,'b':207},{'r':23,'g':135,'b':199},{'r':23,'g':143,'b':199},{'r':31,'g':151,'b':199},{'r':31,'g':159,'b':191},{'r':31,'g':159,'b':191},{'r':39,'g':167,'b':191},{'r':39,'g':167,'b':191},{'r':47,'g':175,'b':191},{'r':47,'g':175,'b':183},{'r':47,'g':183,'b':183},{'r':55,'g':183,'b':183},{'r':111,'g':207,'b':207},{'r':159,'g':223,'b':223},{'r':199,'g':239,'b':239},{'r':255,'g':255,'b':255}]

var fireColorsPallet = red
let previousFirePixelsArray = [...firePixelsArray];


let value = 0;

function incrementValue() {
    value++;
    if (value > 2) {
        value = 0;
    }
    updateValueDisplay();
}

function updateValueDisplay() {
    document.getElementById('valueDisplay').textContent = value;
    
    if (value === 0) {
        fireColorsPallet = red;
    } else if (value === 1) {
        fireColorsPallet = green;
    } else {
        fireColorsPallet = blue;
    }

    renderFire();
}

function start() {
    createFireDataStruture()
    createFireSource()
    renderFire()

    setInterval(calculateFirePropagation, 50)
}

function createFireDataStruture() {
    const numberOfPixels = fireWidth * fireHeight
    for (let i = 0; i < numberOfPixels; i++){
        firePixelsArray[i] = 0
    }
}

function calculateFirePropagation() {
    for (let colum = 0; colum < fireWidth; colum++){
        for (let row = 0; row < fireHeight; row++){
            const pixelIndex = colum + (fireWidth * row )

            updateFireIntensityPerPixel(pixelIndex)
        }
    }

    renderFire()
}

function updateFireIntensityPerPixel(currentPixelIndex){
    const belowPixelIndex = currentPixelIndex + fireWidth

    if (belowPixelIndex >= fireWidth * fireHeight){
        return
    }

    const decay = Math.floor(Math.random() * 2)
    const belowPixelFireIntensity = firePixelsArray [belowPixelIndex]
    const newFireIntensity = 
        belowPixelFireIntensity - decay >= 0? belowPixelFireIntensity - decay : 0

    firePixelsArray[currentPixelIndex - decay] = newFireIntensity
}

function renderFire() {
    const debug = false
    let html = '<table cellpadding=0 cellspacing=0>'

    for (let row = 0; row < fireHeight; row++){
        html += '<tr>'
            
        for (let colum = 0; colum < fireWidth; colum++){
            const pixelIndex = colum + ( fireWidth * row) 
            const fireIntensity = firePixelsArray[pixelIndex]

            if (debug === true) {
                html += '<td>'
                html += `<div class="pixel-index">${pixelIndex}</div>`
                html += fireIntensity
                html += '</td>'
            }else{
                const color = fireColorsPallet[fireIntensity]
                const colorString = `${color.r},${color.g},${color.b}`
                html += `<td class="pixel" style="background-color: rgb(${colorString})">`
                html += '</td>'
            }
        }

        html += '</tr>'
    }
    html += '</table>'
    document.querySelector('#fireCanvas').innerHTML = html
}

function createFireSource() {
    for (let colum = 0; colum <= fireWidth; colum++){
        const overflowPixelIndex = fireWidth * fireHeight
        const pixelIndex = (overflowPixelIndex - fireWidth) + colum

        firePixelsArray[pixelIndex] = 36
    }
}

function increaseFireSource() {
    for (let column = 0; column <= fireWidth; column++) {
      const overflowPixelIndex = fireWidth * fireHeight
      const pixelIndex = (overflowPixelIndex - fireWidth) + column
      const currentFireIntensity = firePixelsArray[pixelIndex]
  
      if (currentFireIntensity < 36) {
        const increase = Math.floor(Math.random() * 14)
        const newFireIntensity =
          currentFireIntensity + increase >= 36 ? 36 : currentFireIntensity + increase
  
        firePixelsArray[pixelIndex] = newFireIntensity
      }
    }
  }
  
  function decreaseFireSource() {
    for (let column = 0; column <= fireWidth; column++) {
      const overflowPixelIndex = fireWidth * fireHeight
      const pixelIndex = (overflowPixelIndex - fireWidth) + column
      const currentFireIntensity = firePixelsArray[pixelIndex]
  
      if (currentFireIntensity > 0) {
        const decay = Math.floor(Math.random() * 14)
        const newFireIntensity =
          currentFireIntensity - decay >= 0 ? currentFireIntensity - decay : 0
  
        firePixelsArray[pixelIndex] = newFireIntensity
      }
    }
  }

  function hasFireChanged() {
    let changeCount = 0;

    for (let i = 0; i < firePixelsArray.length; i++) {
        if (firePixelsArray[i] !== previousFirePixelsArray[i]) {
            changeCount++;
        }
    }

    const changePercentage = (changeCount / firePixelsArray.length) * 100;

    const changeThreshold = 5;

    previousFirePixelsArray = [...firePixelsArray];

    return changePercentage > changeThreshold;
}

function renderFire() {
    if (!hasFireChanged()) return;

    let html = '<table cellpadding=0 cellspacing=0>';
    for (let row = 0; row < fireHeight; row++) {
        html += '<tr>';
        for (let colum = 0; colum < fireWidth; colum++) {
            const pixelIndex = colum + (fireWidth * row);
            const fireIntensity = firePixelsArray[pixelIndex];

            const color = fireColorsPallet[fireIntensity];
            const colorString = `${color.r},${color.g},${color.b}`;
            html += `<td class="pixel" style="background-color: rgb(${colorString})">`;
            html += '</td>';
        }
        html += '</tr>';
    }
    html += '</table>';
    document.querySelector('#fireCanvas').innerHTML = html;
}

document.querySelector('#fireCanvas').addEventListener('click', function(event) {
    extinguishFire(event);
});

function extinguishFire(event) {
    const fireCanvas = document.querySelector('#fireCanvas');
    const rect = fireCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const column = Math.floor(x / (rect.width / fireWidth));
    const row = Math.floor(y / (rect.height / fireHeight));

    const pixelIndex = column + (fireWidth * row);

    suppressFire(pixelIndex);
}

function suppressFire(pixelIndex) {
    const spreadRadius = 5;
    const minIntensity = 0;

    for (let rowOffset = -spreadRadius; rowOffset <= spreadRadius; rowOffset++) {
        for (let colOffset = -spreadRadius; colOffset <= spreadRadius; colOffset++) {
            const targetIndex = pixelIndex + (colOffset + (fireWidth * rowOffset));

            if (targetIndex >= 0 && targetIndex < firePixelsArray.length) {
                firePixelsArray[targetIndex] = minIntensity;
            }
        }
    }

    renderFire();
}


function spreadFire(event) {
    const fireCanvas = document.querySelector('#fireCanvas');
    const rect = fireCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const column = Math.floor(x / (rect.width / fireWidth));
    const row = Math.floor(y / (rect.height / fireHeight));

    const pixelIndex = column + (fireWidth * row);

    igniteFire(pixelIndex);
}

function igniteFire(pixelIndex) {
    const spreadRadius = 5;
    const maxIntensity = 36;

    for (let rowOffset = -spreadRadius; rowOffset <= spreadRadius; rowOffset++) {
        for (let colOffset = -spreadRadius; colOffset <= spreadRadius; colOffset++) {
            const targetIndex = pixelIndex + (colOffset + (fireWidth * rowOffset));

            if (targetIndex >= 0 && targetIndex < firePixelsArray.length) {
                firePixelsArray[targetIndex] = maxIntensity;
            }
        }
    }

    renderFire();
}

  
  start()
  