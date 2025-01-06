"use client"
import { LoginService } from '@/lib/services/admin';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { LuUserRound, LuLockKeyhole } from "react-icons/lu";
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
const Page = () => {
    const formInit = {
        loginIdentifier: "",
        password: "",
    };

    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState(formInit);
    const [errors, setErrors] = useState({});
    const router = useRouter()
    const handleChange = ({ target }) => {
        const { name, value } = target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async () => {
        try {
            const { loginIdentifier, password } = formData;
            let hasError = false;
            const newErrors = {};
            setIsLoading(true)
            // Validation
            if (!loginIdentifier.trim()) {
                newErrors.loginIdentifier = "Email ID is required.";
                hasError = true;
            }
            if (!password.trim()) {
                newErrors.password = "Password is required.";
                hasError = true;
            }

            if (hasError) {
                setErrors(newErrors);
                return;
            }

            const res = await LoginService(formData)
            Cookies.set('x_a_t', res.token);
            toast.success(res?.message || "login success");
            setTimeout(() => {
                router.replace('/')
            }, 1000)

        } catch (error) {
            toast.error(error?.response?.data.message);
            setIsLoading(false)
        }
    };

    return (
        <Container>
            <div className='login-section'>
                <div className="form">
                    <div className='title'> Event<span>Hub</span></div>
                    <div className="sub-title">Login</div>

                    <div className="input-section-group">
                        <div className="input-section">
                            <span className='icon'>
                                <LuUserRound />
                            </span>
                            <input
                                type="text"
                                placeholder='Email ID'
                                value={formData?.loginIdentifier}
                                name='loginIdentifier'
                                onChange={handleChange}
                            />
                        </div>
                        {errors.loginIdentifier && (
                            <div className="error-message">{errors?.loginIdentifier}</div>
                        )}
                    </div>

                    <div className="input-section-group">
                        <div className="input-section">
                            <span className='icon'>
                                <LuLockKeyhole />
                            </span>
                            <input
                                type="password"
                                placeholder='Password'
                                value={formData?.password}
                                name='password'
                                onChange={handleChange}
                            />
                        </div>
                        {errors.password && (
                            <div className="error-message">{errors.password}</div>
                        )}
                    </div>

                    <div className="action">
                        {
                            isLoading ? <>
                                <button type='button' disabled>Login <span className="spinner-border spinner-border-sm  ms-2 text-light" role="status"></span></button>
                            </> : <>
                                <button type='button' onClick={handleSubmit}>Login</button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Page;
