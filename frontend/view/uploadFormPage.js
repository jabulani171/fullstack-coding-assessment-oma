import {useState} from 'react';
import {useRouter} from 'next/router';

export default function Home() {
  let firstName = useState('');
  let lastname = useState('');
  let dateOfBirth = useState('');
  let file = useState(null);
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

  

