import Button from './Button';

const HeroSection = () => {
    return (
        <section className="bg-gradient-to-b from-gray-700 via-blue-700 to-black text-white text-center py-20 px-6">
            <h2 className="text-5xl font-extrabold text-green-400 mb-4">
                Advanced DeepFake Detection
            </h2>
            <p className="text-lg mb-6">
                Protect yourself from digital deception with our state-of-the-art detection technology.
                Upload your video and get instant analysis powered by advanced AI.
            </p>
            <Button 
                label="Start Detection" 
                className="bg-green-500 hover:bg-green-600 hover:shadow-green-400/50 shadow-lg transition-transform transform hover:scale-105 px-6 py-3 rounded-md"
                onClick={() => alert("Redirecting to detection page...")}
            />
        </section>
    );
};

export default HeroSection;
