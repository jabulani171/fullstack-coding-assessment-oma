import {useState} from 'react';
import {useRouter} from 'next/router';

export default function Home() {
  let firstName = useState('');
  let lastname = useState('');
  let dateOfBirth = useState('');
  let filename = useState(null);
  let error = useState('');
  let router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(() => '')
  }

  //fields validation input
  if(!firstName || !lastname ||!dateOfBirth || !file)
  {
    setError('Please enter all the fields');
    return;
}

  const dateOfBirthRegex = /\d{4}-\d{2}-\d{2}/;

  if(!dateOfBirthRegex.test(dateOfBirth)){
    setError('Please enter a date of birth in this format (YYYY-MM-DD).';
    return;
  }

  const formData = new FormData();
  formData.append('filename',filename);
  formData.append('firstName',firstName);
  formData.append('lastName',lastName);
  formData.append('dateOfBirth',dateOfBirth)

  const handleSubmit = () => {
    fetch('http://localhost:5000/api/upload',{
      method:'POST',
      body: formData,
  })
    .then((response) => {
      if(!response.ok) {
        return Promise.reject(new Error('Failed to process the file.'));
      }
      retuern response.json();
    }).then((result) => {
      router.push({
        pathname: '/result',
        query: {data: JSON.stringfy(result) },
      });
    }).catch((err) => {
      setError('There was an issue uploading your file. Please check your file and upload again.');
    });
  };

  return ( 
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">User Input Details and File upload</h1>
    <form onSubmit={handleSubmit}>
    <div className="mb-4">
    <label>First Name</label>
    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
  required
    />
    </div>

        <div className="mb-4">
    <label>Last Name</label>
    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
  required
    />
    </div>

          <div className="mb-4">
    <label>Date Of Birth</label>
    <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}
  required
    />
    </div>

              <div className="mb-4">
    <label>Upload File (PDF/Image)</label>
    <input type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={(e) => setFile(e.target.files[0])}
  required
    />
    </div>

    <button type="submit"      className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Submnit Info</button>
    </form>
    )
  
}
