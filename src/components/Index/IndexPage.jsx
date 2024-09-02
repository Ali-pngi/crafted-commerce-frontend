// components/IndexPage.jsx

import React, { useState, useEffect } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { checkSuperuser, signout } from '../../services/authService';

const BACKEND_URL = 'http://127.0.0.1:8000';

const IndexPage = ({ user }) => {
    const [products, setProducts] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [isSuperuser, setIsSuperuser] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch(`${BACKEND_URL}/api/products/`);
            const data = await res.json();
            setProducts(data);
        };

        const fetchWatchlist = async () => {
            const res = await fetch(`${BACKEND_URL}/api/watchlist/`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const data = await res.json();
            setWatchlist(data.map(item => item.product));
        };

        const fetchSuperuserStatus = async () => {
            if (user) {
                const superuserStatus = await checkSuperuser();
                setIsSuperuser(superuserStatus.is_superuser);
            }
        };

        fetchProducts();
        if (user) {
            fetchWatchlist();
            fetchSuperuserStatus();
        }
    }, [user]);

    const handleWatchlistToggle = async (productId) => {
        if (!user) return;

        const inWatchlist = watchlist.includes(productId);
        const url = `${BACKEND_URL}/api/watchlist/${inWatchlist ? productId + '/' : ''}`;
        const method = inWatchlist ? 'DELETE' : 'POST';

        const res = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: inWatchlist ? null : JSON.stringify({ product: productId }),
        });

        if (res.ok) {
            setWatchlist(inWatchlist
                ? watchlist.filter(id => id !== productId)
                : [...watchlist, productId]);
        }
    };

    const handleSignout = async () => {
        const refreshToken = localStorage.getItem('refresh');
        await signout(refreshToken);
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        window.location.reload();
    };

    return (
        <Container>
            <Row>
                <h1>Welcome to the Product Page</h1>
                {isSuperuser && <Button onClick={() => console.log('Create Product')}>Create Product</Button>}
                <Button onClick={handleSignout}>Sign Out</Button>
                {products.map(product => (
                    <div key={product.id}>
                        <h3>{product.title}</h3>
                        <Button
                            variant={watchlist.includes(product.id) ? 'danger' : 'primary'}
                            onClick={() => handleWatchlistToggle(product.id)}
                        >
                            {watchlist.includes(product.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
                        </Button>
                    </div>
                ))}
            </Row>
        </Container>
    );
};

export default IndexPage;
