'use strict'
let gElCanvas
let gCtx
let gImgUrl
let gCurrIndex = 0




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

    img.onload = () => {
        var currentY = 25
        gElCanvas.width = img.naturalWidth
        gElCanvas.height = img.naturalHeight
        gCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)

        lines.forEach((line, idx) => {

            drawText(line.txt, line.color, line.size, gElCanvas.width / 2, currentY)

            if (idx === meme.selectedLineIdx) {
                console.log('meme.selectedLineIdx', meme.selectedLineIdx)
                drawFrame(line.y, line.size)
            }
            currentY += line.size + 50
        })

    }
}

function renderMeme1() {
    const meme = getMeme()
    const { lines } = meme

    const img = new Image()
    img.src = gImgUrl || 'images/2.jpg'

    img.onload = () => {
        var currentY = 25
        gElCanvas.width = img.naturalWidth
        gElCanvas.height = img.naturalHeight
        gCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)

        lines.forEach((line, idx) => {

            drawText(line.txt, line.color, line.size, gElCanvas.width / 2, currentY)

            if (idx === gCurrIndex) {
                console.log('meme.selectedLineIdx', meme.selectedLineIdx)
                drawFrame(line.y, line.size)
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
    changeFontSize(sign)
    renderMeme()
}

function onAddLine() {
    const elTxt = document.querySelector('input[name="text"]').value
    setLineTxt(elTxt)
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
}

function drawText(text, textColor, fontSize,x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = textColor

    gCtx.fillStyle = textColor

    gCtx.font = `${fontSize}px Ariel`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)

    const width = gCtx.measureText(text).width
    updateLocation(x, y, width)
}

function onDownloadCanvas() {
    const link = document.createElement('a')
    link.href = gElCanvas.toDataURL('image/jpeg')

    link.download = 'canvas_image.jpg'
    link.click()
}

function drawFrame(yCoord, size) {
    const frameWidth = gElCanvas.width - 40
    const frameHeight = size + 10

    const x = 20
    const yOffset = (frameHeight - size) / 2
    const y = yCoord - size / 2 - yOffset

    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 2
    gCtx.strokeRect(x, y, frameWidth, frameHeight)
}



function onMouseClick(ev) {
    const meme = getMeme()

    const rect = gElCanvas.getBoundingClientRect()
    const scaleX = gElCanvas.width / rect.width
    const scaleY = gElCanvas.height / rect.height
    const x = (ev.clientX - rect.left) * scaleX
    const y = (ev.clientY - rect.top) * scaleY


    const clickedLineIdx = isClickOnLine(x, y)
    console.log('clickedLineIdx', clickedLineIdx)

    if (clickedLineIdx !== -1) {
        gCurrIndex = clickedLineIdx
        const selectedLine = meme.lines[gCurrIndex]
        console.log('selectedLine', selectedLine)
        onEditText(selectedLine, meme)
        renderMeme1()

    }

}

function onEditText(selectedLine) {
    const inputText = document.querySelector('input[name="text"]')

    inputText.value = selectedLine.txt
    inputText.focus()
    inputText.addEventListener('input', function () {
        if (gCurrIndex !== -1) {
            const newText = inputText.value;
            updateLineText(gCurrIndex, newText)

        }
        renderMeme1()
    })

}
