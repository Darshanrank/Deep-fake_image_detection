const FeaturesSection = () => {
    const features = [
        { title: "High Accuracy", description: "Our advanced AI model achieves industry-leading accuracy in detecting manipulated videos." },
        { title: "Real-Time Analysis", description: "Get instant results with our efficient processing system and detailed confidence scores." },
        { title: "User-Friendly", description: "Simple upload process and clear visualization of results make detection accessible to everyone." }
    ];

    return (
        <section className="bg-black text-white py-12">
            <h3 className="text-3xl text-green-400 text-center font-bold mb-8">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
                {features.map((feature, index) => (
                    <div 
                        key={index}
                        className="bg-gray-700 text-center p-6 rounded-md shadow-md hover:shadow-lg hover:scale-105 transition-transform"
                    >
                        <h4 className="text-xl font-bold">{feature.title}</h4>
                        <p className="text-sm mt-2">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturesSection;
