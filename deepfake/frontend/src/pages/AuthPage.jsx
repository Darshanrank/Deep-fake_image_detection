// import React, { useState } from 'react';
// import { FaGoogle, FaFacebook, FaApple, FaGithub } from 'react-icons/fa';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const AuthPage = () => {
//     const { login } = useAuth();
//     const navigate = useNavigate();

//     const [isSignUp, setIsSignUp] = useState(false); // Toggle between Login & Signup
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const [loading, setLoading] = useState(false);

//     const toggleAuthMode = () => {
//         setIsSignUp(!isSignUp);
//         setError('');   // Clear errors when switching
//         setSuccess(''); // Clear success message when switching
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');
//         setSuccess('');

//         const endpoint = isSignUp
//             ? 'http://localhost:5000/api/auth/signup'
//             : 'http://localhost:5000/api/auth/login';

//         try {
//             const response = await fetch(endpoint, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email, password }),
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.message || 'Something went wrong!');
//             }

//             if (isSignUp) {
//                 // Signup Success - Ask user to verify email
//                 setSuccess('Account created! Please check your email for verification.');
//             } else {
//                 // Successful Login - Store token and navigate
//                 localStorage.setItem('token', data.token);
//                 setSuccess('Login successful!');
//                 setTimeout(() => {
//                     login();  // Set authentication state
//                     navigate('/'); // Redirect to homepage
//                 }, 1500);
//             }
//         } catch (err) {
//             console.log("check");
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-[#0D1117] text-white">
//             <div className="w-full max-w-md p-8 space-y-6 bg-[#161B22] rounded-lg shadow-lg border border-gray-700">
//                 <h2 className="text-3xl font-bold text-center">
//                     {isSignUp ? 'Create Account' : 'Welcome Back!'}
//                 </h2>
//                 <p className="text-center text-gray-400">
//                     {isSignUp
//                         ? 'Create an account to continue'
//                         : 'Sign in to your account'}
//                 </p>

//                 {/* Form */}
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="Enter your email"
//                         className="w-full px-4 py-2 bg-[#0D1117] border border-gray-600 rounded-md focus:outline-none focus:border-green-500"
//                         required
//                     />
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         placeholder="Enter your password"
//                         className="w-full px-4 py-2 bg-[#0D1117] border border-gray-600 rounded-md focus:outline-none focus:border-green-500"
//                         required
//                     />

//                     {/* Success & Error Messages */}
//                     {error && <p className="text-red-400 text-sm">{error}</p>}
//                     {success && <p className="text-green-400 text-sm">{success}</p>}

//                     {/* Continue Button */}
//                     <button
//                         type="submit"
//                         className={`w-full py-2 rounded-md transition ${
//                             loading
//                                 ? 'bg-green-400 cursor-not-allowed'
//                                 : 'bg-green-500 hover:bg-green-600'
//                         }`}
//                         disabled={loading}
//                     >
//                         {loading
//                             ? (isSignUp ? 'Creating Account...' : 'Signing In...')
//                             : (isSignUp ? 'Sign Up' : 'Login')}
//                     </button>
//                 </form>

//                 {/* Social Login Options */}
//                 <div className="flex items-center justify-center space-x-4 mt-4">
//                     <button className="p-3 bg-[#0D1117] border border-gray-600 rounded-full hover:bg-[#161B22] transition">
//                         <FaGoogle size={20} />
//                     </button>
//                     <button className="p-3 bg-[#0D1117] border border-gray-600 rounded-full hover:bg-[#161B22] transition">
//                         <FaFacebook size={20} />
//                     </button>
//                     <button className="p-3 bg-[#0D1117] border border-gray-600 rounded-full hover:bg-[#161B22] transition">
//                         <FaApple size={20} />
//                     </button>
//                     <button className="p-3 bg-[#0D1117] border border-gray-600 rounded-full hover:bg-[#161B22] transition">
//                         <FaGithub size={20} />
//                     </button>
//                 </div>

//                 {/* Toggle Link */}
//                 <p className="text-center text-gray-400 text-sm">
//                     {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
//                     <span
//                         className="text-green-500 cursor-pointer"
//                         onClick={toggleAuthMode}
//                     >
//                         {isSignUp ? 'Sign In' : 'Sign Up'}
//                     </span>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default AuthPage;
import React, { useState } from 'react';
import { FaGoogle, FaFacebook, FaApple, FaGithub, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);  // <-- NEW

    const toggleAuthMode = () => {
        setIsSignUp(!isSignUp);
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const endpoint = isSignUp
            ? 'http://localhost:5000/api/auth/signup'
            : 'http://localhost:5000/api/auth/login';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: "include",   
            });
            

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong!');
            }

            if (isSignUp) {
                setSuccess('Account created! Please check your email for verification.');
            } else {
                localStorage.setItem('token', data.token);
                setSuccess('Login successful!');
                setTimeout(() => {
                    login();
                    navigate('/');
                }, 1500);
            }
        } catch (err) {
            console.log("check");
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0D1117] text-white">
            <div className="w-full max-w-md p-8 space-y-6 bg-[#161B22] rounded-lg shadow-lg border border-gray-700">
                <h2 className="text-3xl font-bold text-center">
                    {isSignUp ? 'Create Account' : 'Welcome Back!'}
                </h2>
                <p className="text-center text-gray-400">
                    {isSignUp ? 'Create an account to continue' : 'Sign in to your account'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 bg-[#0D1117] border border-gray-600 rounded-md focus:outline-none focus:border-green-500"
                        required
                    />

                    {/* 👁️ Password with eye toggle */}
                    <div className="relative">
                        <input
                            type={showPassword ? "password" : "text"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 bg-[#0D1117] border border-gray-600 rounded-md focus:outline-none focus:border-green-500"
                            required
                        />
                        <span
                            className="absolute right-3 top-3 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </span>
                    </div>

                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    {success && <p className="text-green-400 text-sm">{success}</p>}

                    <button
                        type="submit"
                        className={`w-full py-2 rounded-md transition ${loading
                                ? 'bg-green-400 cursor-not-allowed'
                                : 'bg-green-500 hover:bg-green-600'
                            }`}
                        disabled={loading}
                    >
                        {loading
                            ? (isSignUp ? 'Creating Account...' : 'Signing In...')
                            : (isSignUp ? 'Sign Up' : 'Login')}
                    </button>
                </form>

                <div className="flex items-center justify-center space-x-4 mt-4">
                    <button
                        onClick={() => window.location.href = "http://localhost:5000/auth/google"}
                        className="p-3 bg-[#0D1117] border border-gray-600 rounded-full hover:bg-[#161B22] transition"
                    >
                        <FaGoogle size={20} />
                    </button>

                    <button className="p-3 bg-[#0D1117] border border-gray-600 rounded-full hover:bg-[#161B22] transition">
                        <FaFacebook size={20} />
                    </button>
                    <button className="p-3 bg-[#0D1117] border border-gray-600 rounded-full hover:bg-[#161B22] transition">
                        <FaApple size={20} />
                    </button>
                    <button className="p-3 bg-[#0D1117] border border-gray-600 rounded-full hover:bg-[#161B22] transition">
                        <FaGithub size={20} />
                    </button>
                </div>

                <p className="text-center text-gray-400 text-sm">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <span className="text-green-500 cursor-pointer" onClick={toggleAuthMode}>
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;
