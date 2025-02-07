import { GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
import { auth } from "../firebase.ts";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const credential: UserCredential = await signInWithPopup(auth, provider);
            console.log("Googleでログインしました:", credential.user?.displayName);
            navigate("/welcome");
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
