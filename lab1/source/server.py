#!/usr/bin/env python3
import http.server
import socketserver
import os

#print('source code for "http.server":', http.server.__file__)

class web_server(http.server.SimpleHTTPRequestHandler):
    
    def do_GET(self):



        #get url from videoFile tag
        if self.path[0] == '/':
            self.protocol_version = 'HTTP/1.1'
            self.send_response(200)
            self.send_header("Content-type", "text/html; charset=UTF-8")
            self.end_headers()
            f1=self.path.find("videoFile=")
            f2=self.path.find("audioFile=")
            url_video=self.path[f1]
            url_audio=self.path[f2]
            if f1!=-1:
                self.wfile.write(f'<video width="320" height="240" controls><source src="{url_video}" type="video/mp4"></video>'.encode('utf-8'))
            if f2!=-1:
                self.wfile.write(f'<audio controls><source src="{url_audio}" type="audio/mpeg"></audio>'.encode('utf-8'))


        else:
            super().do_GET()
    
# --- main ---

PORT = 4080

print(f'Starting: http://localhost:{PORT}')

tcp_server = socketserver.TCPServer(("",PORT), web_server)
tcp_server.serve_forever()
