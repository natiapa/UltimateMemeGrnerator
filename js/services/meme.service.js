'use strict'
const MEMES_STORAGE_KEY = 'myApp_memes'

var gMeme
_createMemes()

function getMeme() {
    return gMeme
}

function setLineTxt(text) {
    _createMeme(0, [{ txt: text, size: 12, color: 'red' }])
    _saveMeme
}

// privet function

function _createMemes() {
    gMeme = loadFromStorage(MEMES_STORAGE_KEY)
    if (!gMeme) {
        gMeme = [
            _createMeme(0, [{ txt: 'First line', size: 20, color: 'red' }])
        ]
        _saveMeme
    }

}
function _createMeme(selectedLineIdx = 0, lines = [{ txt: '', size: 12, color: 'black' }]) {
    return {
        selectedImgId: makeId(),
        selectedLineIdx,
        lines: lines.map(line => ({ // Use map to iterate over lines
            txt: line.txt,           // Access txt property using line.txt
            size: line.size,         // Access size property using line.size
            color: line.color        // Access color property using line.color
        }))
    };
}

function _saveMeme() {
    saveToStorage(MEMES_STORAGE_KEY, gMeme)
}
