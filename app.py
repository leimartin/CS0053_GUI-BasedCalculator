# CS0053 - Technical 1 Source Code for 1T AY 2023-2024
'''
    Program:        GUI-Based Calculator
    Programmer(s): 
                    Vassili L. Inacay
                    Katryna Lei V. Martin (L)
    Section:        AN31
    Start Date:     September 14, 2023
    End Date:       September 16, 2023
'''

from flask import Flask, request, render_template

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/calculate", methods=["POST"])
def calculate():
    expression = request.form["expression"]
    try:
        result = str(eval(expression))
        return result
    except Exception as ex:
        return str(ex)


if __name__ == "__main__":
     app.run(debug=True, host='127.0.0.1', port=5000)