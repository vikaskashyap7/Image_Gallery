// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./App.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // fetch images using axios
  const fetchImages = async (query = "nature") => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: { query, per_page: 18 },
          headers: {
            Authorization: `Client-ID 1KKHCyCoSCS5XrjgtMSpJkDLIue0VDlDObygM56QXts`,
          },
        }
      );
      // console.log(response.data.results);
      setImages(response.data.results);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);
 
  // search button
  const handleSearch = (e) => {
    e.preventDefault();
    fetchImages(searchTerm);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 ">
      <header className="text-center mb-6">
        {/* header */}
        <h1 className="md:text-4xl text-2xl font-bold mb-4 uppercase">Image Gallery</h1>
        {/* Search Bar */}
          <form class="flex items-center max-w-lg mx-auto" onSubmit={handleSearch}>   
              <label for="voice-search" class="sr-only">Search</label>
              <div class="relative w-full">
                  <input type="text" id="voice-search" value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)} class="text-sm rounded-lg border focus:border-blue-500 block w-full ps-7 p-2.5  dark:text-black " placeholder="Search Mockups, Logos, Design Templates..." required />
              </div>
              <button type="submit" class="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>Search
              </button>
          </form>

      </header>
      {/* main content */}
      <div className=" w-11/12 mx-auto">
        {loading ? (
          <motion.div
            className="text-center text-xl font-semibold text-gray-600"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            Loading...
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 ">
            {images.map((image) => (
              <motion.div
                key={image.id}
                className="rounded-lg overflow-hidden shadow-md cursor-pointer  h-[95%] "
                whileHover={{ scale: 0.9, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)" }}
                onClick={() => setSelectedImage(image)}
              >
                <img src={image.urls.small} alt={image.alt_description} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50  "
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-lg  w-[85%]  md:w-8/12  overflow-hidden flex  md:flex-row flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedImage.urls.regular} alt={selectedImage.alt_description} className=" md:w-[45%] " />
            <div className="p-4 flex  flex-col items-center justify-center md:gap-5">
              <h2 className="md:text-xl font-bold mb-2 uppercase">
                Tittle :- {selectedImage.alt_description || "Untitled"}
              </h2>
              <p className="text-gray-700 mb-1">By: {selectedImage.user.name}</p>
              <p className="text-gray-700">
               <span className=" text-black">Description :</span> {selectedImage.description || "No description available."}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default App;


