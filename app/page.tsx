"use client"
import { FormEvent, useState } from "react"
import { useRouter } from 'next/navigation'

export default function Home() {
  //1. Create Initial UI.
  //2. Create State Variables.
  //3. Handle Form Fields changes.
  //4. Handle Form submission.
  //5. Create the API route logic (Post api/openai).
  //6. Calling API

  // #2
  // State variables for form fields
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    target: '',
  });
  const [loading, setLoading] = useState(false);
  const [openAIResponse, setOpenAIResponse] = useState<string>(""); //State variable for openai response 
  const router = useRouter();

  // #3
  // Event handler for form field changes
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // #4
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // prevent refreshing the page
    setLoading(true);

    const { name, description, target } = formData; // Access form data from state

    if (formData.name.trim() === '' || formData.description.trim() === '') {
      setLoading(false);
      alert('Please fill all form fields.');
      return;
    }

    // #6
    try {
      const apiRoute = '/api/openai';  // Adjust this based on your actual route
      const requestBody = {
        name: name,
        description: description,
        target: target,
      };

      const apiResponse = await fetch(apiRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      if (!apiResponse.ok) {
        if (apiResponse.status === 500) {
          // Internal Server Error
          alert('Internal Server Error. Please try again later.');
        } else {
          // Other errors
          alert('Failed to fetch data from Open AI API');
        }
        setLoading(false);
        return;
      }

      const responseData = await apiResponse.json();
      if(responseData?.error){
        alert('Failed to fetch data from Open AI API');
        setLoading(false);
      }else{
        localStorage.setItem("islamic-content", responseData.data);
        // setOpenAIResponse(responseData.data);
        // setLoading(false);
        router.push('/views/template',);
    }

    } catch (error) {
      console.error('Error fetching data:', error);
      alert('An error occurred! Please try again later.');
      setLoading(false);
    }
  }

  return (
    // #1
    // bg-black
    <div className="min-h-screen flex items-center justify-center text-md bg-[url('/images/islamic-bg.jpg')] bg-cover bg-center text-white">
      {/* bg-slate-800 */}
      <div className="bg-black/[.6] w-full max-w-2xl rounded-lg shadow-md p-8">
        <h2 className="text-xl font-bold mb-4">Create Islamic Content</h2>
        {/* p-8 text-center */}
        <div className="pb-4">
          <p>Once fill this data, will generate islamic content for you.</p>
        </div>

        <form onSubmit={(e) => handleSubmit(e)} >
          <div className="flex flex-col mb-8">
            <label htmlFor="name" className="mb-2 text-sm font-medium ">Name:</label>
            <input type="text" id="name" className="mb-2 p-2 text-md border rounded-md text-black"
              name="name" placeholder="Website Name" onChange={handleInputChange} />
            <label htmlFor="description" className="mb-2 text-sm font-medium ">Description:</label>
            <textarea rows={3} id="description" className="mb-2 p-2 text-md border rounded-md resize-none text-black"
              name="description" placeholder="Website Description..." onChange={handleInputChange}></textarea>
            <label htmlFor="target" className="mb-2 text-sm font-medium ">Target Users:</label>
            <input type="text" id="target" className="p-2 text-md border rounded-md text-black"
              name="target" onChange={handleInputChange} />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="p-2 bg-sky-600 rounded-md w-60">
              {!loading ?
                'Generate Islamic Content'
                :
                'Loading...'
              }
            </button>
          </div>
        </form>

        {openAIResponse !== "" ?
          <div className="pt-4">
            <h2 className="text-xl font-bold mb-2">AI Response</h2>
            <p className="">{openAIResponse}</p>
          </div>
          :
          null
        }
      </div>
    </div>
  )
}
