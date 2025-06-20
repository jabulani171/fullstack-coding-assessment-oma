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
