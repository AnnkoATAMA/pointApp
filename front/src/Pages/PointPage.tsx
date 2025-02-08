import { useEffect, useState } from "react";
import { auth } from "../firebase.ts";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const db = getFirestore();

const getUserData = async (userId: string) => {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        return userSnap.data();
    } else {
        return { points: 0, email: "unknown@example.com", username: "ゲスト" };
    }
};

const saveUserToFirestore = async (userId: string, email: string, username: string) => {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        await setDoc(userRef, { email, username, points: 1000 });
    } else {
        await updateDoc(userRef, { email, username });
    }
};

const PointPage = () => {
    const [points, setPoints] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                const email = user.email || "unknown@example.com";
                const displayName = user.displayName || "ゲスト";

                await saveUserToFirestore(user.uid, email, displayName);

                const userData = await getUserData(user.uid);
                setUsername(userData.username);
                setUserEmail(userData.email);
                setPoints(userData.points);
            }
            setLoading(false);
        };
        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/signin");
        } catch (error) {
            console.error("ログアウト失敗:", error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>ポイント管理</h1>
            <p>Username : {username}</p>
            <p>Email : {userEmail}</p>
            <p>現在のポイント: {points !== null ? points : "取得失敗"}</p>
            <button onClick={handleLogout}>ログアウト</button>
        </div>
    );
};

export default PointPage;
