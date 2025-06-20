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
  formData.append('',filename);
  formData.append('',firstName);
  formData.append('',lastName);
  formData.append('dateOfBirth',dateOfBirth)
  

