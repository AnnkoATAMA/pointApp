import { useEffect, useState } from "react";
import { auth } from "../firebase.ts";
import { getFirestore, collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    TextField,
    CircularProgress
} from "@mui/material";

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
    const [customPoints, setCustomPoints] = useState<number | null>(null);

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

    if (loading)
        return (
            <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress />
            </Container>
        );
    if (!isAdmin) return <Container><Typography variant="h6">管理者権限が必要です。</Typography></Container>;

    return (
        <Container maxWidth="md">
            <Box my={4} display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" fontWeight="bold">管理者専用ページ</Typography>
                <Button variant="contained" color="error" onClick={handleLogout}>ログアウト</Button>
            </Box>

            <Typography variant="h6">Username: {username}</Typography>
            <Typography variant="h6">Email: {userEmail}</Typography>

            <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Email</strong></TableCell>
                            <TableCell><strong>ポイント</strong></TableCell>
                            <TableCell><strong>操作</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.points}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={() => updatePoints(user.id, user.points + 100)}
                                        sx={{ mr: 1 }}
                                    >
                                        +100
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={() => updatePoints(user.id, user.points + 10)}
                                        sx={{ mr: 1 }}
                                    >
                                        +10
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => updatePoints(user.id, user.points - 10)}
                                        sx={{ mr: 1 }}
                                    >
                                        -10
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => updatePoints(user.id, user.points - 100)}
                                        sx={{ mr: 1 }}
                                    >
                                        -100
                                    </Button>
                                    <TextField
                                        type="number"
                                        label="カスタムポイント"
                                        variant="outlined"
                                        size="small"
                                        onChange={(e) => setCustomPoints(Number(e.target.value) || 0)}
                                        sx={{ width:100, mr: 1 }}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={async () => {
                                            if (customPoints !== null) {
                                                await updatePoints(user.id, user.points + customPoints);
                                            }
                                        }}
                                    >
                                        追加
                                    </Button>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default AdminPage;
