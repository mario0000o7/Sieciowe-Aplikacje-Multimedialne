#!/usr/bin/env python3
import http.server
import socketserver
import requests
import os

#print('source code for "http.server":', http.server.__file__)

class web_server(http.server.SimpleHTTPRequestHandler):
    
    def do_GET(self):

        print(self.path)
        
        if self.path == '/':
            self.protocol_version = 'HTTP/1.1'
            self.send_response(200)
            self.send_header("Content-type", "text/html; charset=UTF-8")
            self.end_headers()
            data=requests.get('http://localhost:4080/')
            self.wfile.write(b"Hello World!\n")
            # get url from json
            json_data = requests.get('http://localhost:4080/').json()
            # get video file from url
            url=json_data["videoFile"].split('=')[1]
            print(url)
            self.wfile.write(f'<video src="{url}" controls></video>'.encode('utf-8'))
        else:
            super().do_GET()
    
# --- main ---

PORT = 4080

print(f'Starting: http://localhost:{PORT}')

tcp_server = socketserver.TCPServer(("",PORT), web_server)
tcp_server.serve_forever()
