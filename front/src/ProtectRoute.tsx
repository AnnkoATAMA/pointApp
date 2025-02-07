import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./firebase.ts";
import { onAuthStateChanged, User } from "firebase/auth";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectRoute = ({ children }: ProtectedRouteProps) => {
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

    return user ? <>{children}</> : <Navigate to="/signin" replace />;
};

export default ProtectRoute;
