from flask import Flask


app = Flask(__name__)

app.config["DEBUG"] = True

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)