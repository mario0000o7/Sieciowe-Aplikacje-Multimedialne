const express = require('express')

const app = express();

let videoQuery= "";
let audioQuery= "";
let imgQuery= "";

app.get('/', (req, res) => {
    if (req.query.videoFile == null)
        videoQuery=""
    else
        videoQuery = req.query.videoFile;
    if (req.query.audioFile == null)
        audioQuery=""
    else
        audioQuery = req.query.audioFile;
    if (req.query.imgFile == null)
        imgQuery=""
    else
        imgQuery = req.query.imgFile;

    let html = `
<!DOCTYPE html>

<script>
    var liczba = 1;
    window.onload = function() {
    let visibleAudio = document.getElementById("audioCancel").style.visibility;
    let visibleVideo = document.getElementById("videoCancel").style.visibility;
    
    if (visibleAudio==="hidden"||visibleAudio==="")
        document.getElementById("audioAdd").style.visibility = "hidden";
    if (visibleVideo==="hidden"||visibleVideo==="")
        document.getElementById("videoAdd").style.visibility = "hidden";
    };
    function videoCancelFunction() {
    document.getElementById("videoPlayer").src = "cancel.mp4";

    }
    function audioCancelFunction() {
        document.getElementById("audioPlayer").src = "cancel.mp3";
    }
    
    function resetIterator() {
        var table = document.getElementById("playlist_table");
        for (var i = 1, row; row = table.rows[i]; i++) {
            row.cells[0].innerHTML = i;
        }
    }
    
    function removeRowFunction(index) {
        var table = document.getElementById("playlist_table");
        table.deleteRow(index);
        liczba--;
        resetIterator();
    }
    
    
    function addVideoRow(){
        var table = document.getElementById("playlist_table");
        var row = table.insertRow(liczba);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML= liczba;
        cell2.innerHTML= document.getElementById("videoPlayer").getAttribute("src")
        cell3.innerHTML= "Video";
        cell4.innerHTML= '<button type="button" class="removeRowButton" style="visibility: visible">Delete</button>';
        liczba++;
    }
    function addAudioRow(){
        var table = document.getElementById("playlist_table");
        var row = table.insertRow(liczba);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML= liczba;
        cell2.innerHTML= document.getElementById("audioPlayer").getAttribute("src");
        cell3.innerHTML= "Audio";
        cell4.innerHTML= '<button type="button" class="removeRowButton" style="visibility: visible">Delete</button>';
        liczba++;
       
    }
    function addImageRow(){
        var table = document.getElementById("playlist_table");
        var row = table.insertRow(liczba);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML= liczba;
        cell2.innerHTML= document.getElementById("posterImage").getAttribute("src");
        cell3.innerHTML= "Image";
        cell4.innerHTML= '<button type="button" class="removeRowButton" style="visibility: visible">Delete</button>';
        liczba++;
    }
</script>
<html lang="pl">
<head>
    <title>Lab2</title>
    <meta charset="UTF-8">
    
</head>

    <video id="videoPlayer" width="320" height="240" controls src=${videoQuery}></video>
        <br>
    	<audio id="audioPlayer" controls src=${audioQuery}></audio>
    	<br>
    	<img id="posterImage" src=${imgQuery}>
    	<br>
        <button type="button" id="videoCancel" style="visibility: visible" onclick="videoCancelFunction()">VideoCancel</button>
        <button type="button" id="audioCancel" style="visibility: visible" onclick="audioCancelFunction()">AudioCancel</button>
        <br>
        <button type="button" id="audioAdd" onclick="addAudioRow()">Add audio</button>
        <button type="button" id="videoAdd" onclick="addVideoRow()">Add video</button>
        <button type="button" id="imageAdd" onclick="addImageRow()">Add image</button>
        <table id="playlist_table">
        <th>No.</th>
        <th>URL</th>
        <th>Type</th>
        <th>Action</th>
        
        </table>
</html>

`
    res.send(html)

})

app.listen(4080)