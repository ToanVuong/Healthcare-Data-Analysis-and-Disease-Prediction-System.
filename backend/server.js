const express = require('express');
const { PythonShell } = require('python-shell');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Cài đặt middleware
app.use(cors());
app.use(bodyParser.json());

// Định nghĩa route cho việc chẩn đoán
app.post('/predict', (req, res) => {
    const data = req.body;

    // Chạy Python script để thực hiện dự đoán
    PythonShell.run('predict_model.py', { args: [JSON.stringify(data)] }, (err, result) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        
        // Trả lại kết quả dự đoán từ Python script
        const prediction = JSON.parse(result[0]);
        return res.json(prediction);
    });
});

// Định nghĩa route cho việc chẩn đoán bệnh đột quỵ
app.post('/predict_stroke', (req, res) => {
    const data = req.body;

    // Đường dẫn Python nếu sử dụng môi trường ảo
    const options = {
        pythonPath: 'path/to/your/python',  // Đường dẫn đến Python nếu sử dụng môi trường ảo
        args: [JSON.stringify(data)]
    };

    // Chạy Python script để thực hiện dự đoán bệnh đột quỵ
    PythonShell.run('predict_stroke_model.py', options, (err, result) => {
        if (err) {
            return res.status(500).send({ error: `Error: ${err.message}` });
        }

        try {
            // Kiểm tra và phân tích dữ liệu trả về từ Python script
            const prediction = JSON.parse(result[0]);
            return res.json(prediction);
        } catch (parseError) {
            return res.status(500).send({ error: `Parsing Error: ${parseError.message}` });
        }
    });
});


// Lắng nghe trên cổng 5000
app.listen(5000, () => {
    console.log('Server running at http://localhost:5000');
});
