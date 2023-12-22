from flask import Flask, render_template, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017')
db = client['Data']
collection = db['visual']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data')
def get_data():
    data_from_db = list(collection.find({}, {'_id': 0}))  # Exclude _id field
    return jsonify(data_from_db)

if __name__ == '__main__':
    app.run(debug=True)
