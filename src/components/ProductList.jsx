import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Container, ListGroup, Row, Col, Modal } from 'react-bootstrap'

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteProd, setDeleteProd] = useState("");

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products', error)
        }
    };

    const deleteProduct = async () => {
        try {
            await axios.delete(`http://127.0.0.1:5000/products/${deleteProd}`);
            fetchProducts();
        }   catch (error) {
            console.error('Error deleting product:', error);
        }
    };
    const handleDelete = () => {
        deleteProduct();
        handleClose();
    }

    const handleClose = () => {
        setShowDeleteModal(false);
        setDeleteProd("");
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <h3>Products</h3>
                    <ListGroup>
                        {products.map(product => (
                            <ListGroup.Item key={product.id} className="d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded">
                                {product.name} -- (ID: {product.id}) -- (Price: ${product.price})
                                <div>
                                    <Button variant="primary" onClick={() => navigate(`/edit-product/${product.id}`)} className="me-2">Edit</Button>
                                    <Button variant="danger" onClick={() => {setDeleteProd(product.id); setShowDeleteModal(true)}}>Delete</Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
            <Modal show={showDeleteModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Product?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you wish to delete this product?<br/>
                    <Button variant="danger" size="sm" onClick={handleDelete}>
                        Delete Product
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
        
    );
};

export default ProductList