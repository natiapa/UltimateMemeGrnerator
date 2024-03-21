'use strict'
const IMAGES_STORAGE_KEY = 'myApp_images'

var gImgs = []
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: []
}

_createImgs()

function getMeme() {
    return gMeme
}

function getImgs() {
    return gImgs
}

function setLineTxt(text) {
    const newLine = _createLine(text)
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function updateLocation(x, y, width) {
    gMeme.lines[gMeme.selectedLineIdx].x = x
    gMeme.lines[gMeme.selectedLineIdx].y = y
    gMeme.lines[gMeme.selectedLineIdx].width = width
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function getImgById(imgId) {
    const img = gImgs.find(img => img.id === imgId)
    return img
}

function switchLine() {
    const numLines = gMeme.lines.length
    if (numLines === 0) return

    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= numLines) {
        gMeme.selectedLineIdx = 0
    }
}

function updateColor(textColor) {
    gMeme.lines[gMeme.selectedLineIdx].color = textColor
}

function changeFontSize(sign) {
    if (sign === '+') {
        gMeme.lines[gMeme.selectedLineIdx].size++
    } else {
        gMeme.lines[gMeme.selectedLineIdx].size--
    }
}

function isClickOnLine(x, y) {
    return gMeme.lines.findIndex(line => (
        x >= line.x - line.width / 2 && x <= line.x + line.width / 2 &&
        y >= line.y - line.height / 2 && y <= line.y + line.height / 2
    ))
}
function updateIndex(clickedLineIdx) {
    gMeme.selectedLineIdx = clickedLineIdx
}

function _createImgs() {
    gImgs = loadFromStorage(IMAGES_STORAGE_KEY)

    if (!gImgs) {
        gImgs = [
            _createImg('images/2.jpg'),
            _createImg('images/3.jpg'),
            _createImg('images/4.jpg'),
            _createImg('images/5.jpg'),
            _createImg('images/6.jpg'),
            _createImg('images/8.jpg'),
            _createImg('images/11.jpg'),
            _createImg('images/12.jpg'),
        ]
        _saveImg()
    }
}

function _createImg(url = '') {
    return {
        id: makeId(),
        url,
        keywords: [],
    }
}
function _createLine(txt, color = 'black', fontSize = 30, width, x = 0, y = 0) {
    return {
        txt,
        size: fontSize,
        color,
        x,
        y,
        width,
        height: fontSize,
    }
}
function _saveImg() {
    saveToStorage(IMAGES_STORAGE_KEY, gImgs)
}



