import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold text-green-400 mb-6">
          Advanced DeepFake Detection
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Protect yourself from digital deception with our state-of-the-art detection technology.
          Upload your image and get instant analysis powered by advanced neural network.
        </p>
        <Link
          to="/detect"
          className="bg-green-500 text-black font-bold py-3 px-8 rounded-md hover:bg-green-600 transition-colors inline-block"
        >
          Start Detection
        </Link>
      </section>

      <section className="grid md:grid-cols-3 gap-8 py-12">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-green-400 mb-4">Real-time Analysis</h3>
          <p className="text-gray-300">
            Get instant results with our advanced neural network-powered detection system.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-green-400 mb-4">High Accuracy</h3>
          <p className="text-gray-300">
            Our model achieves state-of-the-art accuracy in detecting deepfakes.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-green-400 mb-4">Easy to Use</h3>
          <p className="text-gray-300">
            Simple interface for uploading and analyzing images in seconds.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home; 