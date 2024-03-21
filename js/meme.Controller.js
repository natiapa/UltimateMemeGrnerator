'use strict'
let gElCanvas
let gCtx
let gImgUrl
let currentY = 25
let flag = false


function onInit() {
    const elEditor = document.querySelector('.editor')
    const elCanvasContainer = elEditor.querySelector('.canvas-container')
    gElCanvas = elCanvasContainer.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    addListeners()
    renderMeme()
    rederGallery()
    resizeCanvas()
}

function renderMeme() {
    const meme = getMeme()
    const { lines } = meme

    const img = new Image()
    img.src = gImgUrl || 'images/2.jpg'

    currentY = 25
    img.onload = () => {
        gElCanvas.width = img.naturalWidth
        gElCanvas.height = img.naturalHeight
        gCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)

        lines.forEach((line, idx) => {

            drawText(line.txt, line.color, line.size, gElCanvas.width / 2, currentY)

            if (idx === meme.selectedLineIdx && flag === true) {
                drawFrame(currentY, line.size)
                flag = false
            }
            currentY += line.size + 50
        })

    }
}

function addListeners() {
    gElCanvas.addEventListener('click', onMouseClick)
    window.addEventListener('resize', () => resizeCanvas())
    document.querySelector('button[name="download-btn"]').addEventListener('click', onDownloadCanvas)
}

function resizeCanvas() {
    const elEditor = document.querySelector('.editor')
    const elContainer = elEditor.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth
    renderMeme()
}

function onUpdateColor() {
    const elColor = document.getElementById('color').value
    updateColor(elColor)
    renderMeme()
}

function onChangeFontSize(sign) {
    flag = true
    changeFontSize(sign)
    renderMeme()
}

function onAddLine() {
    const elTxt = document.querySelector('input[name="text"]').value
    setLineTxt(elTxt)
    renderMeme()
}

function onSwitchLine() {
    flag = true
    switchLine()
    renderMeme()
}

function drawText(text, textColor, fontSize, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = textColor

    gCtx.fillStyle = textColor

    gCtx.font = `${fontSize}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)

    const width = gCtx.measureText(text).width

    updateLocation(x, y, width)
}

function drawFrame(y, size) {
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 2
    gCtx.strokeRect(10, y - size / 2, gElCanvas.width - 100, size + 10)
}

function onDownloadCanvas() {
    const link = document.createElement('a')
    link.href = gElCanvas.toDataURL('image/jpeg')

    link.download = 'canvas_image.jpg'
    link.click()
}


function onMouseClick(ev) {
    const rect = gElCanvas.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const clickedLineIdx = isClickOnLine(x, y);

    if (clickedLineIdx !== -1) {
        updateIndex(clickedLineIdx)
        console.log('line:', gMeme.lines[clickedLineIdx])

        const selectedLine = gMeme.lines[clickedLineIdx]
        const textInput = document.querySelector('input[name="text"]')
        textInput.value = selectedLine.txt
        textInput.focus()

    }
}


