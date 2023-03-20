const express = require('express')

const app = express()
function videoCancelFunction() {

}
app.get('/', (req, res) => {
    let videoQuery = req.query.videoFile;
    let audioQuery = req.query.audioFile;
    let imgQuery = req.query.imgFile;
    res.send(`<video id="videoPlayer" width="320" height="240" controls src=${videoQuery}></video>
    	<audio id="audioPlayer" controls src=${audioQuery}></audio>
    	<img id="posterImage" src=${imgQuery}>
        <button type="button" id="videoCancel" onclick="">VideoCancel</button>

`
    )
})

app.listen(4080)