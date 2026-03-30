import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile">
      <img src="/logo192.png" alt="Profile" className="profile-pic" />
      <h2>Hello, everyone! </h2>
      <div className="text">
      <p >We are a team of two members: <b>Vuong Minh Toan</b> and <b>Tran Nguyen Huan</b>. Our mission is to revolutionize healthcare by harnessing the power of technology. We developed this web app to predict heart disease, diabetes, and breast cancer because we recognize the importance of early diagnosis in saving lives. With the increasing prevalence of these conditions, we wanted to create a tool that empowers individuals and healthcare professionals to make informed decisions sooner. Our vision is to continuously expand the app's capabilities to diagnose a wider range of diseases, ultimately contributing to better health outcomes and a brighter future for people everywhere.</p>
      </div>
      
      <div className="cards-container">
      <div className="card">
        <img src="/images/heart-icon.png" alt="Heart Icon" className="card-icon" />
        <h3>Heart Disease Prediction</h3>
        <p>
        Heart disease is one of the leading causes of death and disability globally, affecting millions of lives each year. Early prediction of cardiovascular conditions is a cornerstone of clinical data analysis, offering a crucial opportunity to intervene before it's too late. By leveraging advanced technology and data-driven insights, we can detect potential risks early, empowering both individuals and healthcare professionals to make informed decisions that can ultimately save lives and improve long-term health outcomes.
        </p>
        <a href="/heart" className="learn-more">Learn More</a>
      </div>    

      <div className="card">
        <img src="/images/stroke.png" alt="Breast Cancer Icon" className="card-icon" />
        <h3>Stroke Prediction</h3>
        <p>
        Stroke prediction involves using medical data and machine learning models to assess the likelihood of a person experiencing a stroke. Stroke is a serious medical condition that occurs when the blood supply to part of the brain is interrupted, leading to brain cell damage. By analyzing various risk factors such as age, gender, blood pressure, cholesterol levels, smoking status, diabetes, heart disease, and other health indicators, predictive models can help identify individuals at higher risk of having a stroke. Early detection through predictive modeling allows for timely interventions, such as lifestyle changes, medication, or regular monitoring, to reduce the likelihood of stroke and its devastating effects. Stroke prediction plays a crucial role in preventive healthcare and improving patient outcomes.
        </p>
        <a href="/stroke" className="learn-more">Learn More</a>
        </div>
    </div>
    </div>
  );
};

export default Profile;
