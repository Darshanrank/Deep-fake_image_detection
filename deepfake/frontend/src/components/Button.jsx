const Button = ({ label, className, onClick }) => {
    return (
        <button 
            className={`text-black font-bold py-2 px-4 rounded-md ${className}`} 
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default Button;
