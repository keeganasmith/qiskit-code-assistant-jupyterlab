# my_extension/extension.py
from jupyter_server.utils import url_path_join
from .handlers import HelloHandler

def load_jupyter_server_extension(server_app):
    web_app = server_app.web_app
    base   = web_app.settings["base_url"]
    host   = ".*$"

    # Build the full path: /<base_url>/api/my_ext/hello
    route = url_path_join(base, "api", "my_extension", "hello")
    handlers = [
        (route, HelloHandler),
    ]
    web_app.add_handlers(host, handlers)
    server_app.log.info(f"Registered HTTP handler at {route}")