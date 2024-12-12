import React from 'react'
import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader, Loader2, Lock, Mail, MessageCircleCodeIcon, MessageSquare, Target, User } from 'lucide-react';
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern"
import toast from 'react-hot-toast';

const SignupPage = () => {
    const [showPass, setShowPass] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });
    const { signup, isSignup } = useAuthStore();

    const validateForm = () => {
        if (!formData.fullName.trim()) {
            return toast.error("Full name is required");
        }
        if (!formData.email.trim()) {
            return toast.error("Email is required");
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            return toast.error("Invalid Email format");
        }
        if (!formData.password.trim()) {
            return toast.error("Password is required");
        }
        if (formData.password.length < 6) {
            return toast.error("Password must be at least 6 Charecters");
        }

        return true;
    }
    const handelSubmit = (e) => {
        e.preventDefault();
        const success = validateForm();
        if (success === true) {
            signup(formData);
        }
    }
    return (
        <div className="h-screen overflow-y-hidden grid lg:grid-cols-2">
            {/* left side of window */}
            <div className="flex flex-col justify-start items-center h-fit pt-5 mt-10 ">
                <div className="w-full max-w-md space-y-8 px-5">

                    {/* logo */}

                    <div className="text-center mb-2">
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center gorup-hover:bg-primary/20 transition-colors">
                                <MessageCircleCodeIcon className="size-6 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
                            <p className="text-base-content/60">Get started with your free account</p>
                        </div>
                    </div>
                    {/* form */}
                    <form onSubmit={handelSubmit} className="space-y-6">
                        <div className="form-control p-0">
                            <label className="label pb-1 pt-0 ">
                                <span className="label-text font-medium">Full Name</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type="text"
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="John Doe"
                                    value={formData.fullName} // This should now work without error
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>

                        </div>
                        <div className="form-control">
                            <label className="label pb-1 pt-0">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type="text"
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="johndoe@mail.com"
                                    value={formData.email} // This should now work without error
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label pb-1 pt-0">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type={showPass ? "text" : "password"}
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="********"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center "
                                    onClick={() => { setShowPass(!showPass) }}
                                >
                                    {showPass ? (
                                        <EyeOff className="size-5 text-base-content/40" />
                                    ) : (
                                        <Eye className="size-5 text-base-content/40" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary w-full" disabled={isSignup}>
                            {isSignup ? (
                                <>
                                    <Loader2 className="size-5 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>

                    </form>
                    <div className="text-center pb-0 pt-0 h-2 mb-11">
                        <p className="text-base-content/60">
                            Already have an account?{" "}
                            <Link to="/login" className="link link-primary">
                                Sign in
                            </Link>
                        </p>

                    </div>
                </div>
            </div>
            {/* right side */}
            <AuthImagePattern
                title="Join our comunity"
                subtitle="Connect with friends, share moments , And stay in touch with your loved one."
            />
        </div>
    )
}

export default SignupPage
