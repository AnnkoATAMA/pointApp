import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./firebase.ts";
import { onAuthStateChanged, User } from "firebase/auth";

interface ProtectedRouteProps {
    children: ReactNode;
    adminOnly?: boolean;
}

const ADMIN_EMAIL = import.meta.env.VITE_FIREBASE_ADMIN_EMAIL;

const ProtectRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) return <div>Loading...</div>;

    if (!user) return <Navigate to="/signin" replace />;

    const isAdmin = ADMIN_EMAIL.includes(user.email || "");
    if (adminOnly && !isAdmin) return <Navigate to="/" replace />;

    return <>{children}</>;
};

export default ProtectRoute;
