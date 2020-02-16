'use strict';

function onInit() {
    drawCanvas();
    renderGallery()
}

function renderGallery() {
    var images = getImagesForDisplay()
    var strHtml = ``;
    strHtml = images.map((img) => {
        return `<div class="gallery-img" style="background-image:url(${img.url});" onclick="showEditor(${img.id})"></div>`
    })
    document.querySelector('.gallery').innerHTML = strHtml.join('')
    renderKeywords()
}

function renderKeywords() {
    var strHtml = ``;
    var keyords = getKeyords()
    strHtml = keyords.map((keyword) => {
        return `<div class="keyword" style="font-size: ${keyword.fontSize}px" onclick="onKeywordClick('${keyword.label}')">${keyword.label}</div>`
    })
    document.querySelector('.keyword-search-container').innerHTML = strHtml.join('')
}

function drawCanvas() {
    gCanvas = document.querySelector('#myCanvas');
    gCtx = gCanvas.getContext('2d');
}

function renderCanvas() {
    var id = getMemeImgId();
    var image = getImgById(id);
    drawImage(image);
    renderText()
}

function drawImage(image) {
    var img = new Image();
    img.src = image.url
    img.onload = function () {
        gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        drawText()
    }
}

function renderText() {
    var meme = getMeme();
    if (meme.lines.length === 0) return
    document.querySelector('#meme-text').value = meme.lines[gMeme.selectedLineIdx].text;
}

function drawText() {
    var currMeme = getMeme();
    for (var i = 0; i < currMeme.lines.length; i++) {
        var line = currMeme.lines[i]
        gCtx.font = line.size + 'px ' + line.font;
        gCtx.fillStyle = line.fillColor;
        gCtx.textAlign = line.align;
        if (line.strokeColor) {
            gCtx.strokeStyle = line.strokeColor;
            gCtx.strokeText(line.text, line.x, line.y);
        }
        gCtx.fillText(line.text, gCanvas.width * 0.5, line.y);
        markerLine();
    }
}

function markerLine() {
    var meme = getMeme();
    var y = meme.lines[meme.selectedLineIdx].y;
    gCtx.fillStyle = 'rgb(0,0,0,0.2)';
    gCtx.fillRect(0, y - 20, 500, 40);
}
function showEditor(imgId) {
    document.querySelector('.canvas-editor').style.display = "flex";
    document.querySelector('.gallery').style.display = "none";
    document.querySelector('.filter-container').style.display = "none";
    setSelectedMeme(imgId)
    renderCanvas()
}

function showGallery() {
    document.querySelector('.filter-container').style.display = "flex";
    document.querySelector('.canvas-editor').style.display = "none";
    document.querySelector('.gallery').style.display = "grid";
}

function onTextType() {
    var meme = getMeme();
    if (meme.lines.length === 0) addLine()
    var text = document.querySelector('#meme-text').value;
    setMemeLine(text);
    renderCanvas();
}

function onIncreaseFontSize() {
    setMemeIncreaseFontSize();
    renderCanvas();
}

function onDecreaseFontSize() {
    setMemeDecreaseFontSize();
    renderCanvas();
}

function onTextMoveUp() {
    setMemeTextMoveUp();
    renderCanvas();
}

function onTextMoveDown() {
    setMemeTextMoveDown();
    renderCanvas();
}

function onAddLine() {
    addLine();
    renderCanvas();
}

function onDeleteLine() {
    document.querySelector('#meme-text').value = ''
    deleteLine();
    renderCanvas();
}

function onSwitchLine() {
    var meme = getMeme();
    if (meme.lines.length === 0) return
    switchLine();
    document.querySelector('#meme-text').value = meme.lines[gMeme.selectedLineIdx].text;
    renderCanvas();
}

function onAlignLeft() {
    setAlignLeft();
    renderCanvas();
}

function onAlignCenter() {
    setAlignCenter();
    renderCanvas();
}

function onAlignRight() {
    setAlignRight();
    renderCanvas();
}

function onChangeFont(font) {
    changeFont(font)
    renderCanvas()
}

function onChangeStrokeColor(value) {
    changeStrokeColor(value);
    renderCanvas();
}

function onChangeFillColor(value) {
    changeFillColor(value)
    renderCanvas()
}

function onSearch(event) {
    var searchStr = event.target.value
    setSearchString(searchStr.toLowerCase())
    renderGallery()
}

function onKeywordClick(keyword) {
    setKeywordFontSize(keyword)
    setSearchString(keyword.toLowerCase())
    renderGallery()
}

function downloadMeme(memeEl) {
    var image = gCanvas.toDataURL("image/jpg");
    memeEl.href = image;
}

function toggleMenu() {
    var mainMenu = document.querySelector('.nav-container');
    mainMenu.classList.toggle('open');
}