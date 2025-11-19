import { useState } from 'react';
import axios from 'axios';

const Detect = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);


  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file');
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError('File size should be less than 10MB');
        return;
      }
      setImage(file);
      setError(null);
      setResult(null);
    }
  };

  // Upload image and start analysis
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError('Please upload a image first');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', image); // Key name should match backend

    try {
      // Step 1: Send image to backend for Deepware API processing
      const scanResponse = await axios.post('http://localhost:5050/api/deepware/scan', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const reportId = scanResponse.data['report-id'];
      const filePath = scanResponse.data['path'];

      await fetchScanResult(reportId, filePath);

      // // Step 2: Poll backend for scan result
      // await fetchScanResult(reportId);
    } catch (err) {
      setError(err.response?.data?.error || 'Error processing image');
      setLoading(false);
    }
  };


  // Function to poll Deepware API for scan results
  const fetchScanResult = async (reportId, path) => {
    try {
      const reportResponse = await axios.get(
        `http://localhost:5050/api/deepware/report/${reportId}?path=${encodeURIComponent(path)}`
      );

      const resultData = reportResponse.data;
      setResult(resultData);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching scan results");
    } finally {
      setLoading(false);
    }
  };
  // const fetchScanResult = async (reportId) => {
  //   try {
  //     let completed = false;
  //     let resultData = null;

  //     while (!completed) {
  //       const reportResponse = await axios.get(
  //         `http://localhost:5000/api/deepware/report/${reportId}`, // Fetch from backend
  //         {
  //           headers: { 'Content-Type': 'application/json' },
  //         }
  //       );

  //       resultData = reportResponse.data;
  //       completed = resultData.complete;

  //       if (!completed) {
  //         await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5s before retrying
  //       }
  //     }

  //     setResult(resultData);
  //   } catch (err) {
  //     setError(err.response?.data?.message || "Error fetching scan results");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-green-400 mb-8 text-center">
          Upload photo for Analysis
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
            <input
              type="file"
              accept="photo/*"
              onChange={handleFileChange}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer block">
              <div className="text-gray-400">
                {image ? image.name : 'Click to upload image'}
              </div>
              <div className="text-sm text-gray-500 mt-2">
                Supported formats: jPGE,PNG,ROW..
              </div>
              <div className="text-sm text-gray-500">Maximum size: 10MB</div>
            </label>
            
          {image && (
            <div className="mt-4 flex justify-center">
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="max-h-64 rounded-lg shadow-md border"
              />
            </div>
          )}</div> */}
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="image-upload"
            />

            {/* BEFORE UPLOAD → shows text */}
            {!image && (
              <label htmlFor="image-upload" className="cursor-pointer block">
                <div className="text-gray-400">Click to upload image</div>
                <div className="text-sm text-gray-500 mt-2">
                  Supported formats: JPG, PNG, RAW
                </div>
                <div className="text-sm text-gray-500">Maximum size: 10MB</div>
              </label>
            )}

            {/* AFTER UPLOAD → show only image */}
            {image && (
              <label htmlFor="image-upload" className="cursor-pointer block">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Uploaded preview"
                  className="w-full max-h-72 object-contain rounded-md"
                />
              </label>
            )}
          </div>


          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !image}
            className={`w-full py-3 px-4 rounded-md font-bold ${loading || !image
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
              } text-black transition-colors`}
          >
            {loading ? 'Processing...' : 'Analyze Photo'}
          </button>
        </form>

        {
          result && (
            <div className="mt-8 p-6 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-bold text-green-400 mb-4">
                Analysis Result
              </h3>
              <div className="text-gray-300">
                <p>Status: {result.status}</p>
                <p>Result: {result.result}</p>
                {/* <p>Confidence: {result.confidence}%</p> */}
                <p className="mb-2">
                  Accuracy: {result.confidence >= 50
                    ? (result.confidence).toFixed(2)
                    : ((100 - result.confidence)).toFixed(2)
                  }%
                </p>
              </div>
            </div>
          )
        }
      </div >
    </div >
  );
};

export default Detect;
