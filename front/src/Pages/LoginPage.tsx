import { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.ts";
import { useNavigate } from "react-router-dom";

const ADMIN_EMAIL = import.meta.env.VITE_FIREBASE_ADMIN_EMAIL;

const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const isAdmin = ADMIN_EMAIL.includes(user.email || "");
                navigate(isAdmin ? "/admin" : "/");
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("ログイン失敗:", error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Googleログイン</h1>
            <button onClick={handleGoogleLogin}>Googleでログイン</button>
        </div>
    );
};

export default LoginPage;
