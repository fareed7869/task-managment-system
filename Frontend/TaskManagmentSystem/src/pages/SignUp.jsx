import { useState } from "react";
import * as yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import { signup } from "../services/api";

const SignUpPage = () => {
    const navigate = useNavigate();

    const [username, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const defaultValue = {
        username: "",
        email: "",
        password: "",
    };

    const validation = yup.object().shape({
        username: yup.string().required("Please enter your username").min(3),
        email: yup
            .string()
            .required("Please enter your email")
            .email("Enter valid email"),
        password: yup.string().required("Please enter your password").min(6),
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const submit = async () => {
        setLoading(true);
        try {
            const data = await signup(username, email, password);
            navigate("/login");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Signup failed");
            setTimeout(() => {
                setError(null);
            }, 1500);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-300">
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    <BeatLoader size={50} color="#38bdf8" loading={loading} />
                </div>
            )}

            <div className="w-full max-w-lg bg-gray-800 p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-8 text-white">
                    Sign Up
                </h1>

                {error && (
                    <div className="bg-red-500 text-white text-center py-2 mb-4 rounded">
                        {error}
                    </div>
                )}

                <Formik
                    initialValues={defaultValue}
                    validationSchema={validation}
                    onSubmit={submit}
                >
                    {({ handleChange }) => (
                        <Form>
                            <div className="mb-6">
                                <Field
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    onChange={(event) => {
                                        setUserName(event.target.value);
                                        handleChange(event);
                                    }}
                                    className="w-full px-4 py-3 bg-gray-700 text-gray-200 rounded-lg border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <p className="text-red-500 text-center mt-1 text-sm">
                                    <ErrorMessage name="username" />
                                </p>
                            </div>

                            <div className="mb-6">
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    onChange={(event) => {
                                        setEmail(event.target.value);
                                        handleChange(event);
                                    }}
                                    className="w-full px-4 py-3 bg-gray-700 text-gray-200 rounded-lg border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <p className="text-red-500 text-center mt-1 text-sm">
                                    <ErrorMessage name="email" />
                                </p>
                            </div>

                            <div className="mb-6 relative">
                                <Field
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                        handleChange(event);
                                    }}
                                    className="w-full px-4 py-3 bg-gray-700 text-gray-200 rounded-lg border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {password && (
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                )}
                                <p className="text-red-500 text-center mt-1 text-sm">
                                    <ErrorMessage name="password" />
                                </p>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
                            >
                                Sign Up
                            </button>
                        </Form>
                    )}
                </Formik>

                <p className="text-center text-gray-400 mt-6">
                    Already have an account?
                    <Link to="/login" className="text-blue-400 font-medium">
                        Login Here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;
