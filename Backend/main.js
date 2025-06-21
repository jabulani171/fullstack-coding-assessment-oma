const express = require('express');
const multer = require('multer');
var pdfParse = require('pdf-parse'); // using var instead of const
const Tesseract = require('tesseract.js');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
var port = 5000; // inconsistent var usage


app.use(cors({ origin: 'http://localhost:3000', methods: ['POST'], allowedHeaders: ['Content-Type'] }));
app.use(helmet());
app.use(express.json());

// File upload stuff
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB should be enough I think
});

// this function calculates how old someone is
function calculateUserAge(dateOfBirth) {
  var birthDate = new Date(dateOfBirth);
  var currentDate = new Date();
  var birthYear = birthDate.getFullYear();
  var birthMonth = birthDate.getMonth();
  var birthDay = birthDate.getDate();
  var currentYear = currentDate.getFullYear();
  var currentMonth = currentDate.getMonth();
  var currentDay = currentDate.getDate();

  var age = currentYear - birthYear;
  // check if birthday happened this year
  if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
    age = age - 1; // subtract 1 if birthday didn't happen yet
  }
  return age;
}

app.post('/api/upload', upload.single('file'), (req, res) => {
  const { firstName, lastName, dateOfBirth } = req.body;
  const file = req.file;

  // make sure everything is filled out
  if (!firstName || !lastName || !dateOfBirth || !file) {
    return res.status(400).json({
      error: 'Please fill all the fields and upload the file.',
    });
  }

  // check if date is correct format
  const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dobRegex.test(dateOfBirth)) {
    return res.status(400).json({
      error: 'Date of birth must be in this format: YYYY-MM-DD',
    });
  }

  var fullName = firstName + ' ' + lastName; // string concatenation instead of template literal
  var age = calculateUserAge(dateOfBirth);

  // handle different file types
  if (file.mimetype === 'application/pdf') {
    // process PDF files
    pdfParse(file.buffer)
      .then((pdfData) => {
        var extractedText = pdfData.text;
        res.json({
          fullName: fullName,
          age: age,
          extractedText: extractedText,
        });
      })
      .catch((err) => {
        console.log('PDF Error:', err); // using console.log instead of console.error
        res.status(500).json({ error: 'Failed to process the PDF.' });
      });
  } else if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
    // process images with OCR
    Tesseract.recognize(file.buffer, 'eng')
      .then((result) => {
        var extractedText = result.data.text;
        res.json({
          fullName: fullName,
          age: age,
          extractedText: extractedText,
        });
      })
      .catch((err) => {
        console.log('Image processing error:', err);
        res.status(500).json({ error: 'Failed to process the image.' });
      });
  } else {
    // unsupported file type
    return res.status(400).json({ error: 'Unsupported file type. Use PDF or image (PNG/JPEG).' });
  }
});

// start the server
app.listen(port, () => {
  console.log('Server is running on http://localhost:' + port);
});