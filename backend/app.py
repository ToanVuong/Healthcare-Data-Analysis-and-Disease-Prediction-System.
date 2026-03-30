from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS
import os


# Khởi tạo Flask app
app = Flask(__name__)

# Kích hoạt CORS
CORS(app)

# Tải mô hình đã huấn luyện
model_path1 = os.path.join(os.path.dirname(__file__), 'heartV1.pkl')
with open(model_path1, 'rb') as model_file1:
    model1 = pickle.load(model_file1)

model_path2 = os.path.join(os.path.dirname(__file__), 'stroke.pkl')
with open(model_path2, 'rb') as model_file2:
    model2 = pickle.load(model_file2)

@app.route('/predict', methods=['POST'])
def predict_heart():
    try:
        data = request.json
        # Chuyển đổi dữ liệu từ React thành numpy array
        features = [
            data['age'], data['sex'], data['chestPain'],
            data['diastolicBP'], data['cholesterol'], data['bloodSugar'],
            data['ecg'], data['maxHeartRate'], data['chestPainSymptom'],
            data['stDepression'], data['stSlope'], data['numVessels'], data['thallium']
        ]
        features = np.array(features).reshape(1, -1)

        # Dự đoán
        prediction = model1.predict(features)[0]
        return jsonify({'prediction': int(prediction)})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/predict_stroke', methods=['POST'])
def predict_stroke():
    try:
        data = request.json
        
        # Chuyển đổi giá trị gender thành giá trị nhị phân
        if data['gender'] == 'Female':
            gender_Female = 1
            gender_Male = 0
        elif data['gender'] == 'Male':
            gender_Female = 0
            gender_Male = 1
        else:
            return jsonify({'error': 'Invalid gender value'}), 400
        
        # Chuyển đổi giá trị work_type thành giá trị nhị phân
        work_type_private = 0
        work_type_self_employed = 0
        work_type_govt_job = 0
        work_type_children = 0
        work_type_never_worked = 0

        if data['work_type'] == 'Private':
            work_type_private = 1
        elif data['work_type'] == 'Self-employed':
            work_type_self_employed = 1
        elif data['work_type'] == 'Govt_job':
            work_type_govt_job = 1
        elif data['work_type'] == 'Children':
            work_type_children = 1
        elif data['work_type'] == 'Never_worked':
            work_type_never_worked = 1
        else:
            return jsonify({'error': 'Invalid work_type value'}), 400

        # Chuyển đổi giá trị residence_type thành giá trị nhị phân
        residence_type_urban = 0
        residence_type_rural = 0

        if data['residence_type'] == 'Urban':
            residence_type_urban = 1
        elif data['residence_type'] == 'Rural':
            residence_type_rural = 1
        else:
            return jsonify({'error': 'Invalid residence_type value'}), 400

        # Chuyển đổi giá trị smoking_status thành giá trị nhị phân
        smoking_status_never_smoked = 0
        smoking_status_formerly_smoked = 0
        smoking_status_smokes = 0
        smoking_status_unknown = 0

        if data['smoking_status'] == 'Never_smoked':
            smoking_status_never_smoked = 1
        elif data['smoking_status'] == 'Formerly_smoked':
            smoking_status_formerly_smoked = 1
        elif data['smoking_status'] == 'Smokes':
            smoking_status_smokes = 1
        elif data['smoking_status'] == 'Unknown':
            smoking_status_unknown = 1
        else:
            return jsonify({'error': 'Invalid smoking_status value'}), 400

        # Chuyển đổi dữ liệu từ React thành numpy array
        features = [
            data['age'], gender_Female, gender_Male, data['hypertension'],
            data['heart_disease'], data['ever_married'], 
            work_type_private, work_type_self_employed, work_type_govt_job, 
            work_type_children, work_type_never_worked, 
            residence_type_urban, residence_type_rural, data['avg_glucose_level'], 
            data['bmi'], 
            smoking_status_never_smoked, smoking_status_formerly_smoked, 
            smoking_status_smokes, smoking_status_unknown
        ]
        features = np.array(features).reshape(1, -1)

        # Dự đoán
        prediction = model2.predict(features)[0]
        return jsonify({'prediction': int(prediction)})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True)
