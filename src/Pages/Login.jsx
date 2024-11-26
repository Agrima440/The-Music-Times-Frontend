import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FcGoogle } from 'react-icons/fc';
import { IoMailOutline, IoKeyOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { showToast } from '../utils/toast';

const Login = () => {
    
    const navigate =  useNavigate()
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!formData.email || !formData.password) {
                showToast('Registered Email/Password required', 'warning')
                return
            } else {
                const response = await axios.post('/api/user/login', formData);
                console.log(response.data);
                // Handle successful login (e.g., save token, redirect)

                if (response.data.success) {
                    showToast('Login Successful', 'success')
                                            navigate('/')

                    // setTimeout(() => {
                    //     navigate('/')
                    // }, 1000);

                    localStorage.setItem('username',response.data.user.name)
                } else {
                    showToast(response.data.message, 'warning')
                }
            }
        } catch (error) {
            console.log('Login failed:', error);
            // Handle login error
        }
    };

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo('.form-container',
            {
                y: 20,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out'
            }
        );
    }, []);

    return (
        <div className="min-h-screen bg-main dark:bg-black flex items-center justify-center">
            <div
                ref={formRef}
                className="relative w-full max-w-md"
            >

                {/* Form Container */}
                <form onSubmit={handleSubmit} className="form-container dark:bg-black/50 bg-gray-100 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/20 shadow-[0_0_25px_-5px_rgba(66,153,225,0.3)]">
                    <div className="space-y-2 mb-8">
                        <h2 className="text-3xl font-bold text-blue-400 text-center glow-text">
                            Welcome Back
                        </h2>
                        <p className="dark:text-blue-200/60 text-sm text-center">
                            Enter your credentials to access your account
                        </p>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-4 mb-6">
                        <div className="relative group">
                            <IoMailOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email address"
                                className="w-full dark:bg-black/50 dark:text-blue-100 rounded-xl px-11 py-3 outline-none focus:ring-2 focus:ring-blue-500/50 border border-blue-500/20 transition-all placeholder:text-blue-300/30 group-hover:border-blue-500/40"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative group">
                            <IoKeyOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full dark:bg-black/50 dark:text-blue-100 rounded-xl px-11 py-3 outline-none focus:ring-2 focus:ring-blue-500/50 border border-blue-500/20 transition-all placeholder:text-blue-300/30 group-hover:border-blue-500/40"
                            />
                        </div>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500/80 text-white font-medium rounded-xl py-3 transition-all hover:bg-blue-500 hover:shadow-[0_0_20px_-5px_rgba(66,153,225,0.9)] mb-6"
                    >
                        Sign In
                    </button>

                    {/* Google Login */}
                    <button className="w-full dark:bg-black/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-3 flex items-center justify-center gap-3 transition-all hover:bg-blue-500/10 group mb-6">
                        <FcGoogle size={22} className="group-hover:scale-110 transition-transform" />
                        <span className="dark:text-blue-100">Continue with Google</span>
                    </button>

                    {/* Links */}
                    <div className="flex items-center justify-between text-sm dark:text-blue-300/60">
                        <Link to="/forgot-password" className="hover:text-blue-600 rounded-lg hover:bg-blue-500/10 p-2 transition-colors">
                            Forgot password?
                        </Link>
                        <Link to="/signup" className="hover:text-blue-600 rounded-lg hover:bg-blue-500/10 p-2 transition-colors">
                            Create account
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
