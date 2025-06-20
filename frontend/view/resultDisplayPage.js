import {useRouter} from 'next/router';

export default function Result() {
  const router =useRouter();
  const {data} = router.query

  let output;
  if(data)
  {
    output=JSON.parse(data);
}
  else
  {
    output = null;
  }

if(!output)
{
  return <div className="min-h-screen bg-gray-100 flex items-center justify-center">No data found</div>
}

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Processed Information</h1>

  <div className="mb-4">
    <h2>Full Name</h2>
  <p>output.fullName</p>
    </div>

  <div className="mb-4">
    <h2>Full Name</h2>
  <p>output.age</p>
    </div>

    <div className="mb-4">
    <h2>Age</h2>
  <p>output.fullName</p>
    </div>
  )
