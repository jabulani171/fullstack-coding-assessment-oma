import { useState } from 'react';
import { useRouter } from 'next/router';


export default function Home() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!firstName || !lastName || !dateOfBirth || !file) {
      setError('Please enter all the fields');
      return;
    }
    
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateOfBirth)) {
      setError('Date of birth must be in this format (YYYY-MM-DD)');
      return;
    }

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
    
      if (response.ok) {
        router.push({
          pathname: '/result',
          query: { data: JSON.stringify(result) },
        });
      } else {
      
        setError('There was an issue uploading your file.');
      }
    } catch (err) {
     
      console.log('Error occurred:', err); 
      setError('There was an issue uploading your file.');
    }
  };


  return (

    <div className="min-h-screen bg-black">
  
      <div className="bg-gradient-to-br from-black via-gray-900 to-black p-6 w-full h-screen flex flex-col items-center justify-center">
  
        <div className="bg-black/80 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-8 w-full max-w-lg shadow-2xl">
       
          <h1 className="text-3xl font-bold mb-8 text-center text-yellow-400 tracking-wide">
            User Information and File Upload
          </h1>
       
          <form onSubmit={handleSubmit} className="w-full">
         
            <div className="mb-6">
              <label className="block text-yellow-300 font-medium mb-2">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)} // Update state when user types
                className="w-full p-3 border border-yellow-500/50 rounded bg-gray-900 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all"
                required
              />
            </div>
        
            <div className="mb-6">
              <label className="block text-yellow-300 font-medium mb-2">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)} // Update state when user types
                className="w-full p-3 border border-yellow-500/50 rounded bg-gray-900 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all"
                required
              />
            </div>
           
            <div className="mb-6">
              <label className="block text-yellow-300 font-medium mb-2">Date of Birth (YYYY-MM-DD)</label>
              <input
                type="text"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full p-3 border border-yellow-500/50 rounded bg-gray-900 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all"
                required
              />
            </div>
         
            <div className="mb-6">
              <label className="block text-yellow-300 font-medium mb-2">Upload File</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])} 
                accept=".pdf,.png,.jpg,.jpeg" 
                className="w-full p-3 border border-yellow-500/50 rounded bg-gray-900 text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-yellow-500 file:text-black file:font-medium hover:file:bg-yellow-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all"
                required
              />
            </div>
           
            {error && (
              <p className="text-red-400 mb-6 p-3 bg-red-900/20 border border-red-500/30 rounded">
                {error}
              </p>
            )}
           
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-bold p-3 rounded hover:from-yellow-400 hover:to-yellow-300 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-yellow-500/25"
            >
              Submit Info
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}