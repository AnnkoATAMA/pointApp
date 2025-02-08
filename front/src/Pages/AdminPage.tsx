import { useEffect, useState } from "react";
import { auth } from "../firebase.ts";
import { getFirestore, collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const db = getFirestore();
const ADMIN_EMAIL = import.meta.env.VITE_FIREBASE_ADMIN_EMAIL;

const getUserPoints = async (userId: string) => {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        return userSnap.data().points;
    } else {
        return 0;
    }
};

const AdminPage = () => {
    const [users, setUsers] = useState<{ id: string; email: string; points: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            const user = auth.currentUser;
            if (!user) {
                navigate("/signin");
                return;
            }

            setUsername(user.displayName || "ゲスト");
            setUserEmail(user.email || "");
            setIsAdmin(user.email === ADMIN_EMAIL);

            if (user.email === ADMIN_EMAIL) {

                const usersCollection = collection(db, "users");
                const usersSnapshot = await getDocs(usersCollection);
                const usersData = await Promise.all(
                    usersSnapshot.docs.map(async doc => ({
                        id: doc.id,
                        email: doc.data().email ?? "unknown",
                        points: await getUserPoints(doc.id),
                    }))
                );
                setUsers(usersData);
            }
            setLoading(false);
        };
        fetchUsers();
    }, [navigate]);

    const updatePoints = async (userId: string, newPoints: number) => {
        try {
            const userRef = doc(db, "users", userId);
            await updateDoc(userRef, { points: newPoints });

            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.id === userId ? { ...user, points: newPoints } : user
                )
            );
        } catch (error) {
            console.error("ポイント更新エラー:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/signin");
        } catch (error) {
            console.error("ログアウト失敗:", error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!isAdmin) return <div>管理者権限が必要です。</div>;

    return (
        <div>
            <h1>管理者専用ページ</h1>
            <p>Username : {username}</p>
            <p>Email : {userEmail}</p>
            <button onClick={handleLogout}>ログアウト</button>
            <table>
                <thead>
                <tr>
                    <th>Email</th>
                    <th>ポイント</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.email}</td>
                        <td>{user.points}</td>
                        <td>
                            <button onClick={() => updatePoints(user.id, user.points + 10)}>+10</button>
                            <button onClick={() => updatePoints(user.id, user.points - 10)}>-10</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;
