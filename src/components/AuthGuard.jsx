import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';

export default function AuthGuard({ children }) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            
            if (!session) {
                // Se não tiver sessão, manda pro login na hora
                navigate('/'); 
            } else {
                setLoading(false);
            }
        };

        checkAuth();
    }, [navigate]);

    if (loading) return <div className="p-6">Verificando acesso...</div>;

    return children;
}