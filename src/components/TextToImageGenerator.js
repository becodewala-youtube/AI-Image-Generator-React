// Importing necessary libraries and modules
import React, { useState, useEffect } from 'react'; // React library and specific hooks
import axios from 'axios'; // Axios for making HTTP requests
import "@fontsource/poppins"; // Poppins font

// Defining a functional component called TextToImageGenerator
const TextToImageGenerator = () => {
  // Defining state variables
  const [text, setText] = useState(''); // State for storing the input text
  const [images, setImages] = useState([]); // State for storing the generated images
  const [loading, setLoading] = useState(false); // State for loading status
  const [currentIndex, setCurrentIndex] = useState(0); // State for tracking the current index of images to display
  const [buttonText, setButtonText] = useState('Random Image Generate'); // State for button text

  // useEffect hook to update button text based on input text
  useEffect(() => {
    setButtonText(text ? 'Generate Image' : 'Random Image Generate');
  }, [text]); // Dependency array with text to re-run effect when text changes

  // Function to generate images based on the input text
  const generateImage = async () => {
    setLoading(true); // Set loading to true when the function starts
    const options = {
      method: 'POST', // HTTP method
      url: 'https://ai-image-generator3.p.rapidapi.com/generate', // API endpoint
      headers: {
        'x-rapidapi-key': '57630eb2e9msh0fd6988580150d8p11329djsn06950a67782b', // API key
        'x-rapidapi-host': 'ai-image-generator3.p.rapidapi.com', // API host
        'Content-Type': 'application/json' // Content type of the request
      },
      data: {
        prompt: text, // Data payload with the input text
        page: 1 // Page number for the API request
      }
    };

    try {
      const response = await axios.request(options); // Await the API response
      console.log('API Response:', response); // Log the API response
      setImages(response.data.results.images); // Set the images state with the API response
      setCurrentIndex(0); // Reset the current index
    } catch (error) {
      console.error('Error generating image:', error); // Log any errors
    } finally {
      setLoading(false); // Set loading to false when the function ends
    }
  };

  // Function to load more images
  const loadMoreImages = () => {
    setCurrentIndex(currentIndex + 4); // Increase the current index by 4
  };

  // JSX for rendering the component
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Text to Image Generator</h1>
      <div className="flex flex-col items-center">
        <textarea
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded mb-4 outline-none"
          rows="3"
          placeholder="Enter text to generate your Image..."
          value={text} // Bind the textarea value to the text state
          onChange={(e) => setText(e.target.value)} // Update text state on change
        ></textarea>
        <button
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          style={{ fontFamily: 'Poppins, sans-serif' }}
          onClick={generateImage} // Call generateImage function on click
          disabled={loading} // Disable button if loading is true
        >
          {loading ? 'Generating...' : buttonText} {/* Conditional button text */}
        </button>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.slice(0, currentIndex + 4).map((image, index) => ( // Map over images to display them
            <img key={index} src={image} alt={`Generated ${index}`} className="max-w-full rounded shadow-lg" />
          ))}
        </div>
        {currentIndex + 4 < images.length && ( // Show 'Generate More' button if there are more images to display
          <button
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-6"
            onClick={loadMoreImages} // Call loadMoreImages function on click
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

// Export the TextToImageGenerator component as default
export default TextToImageGenerator;
