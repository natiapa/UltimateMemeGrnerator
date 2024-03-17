'use strict'
let gElCanvas
let gCtx
let gTextInput

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    gTextInput = document.querySelector('text-container input[name="text"]')

    renderMeme()
    // resizeCanvas()

    // window.addEventListener('resize', () => resizeCanvas())
}

function renderMeme() {
 const img = new Image()
 img.src = 'images/2.jpg'

 img.onload = ()=>
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height )
    drawText('Your Text Here', gElCanvas.width / 2, 50);
}

function onUpdateText() {
    const text = gTextInput.value
}

// function resizeCanvas() {
//     const elContainer = document.querySelector('.editor')
//     gElCanvas.width = elContainer.clientWidth
// }

// function drawImg() {
//     const elImg = new Image()
//     elImg.src = 'images/2.jpg'

//     elImg.onload = () =>
//         gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
// }



// function onSelectImg(elImg) {
//     gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
//     gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
// }


// function onSetLineText(text) {
//     gText = text
//     setLineTxt(text)
// }


// function onAddTextToCanvas(ev) {
//     const { offsetX, offsetY } = ev
//     const textInput = document.querySelector('input[name="text"]')
//     gText = textInput.value

    

//     drawImg()
//     drawText(gText, offsetX, offsetY)
    

// }

// function drawText(text, x, y) {
    
//     gCtx.lineWidth = 2
//     gCtx.strokeStyle = 'orange'

//     gCtx.fillStyle = 'lightsteelblue'

//     gCtx.font = '45px Arial'
//     gCtx.textAlign = 'center'
//     gCtx.textBaseline = 'middle'

//     drawImg()
//     gCtx.fillText(text, x, y)
//     gCtx.strokeText(text, x, y)
// }



// function onSetShape(shape) {
//     //     gCurrShape = shape
//     // }

// function onDraw(ev) {
//     const { offsetX, offsetY } = ev


//     if (gCurrShape === 'text') {
//         drawText(gText, offsetX, offsetY);
//     }
// }

// function renderMeme() {
//     const elImg = document.querySelector('.select-img-container')

//     const strHtmls = `
//     <img src="images/2.jpg" onclick="onSelectImg(this)" />

//     <div>
//     <div class="text-container">
//     <label for="text">Text:</label>
//     <input type="text" id="text" name="text" placeholder="Add Text Here" oninput="onSetLineText(this.value)">
//     </div>

//     <button no use thi>Add Text</button>
//     <div>
    
//     `

//     elImg.innerHTML = strHtmls
// }