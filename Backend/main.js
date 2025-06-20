const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parser');
const Tesseract = require('tesseract.js');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors({origin: 'http://localhost:3000',methods: ['POST'],
              allowedHeaders: ['Content-Type'] }));
app.use(helmet());
app.use(express.json());

//File size
const upload = multer({ storage: multer.memoryStorage(), 
                       limits: {fileSize: 5 * 1024 * 1024},
                      });


//Calculate age and return the number 
function calculateUserAge(dateOfBirth) {
    const birthDate = new Date(dateOfBirth);

    const currentDate =  new Date();

    const birthYear =  birthDate.getFullYear();
        const birthMonth =  birthDate.getMonth();
    const birthDay = birthDate.getDate();

       const currentYear =  currentDate.getFullYear();
        const currentMonth =  currentDate.getMonth();
    const currentDay = currentDate.getDate();

    let age = currentYear - birthYear

    return age;
}

app.post('',upload.single('file',(req,res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const dateOfBirth = req.body.dateOfBirth;
  const file= req.file;
})
         
if (!firstName || !lastName || !dob || !file) {
  res.status(400)json({
    error: 'Please fill all the fields and upload the file.'
  });
  return;
}

  // Use the regex to test the dob value
  const isValidFormat = dobRegex.test(dateOfBirth);

  if (!isValidFormat) {
    // If the format is wrong, send an error message
    res.status(400).json({
      error: 'Date of birth must be in this format: YYYY-MM-DD'
    });
    return; // Stop the function
  }

  const dobParts = dob.split('-');
  const year = dobParts[0];
  const month = dobParts[1];
  const day = dobParts[2];


  const now = new Date();
  const isoString = now.toISOString();
  const dateParts = isoString.split('T');
  const today = dateParts[0];

  const fullName = firstName + ' ' + lastName;


const age = calculateAge(dateOfBirth);

//Extract data from the uploded file .pdf/.jpeg/jpg/png
if (req.file.mimetype === 'application/pdf') {
  // If the file is a PDF
  pdfParse(req.file.buffer, function (err, pdfData) {
    if (err) {
      console.error('Error processing PDF:', err);
      return res.status(500).json({ error: 'Failed to process the PDF.' });
    }

   
    const extractedText = pdfData.text;


    res.json({
      fullName: fullName,
      age: age,
      extractedText: extractedText,
    });
  });
} else if (req.file.mimetype === 'image/png' || req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/jpg') {

  Tesseract.recognize(req.file.buffer, 'eng', function (err, result) {
    if (err) {
      console.error('Error processing image:', err);
      return res.status(500).json({ error: 'Failed to process the image.' });
    }

   
    const extractedText = result.data.text;

  
    res.json({
      fullName: fullName,
      age: age,
      extractedText: extractedText,
    });
  });
} else {

  return res.status(400).json({ error: 'Unsupported file type. Use PDF or image (PNG/JPEG).' });
}

// Server start
app.listen(port, function() {
  console.log('Server is running on http://localhost:' + port);
});


