'use strict'

function rederGallery() {
    const elGallery = document.querySelector('.gallery')
    const elImgs = elGallery.querySelector('.select-img-container')
    const imgs = getImgs()

    const strHtml = imgs.map(img => `
    <img src="${img.url}" onclick="onImgSelect('${img.id}', '${img.url}')" />
    `)

    elImgs.innerHTML = strHtml.join('')
}

function onImgSelect(imgId, imgUrl) {
    gImgUrl = imgUrl
    setImg(imgId)
    renderMeme()
}