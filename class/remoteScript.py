print("Starting Robot")

import os

true = True
false = False

motor_path = "/sys/class/tacho-motor/"

import base64

def handle_command(path):
  command = path.split('/')
  if (len(command) == 3 and command[1] == "bash"):
    coded = command[2]
    print(coded)
    decoded = base64.b64decode(coded.encode("ascii")).decode("ascii")
    print(decoded)
    output = os.popen(decoded).read()
    print(output)
    return output
  return ""

#
# Code originally from @mdonkers
# Source: https://gist.github.com/mdonkers/63e115cc0c79b4f6b8b3a6b797e485c7
#
# It has been modified
#

from http.server import BaseHTTPRequestHandler, HTTPServer

class S(BaseHTTPRequestHandler):
    def _set_response(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def do_GET(self):
        self._set_response()
        self.wfile.write(format(handle_command(self.path)).encode('utf-8'))

    def do_POST(self):
        content_length = int(self.headers['Content-Length']) # <--- Gets the size of data
        post_data = self.rfile.read(content_length) # <--- Gets the data itself

        self._set_response()
        self.wfile.write("POST request for {}".format(self.path).encode('utf-8'))

def run(server_class=HTTPServer, handler_class=S, port=8080):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print('Starting httpd...\n')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
    print('Stopping httpd...\n')

if __name__ == '__main__':
    from sys import argv

    if len(argv) == 2:
        run(port=int(argv[1]))
    else:
        run()