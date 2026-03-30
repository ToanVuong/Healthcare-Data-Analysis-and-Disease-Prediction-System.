// StrokePrediction.js
import React, { useState } from "react";
import Header from "./Header";
import "./Stroke.css";
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
const StrokePrediction = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    hypertension: '',
    heart_disease: '',
    ever_married: '',
    work_type: '',
    residence_type: '',
    avg_glucose_level: '',
    bmi: '',
    smoking_status: ''
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
    e.preventDefault(); // Ngăn hành vi mặc định của form


    try {
        // Gửi yêu cầu POST tới endpoint predict_stroke
        const response = await fetch('http://localhost:5000/predict_stroke', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData) // Chuyển đổi dữ liệu thành chuỗi JSON
        });

        // Xử lý kết quả trả về từ server
        const result = await response.json();
        if (response.ok) {
            setPrediction(result.prediction); // Lưu kết quả dự đoán
            setError(null); // Đặt lại lỗi nếu trước đó có
        } else {
            setError(result.error || 'Unknown error occurred'); // Hiển thị lỗi từ server
            setPrediction(null); // Xóa dự đoán cũ
        }
    } catch (error) {
        // Bắt lỗi nếu kết nối hoặc yêu cầu thất bại
        setError('An error occurred. Please try again.');
        setPrediction(null);
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
        <h1>Stroke Prediction</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
          <label htmlFor="age" onClick={() => openModal('age')} class="hover-label">Age:</label>
          <input type="number" id="age" value={formData.age} onChange={handleChange} required placeholder="Enter age" />
          </div>
    
        <div className="form-group">
          <label htmlFor="gender" onClick={() => openModal('gender')} class="hover-label">Gender:</label>
          <select id="gender" value={formData.gender} onChange={handleChange} required>
          <option value="" selected>Please select</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="hypertension" onClick={() => openModal('hypertension')} class="hover-label">Hypertension:</label>
          <select id="hypertension" value={formData.hypertension} onChange={handleChange} required>
            <option value="" selected>Please select</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
            
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="heart_disease" onClick={() => openModal('heart_disease')} class="hover-label">Heart Disease:</label>
          <select id="heart_disease" value={formData.heart_disease} onChange={handleChange} required>
            <option value="" selected>Please select</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="ever_married" onClick={() => openModal('ever_married')} class="hover-label">Ever Married:</label>
          <select id="ever_married" value={formData.ever_married} onChange={handleChange} required>
            <option value="" selected>Please select</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="smoking_status" onClick={() => openModal('smoking_status')} class="hover-label">Smoking Status:</label>
          <select id="smoking_status" value={formData.smoking_status} onChange={handleChange} required>
          <option value="" selected>Please select</option>
          <option value="Never_smoked">Never Smoked</option>
          <option value="Formerly_smoked">Formerly Smoked</option>
          <option value="Smokes">Smokes</option>
          <option value="Unknown">Unknown</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="work_type" onClick={() => openModal('work_type')} class="hover-label">Work Type:</label>
          <select id="work_type" value={formData.work_type} onChange={handleChange} required>
            <option value="" selected>Please select</option>
            <option value="Private">Private</option>
            <option value="Self-employed">Self-employed</option>
            <option value="Govt_job">Government Job</option>
            <option value="Children">Children</option>
            <option value="Never_worked">Never Worked</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="residence_type" onClick={() => openModal('residence_type')} class="hover-label">Resident Type:</label>
          <select id="residence_type" value={formData.residence_type} onChange={handleChange} required>
          <option value="" selected>Please select</option>
          <option value="Rural">Rural</option>
          <option value="Urban">Urban</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="bmi" onClick={() => openModal('bmi')} class="hover-label">BMI:</label>
          <input type="number" id="bmi" value={formData.bmi} onChange={handleChange} required step="any" placeholder="Enter value" />
        </div>

        <div className="form-group">
          <label htmlFor="residence_type" onClick={() => openModal('avg_glucose_level')} class="hover-label">AVG Glucose Level:</label>
          <input type="number" id="avg_glucose_level" value={formData.avg_glucose_level} onChange={handleChange} required step="any" placeholder="Enter value"/>
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
      {prediction === 1 ? "You are at risk of having a stroke" : "You are not at risk of having a stroke"}
    </p>
  )}
  {prediction !== null && (
  <img
    src={prediction === 1 ? "/images/aleart_stroke.png" : "/images/healthy.png"}
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

export default StrokePrediction;
