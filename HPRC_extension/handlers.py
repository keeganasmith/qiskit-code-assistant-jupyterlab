# my_extension/handlers.py
from jupyter_server.base.handlers import APIHandler
from tornado import web
import json

class HelloHandler(APIHandler):
    @web.authenticated
    def get(self):
        # You can access query args via self.get_argument(...)
        name = self.get_argument("name", default="world")
        # And respond with JSON automatically:
        self.finish({"message": f"Hello, {name}!"})

    @web.authenticated
    def post(self):
        # Read JSON body
        body = self.get_json_body()
        # Do something with body…
        self.finish({"received": body})
