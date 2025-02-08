import { useEffect, useState } from "react";
import { auth } from "../firebase.ts";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Stack,
} from "@mui/material";

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

    if (loading) return (
        <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
        </Container>
    );

    return (
        <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
            <Card sx={{ p: 2, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        ポイント管理
                    </Typography>
                    <Stack spacing={2}>
                        <Typography variant="h6">Username: {username}</Typography>
                        <Typography variant="h6">Email: {userEmail}</Typography>
                        <Typography variant="h5">
                            現在のポイント:{" "}
                            <strong>{points !== null ? points : "取得失敗"}</strong>
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleLogout}
                        >
                            ログアウト
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Container>
    );
};

export default PointPage;
