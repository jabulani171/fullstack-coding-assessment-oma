import { useRouter } from 'next/router';
import Link from 'next/link';


export default function Result() {
  const router = useRouter();
  const { data } = router.query;
  let parsedData = null;


  try {
    parsedData = data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error parsing data:', error); 
  }


  return (
   
    <div className="min-h-screen bg-black">
      
      <div className="bg-gradient-to-br from-black via-gray-900 to-black p-6 w-full h-screen flex flex-col items-center justify-center">
    
        <div className="bg-black/80 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-8 w-full max-w-2xl shadow-2xl">
    
          <h1 className="text-3xl font-bold mb-8 text-center text-yellow-400 tracking-wide">
            Details of the user and the file uploaded
          </h1>
      
          {parsedData ? (
            <div className="text-center space-y-6">
          
              <div className="bg-gray-900/50 border border-yellow-500/20 rounded-lg p-6">
              
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            
                  <div className="space-y-4">
                  
                    <div className="flex flex-col">
                      <span className="text-yellow-300 font-medium text-sm uppercase tracking-wider">Full Name</span>
                      <span className="text-white text-lg font-semibold mt-1">{parsedData.fullName}</span>
                    </div>
              
                    <div className="flex flex-col">
                      <span className="text-yellow-300 font-medium text-sm uppercase tracking-wider">Age</span>
                      <span className="text-white text-lg font-semibold mt-1">{parsedData.age}</span>
                    </div>
                  </div>
           
                  <div className="md:col-span-1">
                    <div className="flex flex-col">
                      <span className="text-yellow-300 font-medium text-sm uppercase tracking-wider">Extracted Text</span>
                     
                      <div className="text-white text-sm mt-2 p-3 bg-black/30 rounded border border-yellow-500/10 max-h-32 overflow-y-auto">
                        {parsedData.extractedText || 'No text extracted'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          
              <Link
                href="/"
                className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-bold px-6 py-3 rounded hover:from-yellow-400 hover:to-yellow-300 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-yellow-500/25"
              >
                Return to Home Page
              </Link>
            </div>
          ) : (
            // Show this if no data is available
            <div className="text-center">
              <p className="text-yellow-300 text-lg mb-6">No data found or invalid data.</p>
         
              <Link
                href="/"
                className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-bold px-6 py-3 rounded hover:from-yellow-400 hover:to-yellow-300 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-yellow-500/25"
              >
                Return to Home Page
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
