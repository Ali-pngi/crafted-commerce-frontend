import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserProfile, deleteUserAccount, signout } from '../../services/userService';
import { Container, Button, Card, Row, Col, Modal, Form, Alert } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';

const UserProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const [profileData, setProfileData] = useState({ username: '', email: '' });
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username,
        email: user.email,
        date_joined: user.date_joined,
      });

      const fetchWatchlist = async () => {
        try {
          const response = await fetch('/api/watchlist/', {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          });
          if (!response.ok) {
            throw new Error('Failed to fetch watchlist');
          }
          const data = await response.json();
          setWatchlist(data);
        } catch (error) {
          console.error('Error fetching watchlist:', error);
          setError('Failed to load watchlist');
        }
      };

      fetchWatchlist();
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      if (!user || !user.id) {
        throw new Error('User ID is not available');
      }
      const updatedUser = await updateUserProfile(user.id, profileData);
      setProfileData(updatedUser);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      await deleteUserAccount(user.id);
      signout();
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      setError('Failed to delete account');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWatchlist = async (productId) => {
    try {
      const response = await fetch(`/api/watchlist/${productId}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setWatchlist(watchlist.filter((product) => product.product_id !== productId));
      } else {
        throw new Error('Failed to remove from watchlist');
      }
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      setError('Failed to remove item from watchlist');
    }
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  if (authLoading) {
    return <Container><p>Loading user data...</p></Container>;
  }

  if (!user) {
    return <Container><Alert variant="warning">Please sign in to view your profile.</Alert></Container>;
  }

  return (
    <Container>
      <h2>User Profile</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>{user.username}</Card.Title>
          <Card.Text>Email: {user.email}</Card.Text>
          <Card.Text>Username: {user.username}</Card.Text>
          <Card.Text>Joined on: {new Date(user.date_joined).toLocaleDateString()}</Card.Text>
          <Button variant="primary" onClick={handleShowModal}>
            Edit Profile
          </Button>
        </Card.Body>
      </Card>

      <div className="mt-5">
        <h3>Your Watchlist</h3>
        {watchlist.length > 0 ? (
          <Row className="gy-4">
            {watchlist.map((product) => (
              <Col key={product.product_id} md={4}>
                <Card onClick={() => navigate(`/products/${product.product_id}`)}>
                  <Card.Img 
                    variant="top" 
                    src={product.image ? product.image : '/path/to/default-image.png'} 
                    alt={product.product_title}
                  />
                  <Card.Body>
                    <Card.Title>{product.product_title}</Card.Title>
                    <Button 
                      variant="danger" 
                      onClick={(e) => {
                        e.stopPropagation();  
                        handleRemoveFromWatchlist(product.product_id);
                      }}
                    >
                      Remove from Watchlist
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <p>You have no items in your watchlist.</p>
        )}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={profileData.username}
                onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteAccount} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete Account'}
          </Button>
          <Button variant="primary" onClick={handleUpdateProfile} disabled={loading}>
            {loading ? 'Updating...' : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserProfile;