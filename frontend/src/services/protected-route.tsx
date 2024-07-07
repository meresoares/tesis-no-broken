// src/components/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../services/auth-service';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children, redirectTo }: { children: JSX.Element, redirectTo: string }) => {
    console.log('ProtectedRoute is rendering');
    
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isAllowed, setIsAllowed] = useState(false);
    const API_BASE_URL = 'http://localhost:3001/api';


    useEffect(() => {
        const checkUserStatus = async () => {
            if (!user) {
                console.log('No user found, redirecting to login');
                navigate('/');
                return;
            }

            try {
                console.log('Checking user status for user:', user.uid);
                const response = await axios.get(`${API_BASE_URL}/persons/${user.uid}`);
                if (response.status === 200) {
                    console.log('User data:', response.data);

                    

                    if (response.data.completedPersonalData) {
                        if (response.data.completedTest) {
                            setIsAllowed(true);
                            setIsLoading(false);
                        } else {
                            console.log('User has not completed the test, redirecting to /test-page');
                            navigate('/test-page');
                        }
                    } else {
                        console.log('User has not completed personal data, redirecting to /user-page');
                        navigate('/user-page');
                    }
                }
            } catch (error) {
                console.error('Error checking user status:', error);
                navigate('/');
            }
        };

        checkUserStatus();
    }, [user, navigate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isAllowed ? children : <div>Not allowed</div>;
};

export default ProtectedRoute;
