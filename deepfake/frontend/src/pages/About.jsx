const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-green-400 mb-8 text-center">
          About DeepFake Detector
        </h2>

        <div className="space-y-6 text-gray-300">
          <p>
            Our DeepFake Detector is a cutting-edge tool designed to help identify manipulated photos
            and protect against digital deception. Using advanced neural network algorithms, we analyze
            photos to detect whether it is real or AI genrated.
          </p>

          <h3 className="text-xl font-bold text-green-400 mt-8">How It Works</h3>
          <p>
            The detection process involves analyzing various aspects of the photo, including:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Facial consistency and natural movement patterns</li>
            {/* <li>Audio-visual synchronization</li> */}
            <li>Texture and lighting consistency</li>
            <li>Artifact detection in manipulated regions</li>
          </ul>

          <h3 className="text-xl font-bold text-green-400 mt-8">Technology</h3>
          <p>
            We use deep learning models trained on extensive datasets of both
            authentic and manipulated photos. Our system combines multiple detection techniques
            to provide accurate and reliable results.
          </p>

          <h3 className="text-xl font-bold text-green-400 mt-8">Privacy & Security</h3>
          <p>
            We take your privacy seriously. All uploaded photos are processed securely and are not
            stored permanently on our servers. The analysis is performed in real-time, and your
            data is protected using industry-standard security measures.
          </p>

          <h3 className="text-xl font-bold text-green-400 mt-8">Credits</h3>
          <p>
            This project was developed by <span className="font-bold">Darshan Rank</span> & <span className="font-bold">Raj Savaliya</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
