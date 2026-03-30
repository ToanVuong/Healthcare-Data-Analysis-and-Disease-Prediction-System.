// HeartDiseasePrediction.js
import React, { useState } from "react";
import Header from "./Header";
import "./Heart.css";
import explanations from './explanations.json';
import './Modal.css'; // Đảm bảo đã tạo file CSS cho modal


const Modal = ({ isOpen, closeModal, content }) => {
  if (!isOpen) return null;  // Không hiển thị modal nếu không được mở

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button onClick={closeModal} className="close-btn" style={{ color: 'red' }}>X</button>
        <div className="modal-content">
          <h3>Explain:</h3>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};
const HeartDiseasePrediction = () => {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    chestPain: '',
    diastolicBP: '',
    cholesterol: '',
    bloodSugar: '',
    ecg: '',
    maxHeartRate: '',
    chestPainSymptom: '',
    stDepression: '',
    stSlope: '',
    numVessels: '',
    thallium: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [result, setResult] = useState(null); // State để lưu kết quả
  const [error, setError] = useState(null); // State để lưu lỗi (nếu có)

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      age: document.getElementById('age').value,
      sex: document.getElementById('sex').value,
      chestPain: document.getElementById('chestPain').value,
      diastolicBP: document.getElementById('diastolicBP').value,
      cholesterol: document.getElementById('cholesterol').value,
      bloodSugar: document.getElementById('bloodSugar').value,
      ecg: document.getElementById('ecg').value,
      maxHeartRate: document.getElementById('maxHeartRate').value,
      chestPainSymptom: document.getElementById('chestPainSymptom').value,
      stDepression: document.getElementById('stDepression').value,
      stSlope: document.getElementById('stSlope').value,
      numVessels: document.getElementById('numVessels').value,
      thallium: document.getElementById('thallium').value,
    };
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (response.ok) {
        setPrediction(result.prediction); // Lưu kết quả dự đoán
        setError(null); // Xóa lỗi cũ (nếu có)
      } else {
        setError(result.error || 'Unknown error occurred');
        setPrediction(null); // Xóa dự đoán cũ (nếu có)
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      setPrediction(null); // Xóa dự đoán cũ (nếu có)
    }
  };
  const openModal = (key) => {
    setModalContent(explanations[key]);  // Lấy giải thích từ JSON theo key
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
    return (
      <div>
      <Header />
      <div className="container">
        <h1>Heart Disease Prediction</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
          <label htmlFor="age" onClick={() => openModal('age')} class="hover-label">Age:</label>
          <input type="number" id="age" value={formData.age} onChange={handleChange} required placeholder="Enter age" />
          </div>
    
          <div className="form-group">
          <label htmlFor="sex" onClick={() => openModal('sex')} class="hover-label">Gender:    
          </label>
          <select id="sex" value={formData.sex} onChange={handleChange} required>
            <option value="" selected>Please select</option>
            <option value="1">Male</option>
            <option value="0">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="chestPain" onClick={() => openModal('chestPain')} class="hover-label">Chest Pain:</label>
          <select id="chestPain" value={formData.chestPain} onChange={handleChange} required>
            <option value="" selected>Please select</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="diastolicBP" onClick={() => openModal('diastolicBP')} class="hover-label">Diastolic Blood Pressure:</label>
          <input type="number" id="diastolicBP" value={formData.diastolicBP} onChange={handleChange} required placeholder="Enter blood pressure" />
        </div>

        <div className="form-group">
          <label htmlFor="cholesterol" onClick={() => openModal('cholesterol')} class="hover-label">Blood Cholesterol:</label>
          <input type="number" id="cholesterol" value={formData.cholesterol} onChange={handleChange} required placeholder="Enter value" />
        </div>

        <div className="form-group">
          <label htmlFor="bloodSugar" onClick={() => openModal('bloodSugar')} class="hover-label">Blood Sugar:</label>
          <select id="bloodSugar" value={formData.bloodSugar} onChange={handleChange} required>
            <option value="" selected>Please select</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="ecg" onClick={() => openModal('ecg')} class="hover-label">ECG (0-2):</label>
          <select id="ecg" value={formData.ecg} onChange={handleChange} required>
            <option value="" selected>Please select</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="maxHeartRate" onClick={() => openModal('maxHeartRate')} class="hover-label">Maximum Heart Rate:</label>
          <input type="number" id="maxHeartRate" value={formData.maxHeartRate} onChange={handleChange} required placeholder="Enter heart rate" />
        </div>

        <div className="form-group">
          <label htmlFor="chestPainSymptom" onClick={() => openModal('chestPainSymptom')} class="hover-label">Angina Symptoms:</label>
          <select id="chestPainSymptom" value={formData.chestPainSymptom} onChange={handleChange} required>
            <option value="" selected>Please select</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="stDepression" onClick={() => openModal('stDepression')} class="hover-label">ST Depression:</label>
          <input type="number" id="stDepression" value={formData.stDepression} onChange={handleChange} required step="any" placeholder="Enter value" />
        </div>

        <div className="form-group">
          <label htmlFor="stSlope" onClick={() => openModal('stSlope')} class="hover-label">ST Slope:</label>
          <select id="stSlope" value={formData.stSlope} onChange={handleChange} required>
            <option value="" selected>Please select</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="numVessels" onClick={() => openModal('numVessels')} class="hover-label">Number of Narrowed Arteries:</label>
          <select id="numVessels" value={formData.numVessels} onChange={handleChange} required>
            <option value="" selected>Please select</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="thallium" onClick={() => openModal('thallium')} class="hover-label">Thallium:</label>
          <select id="thallium" value={formData.thallium} onChange={handleChange} required>
            <option value="" selected>Please select</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
    
          <div className="submit-btn">
            <button type="submit">Submit</button>
          </div>
        </form>
        {/* Hiển thị modal */}
      <Modal isOpen={isModalOpen} closeModal={closeModal} content={modalContent} />
      </div>
      <div className="container">
  <h2>Diagnosis Results:</h2>
  <div className="result">
  {prediction !== null && (
    <p style={{ color: prediction === 1 ? "red" : "green" }}>
      {prediction === 1 ? "Heart Disease" : "No Heart Disease"}
    </p>
  )}
  {prediction !== null && (
  <img
    src={prediction === 1 ? "/images/aleart.png" : "/images/healthy.png"}
    alt={prediction === 1 ? "Heart Disease" : "No Heart Disease"}
    style={{ width: "300px", height: "300px" }} // Tùy chỉnh kích thước hình ảnh nếu cần
  />
)}
  {error && <p style={{ color: 'red' }}>{error}</p>}
</div>
    </div>
    </div>
    );
};

export default HeartDiseasePrediction;
