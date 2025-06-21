# My Fullstack Project - File Upload Thing

Hey! This is my fullstack coding assessment project. It's a web app where you can upload files and it extracts text from them. Pretty cool right?

## What it does

So basically, you enter your name and birthday, then upload a file (PDF or image), and it tells you how old you are and shows the text from your file. I used OCR for images which is like magic or something.

## Technologies I used

**Frontend:**
- Next.js (React but better I guess)
- Tailwind CSS (makes things look pretty)
- Some other React stuff

**Backend:**
- Node.js 
- Express (for the server)
- A bunch of npm packages for file stuff
- Tesseract for the OCR thing (took me forever to figure out)

## How to run it

### Backend first

1. Go to the backend folder:
```bash
cd backend
```

2. Install the stuff:
```bash
npm install
npm install express multer pdf-parse tesseract.js cors helmet
```
(I know I should have a proper package.json but whatever)

3. Start it:
```bash
node main.js
```

It should say "Server is running on http://localhost:5000" or something like that.

### Frontend 

1. Go to frontend folder:
```bash
cd frontend  
```

2. Install more stuff:
```bash
npm install
```

3. Run it:
```bash
npm run dev
```

Now go to http://localhost:3000 and it should work!

## How to use it

1. Make sure both servers are running (backend and frontend)
2. Open your browser and go to localhost:3000
3. Fill out the form:
   - Put your first name
   - Put your last name  
   - Put your birthday like this: YYYY-MM-DD (I made it strict because date parsing is confusing)
   - Upload a file (PDF or image, not too big though)
4. Click submit and wait
5. It should show your info and the text from your file

## File structure

```
project/
├── backend/
│   └── main.js (all the server code)
├── frontend/
│   └── pages/
│       ├── index.js (the main page)
│       └── result.js (results page)
└── README.md (this file lol)
```

## API stuff

There's one endpoint: POST /api/upload

You send it:
- firstName 
- lastName
- dateOfBirth (YYYY-MM-DD format)
- file (the uploaded file)

It gives you back:
```json
{
  "fullName": "Your Name",
  "age": 25,
  "extractedText": "whatever text it found"
}
```

## Things I learned

- OCR is really slow sometimes
- PDF parsing is easier than I thought
- Multer is pretty neat for file uploads
- CORS was giving me headaches at first
- Tailwind is actually really nice once you get used to it

## Issues I know about

- Big images take forever to process (Tesseract is slow)
- Some PDFs don't work great
- Error messages could be better
- I'm using var and const inconsistently (oops)
- The UI could use some work but it looks decent

## TODO (if I had more time)

- [ ] Better error handling
- [ ] Progress bars or loading spinners  
- [ ] Support more file types
- [ ] Make it look even better
- [ ] Add tests (I know I should have done this)
- [ ] Fix my inconsistent coding style
- [ ] Maybe add a database?

## Notes

This was my first time doing OCR stuff and it's pretty cool! The hardest part was getting all the file processing to work correctly. Also Tesseract takes like 30 seconds sometimes so don't worry if it's slow.

I tried to make it look professional with the dark theme and yellow colors. Let me know if anything doesn't work!

## Running into problems?

Make sure:
- Both servers are running
- You're using the right ports (3000 for frontend, 5000 for backend)
- Your file isn't too big (I set limit to 5MB)
- Date format is exactly YYYY-MM-DD

If it still doesn't work, check the console for errors. I put console.log everywhere so you should see what's happening.

---

Thanks for checking out my project! 🚀
