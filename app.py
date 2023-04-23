from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def grid():
    return render_template('grid.html')

if __name__ == '__main__':
    app.run(debug=True)
