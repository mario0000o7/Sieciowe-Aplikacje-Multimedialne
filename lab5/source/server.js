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
    
    function playVideoFunction() {
        document.getElementById("videoPlayer").play();
        
    }
    function pauseVideoFunction() {
        document.getElementById("videoPlayer").pause();
    }
    
    function moveRowUpFunction(element) {
    var table = document.getElementById("playlist_table");
    var row = element.parentNode.parentNode;
    var headerRow = table.rows[0];

    if (row.rowIndex === 1) {
        row.parentNode.insertBefore(row, table.rows[table.rows.length]);
    } else if (row.rowIndex > 1) {
        table.rows[row.rowIndex - 1].parentNode.insertBefore(row, table.rows[row.rowIndex - 1]);
    }
    
    resetIterator();
}
    function moveRowDownFunction(element) {
        var table = document.getElementById("playlist_table");
        var row = element.parentNode.parentNode;
        if (row.rowIndex === table.rows.length - 1) {
            row.parentNode.insertBefore(row, table.rows[0]);
        }
    
        var nextRow = table.rows[row.rowIndex + 1];
        table.tBodies[0].insertBefore(row, nextRow.nextSibling);
    
        resetIterator();
        
    }
    
    function resetIterator() {
        console.log("reset");
        var table = document.getElementById("playlist_table");
        for (var i = 1, row; row = table.rows[i]; i++) {
            row.cells[0].innerHTML = i;
        }
    }
    
    function removeRowFunction(element) {
        var table = document.getElementById("playlist_table");
        var row = element.parentNode.parentNode;
        table.deleteRow(row.rowIndex);
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
        cell4.innerHTML= '<button type="button" class="removeRowButton" onClick="removeRowFunction(this)" style="visibility: visible">Delete</button>' +
         '<button type="button class="moveRowUpButton" onClick="moveRowUpFunction(this)" style="visibility: visible">Up</button>' +
            '<button type="button class="moveRowDownButton" onClick="moveRowDownFunction(this)" style="visibility: visible">Dow</button>';
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
        cell4.innerHTML= '<button type="button" class="removeRowButton" onClick="removeRowFunction(this)" style="visibility: visible">Delete</button>' +
         '<button type="button class="moveRowUpButton" onClick="moveRowUpFunction(this)" style="visibility: visible">Up</button>' +
            '<button type="button class="moveRowDownButton" onClick="moveRowDownFunction(this)" style="visibility: visible">Dow</button>';
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
        cell4.innerHTML= '<button type="button" class="removeRowButton" onClick="removeRowFunction(this)" style="visibility: visible">Delete</button>' +
         '<button type="button class="moveRowUpButton" onClick="moveRowUpFunction(this)" style="visibility: visible">Up</button>' +
            '<button type="button class="moveRowDownButton" onClick="moveRowDownFunction(this)" style="visibility: visible">Dow</button>';
        liczba++;
    }
</script>
<html lang="pl">
<head>
    <title>Lab4</title>
    <meta charset="UTF-8">
    
</head>
    <video id="videoPlayer" width="320" height="240" ${videoQuery ? "" : "hidden"} controls src=${videoQuery} ></video>
    <button type="button" id="videoPlay" onclick="playVideoFunction()">Play Video</button>
    <button type="button" id="videoPause" onclick="pauseVideoFunction()">Pause Video</button>

        <br>
    	<audio id="audioPlayer" ${audioQuery ? "" : "hidden"} controls src=${audioQuery} ></audio>
    	<br>
    	<img id="posterImage" ${imgQuery ? "" : "hidden"} src=${imgQuery} >
    	<br>
        <button type="button" id="videoCancel" style="visibility: visible" onclick="videoCancelFunction()">VideoCancel</button>
        <button type="button" id="audioCancel" style="visibility: visible" onclick="audioCancelFunction()">AudioCancel</button>
        <br>
        <button type="button" id="audioAdd" onclick="addAudioRow()">Add audio</button>
        <button type="button" id="videoAdd" onclick="addVideoRow()">Add video</button>
        <button type="button" id="imgAdd" onclick="addImageRow()">Add image</button>
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