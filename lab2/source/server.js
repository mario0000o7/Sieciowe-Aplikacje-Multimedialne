const express = require('express')

const app = express()

let videoQuery
let audioQuery
let imgQuery

app.get('/', (req, res) => {
    videoQuery = req.query.videoFile;
    audioQuery = req.query.audioFile;
    imgQuery = req.query.imgFile;

    let html = `
<!DOCTYPE html>

<script>
    function videoCancelFunction() {
    document.getElementById("videoPlayer").src = "cancel.mp4";

    }
    function audioCancelFunction() {
        document.getElementById("audioPlayer").src = "cancel.mp3";
    }
</script>
<html>
<head>
    <title>Lab2</title>
</head>

    <video id="videoPlayer" width="320" height="240" controls src=${videoQuery}></video>
        <br>
    	<audio id="audioPlayer" controls src=${audioQuery}></audio>
    	<br>
    	<img id="posterImage" src=${imgQuery}>
    	<br>
        <button type="button" id="videoCancel" onclick="videoCancelFunction()">VideoCancel</button>
        <button type="button" id="audioCancel" onclick="audioCancelFunction()">AudioCancel</button>
</html>

`
res.send(html)

})

app.listen(4080)