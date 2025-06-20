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

const upload = multer({ storage: multer.memoryStorage(), 
                       limits: {fileSize: 5 * 1024 * 1024},
                      });

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

    
