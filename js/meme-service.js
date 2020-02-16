'use strict';

var gCanvas
var gCtx;
var gKeywords = {};
var gFilterBy = ''



var gImgs = [
    { id: 1, url: 'images/meme-imgs/1.jpg', keywords: ['Politics', 'Angry'] },
    { id: 2, url: 'images/meme-imgs/2.jpg', keywords: ['Cute', 'Animals'] },
    { id: 3, url: 'images/meme-imgs/3.jpg', keywords: ['Cute', 'Babies'] },
    { id: 4, url: 'images/meme-imgs/4.jpg', keywords: ['Cute', 'Animals'] },
    { id: 5, url: 'images/meme-imgs/5.jpg', keywords: ['Babies', 'Angry'] },
    { id: 6, url: 'images/meme-imgs/6.jpg', keywords: ['Scary'] },
    { id: 7, url: 'images/meme-imgs/7.jpg', keywords: ['Funny'] },
    { id: 8, url: 'images/meme-imgs/8.jpg', keywords: ['Cute'] },
    { id: 9, url: 'images/meme-imgs/9.jpg', keywords: ['Cute'] },
    { id: 10, url: 'images/meme-imgs/10.jpg', keywords: ['Politics'] },
    { id: 11, url: 'images/meme-imgs/11.jpg', keywords: ['Funny'] },
    { id: 12, url: 'images/meme-imgs/12.jpg', keywords: ['TV'] },
    { id: 13, url: 'images/meme-imgs/13.jpg', keywords: ['Movies'] },
    { id: 14, url: 'images/meme-imgs/14.jpg', keywords: ['Movies'] },
    { id: 15, url: 'images/meme-imgs/15.jpg', keywords: ['TV'] },
    { id: 16, url: 'images/meme-imgs/16.jpg', keywords: ['TV', 'Funny'] },
    { id: 17, url: 'images/meme-imgs/17.jpg', keywords: ['Politics', 'Scary'] },
    { id: 18, url: 'images/meme-imgs/18.jpg', keywords: ['Cute', 'Scary'] }
]

var gKeywords = [
    { label: 'All', fontSize: 15 }, { label: 'TV', fontSize: 15 }, { label: 'Politics', fontSize: 15 },
    { label: 'Angry', fontSize: 15 }, { label: 'Cute', fontSize: 15 },
    { label: 'Animals', fontSize: 15 }, { label: 'Babies', fontSize: 15 }, { label: 'Movies', fontSize: 15 }, { label: 'Scary', fontSize: 15 },
    { label: 'Funny', fontSize: 15 }
]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        { text: 'I never eat Falafel', size: 20, align: 'center', strokeColor: 'none', fillColor: 'black', font: 'IMPACT', x: 250, y: 50 },
        { text: 'I like piza', size: 20, align: 'center', strokeColor: 'none', fillColor: 'black', font: 'IMPACT', x: 250, y: 450 }
    ]
}

function getImgById(imgId) {
    var img = gImgs.find(function (img) {
        return img.id === imgId;
    })
    return img;
}

function setMeme(id) {
    gMeme.selectedImgId = id;
}

function getMemeImgId() {
    return gMeme.selectedImgId;
}

function getKeyords(){
    return gKeywords;
}

function setMemeLine(text) {
    gMeme.lines[gMeme.selectedLineIdx].text = text;
}

function getMeme() {
    return gMeme;
}

function getImagesForDisplay() {
    var imagesForDisplay = []
    if (gFilterBy === '' || gFilterBy === 'all') imagesForDisplay = gImgs;
    else {
        gImgs.forEach(function (img) {
            img.keywords.forEach((keyord) => {
                if (keyord.toLowerCase().includes(gFilterBy)) {
                    imagesForDisplay.push(img)
                }
            })
        })
    }
    return imagesForDisplay
}

function setSelectedMeme(imgId) {
    gMeme.selectedImgId = imgId
}

function setMemeIncreaseFontSize() {
    if (gMeme.lines.length === 0) return
    var fontSize = gMeme.lines[gMeme.selectedLineIdx].size;
    gMeme.lines[gMeme.selectedLineIdx].size = fontSize + 5
}

function setMemeDecreaseFontSize() {
    if (gMeme.lines.length === 0) return
    var fontSize = gMeme.lines[gMeme.selectedLineIdx].size;
    gMeme.lines[gMeme.selectedLineIdx].size = fontSize - 5
}

function setMemeTextMoveUp() {
    if (gMeme.lines.length === 0) return
    gMeme.lines[gMeme.selectedLineIdx].y -= 5;
}

function setMemeTextMoveDown() {
    if (gMeme.lines.length === 0) return
    gMeme.lines[gMeme.selectedLineIdx].y += 5;
}

function addLine() {
    var newLine = {
        text: '',
        size: 20,
        align: 'center',
        strokeColor: 'white',
        fillColor: 'black',
        font: 'IMPACT',
        x: 250,
        y: 250
    }
    gMeme.lines.push(newLine);
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function switchLine() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++
}

function deleteLine() {
    if (gMeme.lines.length === 0) return
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    if (gMeme.selectedLineIdx !== 0) {
        gMeme.selectedLineIdx--;
    }
}

function setAlignRight() {
    if (gMeme.lines.length === 0) return
    gMeme.lines[gMeme.selectedLineIdx].align = 'right'

} function setAlignCenter() {
    if (gMeme.lines.length === 0) return
    gMeme.lines[gMeme.selectedLineIdx].align = 'center'

} function setAlignLeft() {
    if (gMeme.lines.length === 0) return
    gMeme.lines[gMeme.selectedLineIdx].align = 'left'
}

function changeFont(font) {
    if (gMeme.lines.length === 0) return
    gMeme.lines[gMeme.selectedLineIdx].font = font;
}

function changeStrokeColor(color) {
    if (gMeme.lines.length === 0) return
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color;
}

function changeFillColor(color) {
    if (gMeme.lines.length === 0) return
    gMeme.lines[gMeme.selectedLineIdx].fillColor = color
}

function setSearchString(searchStr) {
    gFilterBy = searchStr
}

function setKeywordFontSize(keyword) {
    var idx = gKeywords.findIndex((currKeyord) => currKeyord.label === keyword)
    gKeywords[idx].fontSize += 2
}