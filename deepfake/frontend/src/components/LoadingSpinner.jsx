const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-solid"></div>
        <p className="ml-4 text-lg">Loading...</p>
    </div>
);

export default LoadingSpinner;
