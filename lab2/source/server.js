const express = require('express')

const app = express()

let videoQuery
let audioQuery
let imgQuery
function videoCancelFunction(res) {
    videoQuery="cancel.mp4"
    res.send(`<video id="videoPlayer" width="320" height="240" controls src=${videoQuery}></video>
    	<audio id="audioPlayer" controls src=${audioQuery}></audio>
    	<img id="posterImage" src=${imgQuery}>`
    )

}
function audioCancelFunction(res) {
    audioQuery="cancel.mp3"
    res.send(`<video id="videoPlayer" width="320" height="240" controls src=${videoQuery}></video>
    	<audio id="audioPlayer" controls src=${audioQuery}></audio>
    	<img id="posterImage" src=${imgQuery}>`
    )
}
app.get('/', (req, res) => {
    videoQuery = req.query.videoFile;
    audioQuery = req.query.audioFile;
    imgQuery = req.query.imgFile;
    res.send(`<video id="videoPlayer" width="320" height="240" controls src=${videoQuery}></video>
    	<audio id="audioPlayer" controls src=${audioQuery}></audio>
    	<img id="posterImage" src=${imgQuery}>
        <button type="button" id="videoCancel" onclick="videoCancelFunction(res)">VideoCancel</button>
        <button type="button" id="audioCancel" onclick="audioCancelFunction(res)">AudioCancel</button>

`
    )
})

app.listen(4080)