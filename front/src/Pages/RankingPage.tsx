import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useTheme } from "@mui/material/styles";
import {Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Box} from "@mui/material";

const db = getFirestore();

const RankingPage = () => {
    const [users, setUsers] = useState<{ id: string; username: string; points: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();

    useEffect(() => {
        const fetchUsers = async () => {
            const usersCollection = collection(db, "users");
            const usersSnapshot = await getDocs(usersCollection);
            const usersData = usersSnapshot.docs.map(doc => ({
                id: doc.id,
                username: doc.data().username || "ゲスト",
                points: doc.data().points || 0,
            }));

            usersData.sort((a, b) => b.points - a.points);
            setUsers(usersData);
            setLoading(false);
        };

        fetchUsers();
    }, []);

    if (loading)
        return (
            <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress />
            </Container>
        );

    return (
        <Container component="main" maxWidth="md" sx={{ mt: 4 }} className="fade-in">
            <Box sx={{
                textAlign: "center",
                mb: 3,
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: theme.palette.background.paper,
                boxShadow: `0 0 15px ${theme.palette.primary.main}`,
            }}>
                <Typography variant="h4" color={theme.palette.text.primary}>ランキング</Typography>
            </Box>

            <TableContainer component={Paper} sx={{
                animation: "fadeIn 0.6s ease-in-out",
                backgroundColor: theme.palette.background.paper,
                boxShadow: `0 0 15px ${theme.palette.primary.main}`,
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong style={{ color: theme.palette.text.secondary }}>順位</strong></TableCell>
                            <TableCell><strong style={{ color: theme.palette.text.secondary }}>ユーザー名</strong></TableCell>
                            <TableCell><strong style={{ color: theme.palette.text.secondary }}>ポイント</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow key={user.id}
                                      sx={{
                                          transition: "all 0.3s ease-in-out",
                                          ":hover": { backgroundColor: theme.palette.secondary.main + "33" }
                                      }}
                            >
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontWeight: "bold",
                                            color: theme.palette.text.primary
                                        }}
                                    >
                                        {index + 1}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color={theme.palette.text.primary}>{user.username}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{ fontWeight: "bold", color: theme.palette.text.secondary }}>
                                        {user.points}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default RankingPage;
