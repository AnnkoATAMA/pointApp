import { useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.ts";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) navigate("/");
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

    return (
        <div>
            <h1>Googleログインテスト</h1>
            <button onClick={handleGoogleLogin}>Googleでログイン</button>
        </div>
    );
};

export default LoginPage;
