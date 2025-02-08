import { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.ts";
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
import GoogleIcon from "@mui/icons-material/Google";

const ADMIN_EMAIL = import.meta.env.VITE_FIREBASE_ADMIN_EMAIL;

const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const isAdmin = ADMIN_EMAIL === user.email;
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

    if (loading)
        return (
            <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress />
            </Container>
        );

    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
            <Card sx={{ p: 3, boxShadow: 3, textAlign: "center" }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        ログイン
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Googleアカウントでログインしてください。
                    </Typography>
                    <Stack direction="column" spacing={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<GoogleIcon />}
                            onClick={handleGoogleLogin}
                        >
                            Googleでログイン
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Container>
    );
};

export default LoginPage;
