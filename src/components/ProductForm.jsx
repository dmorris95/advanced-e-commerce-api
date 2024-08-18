import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Alert, Modal, Spinner } from 'react-bootstrap'
import axios from "axios";

const ProductForm = () => {
    const [product, setProduct] = useState({ name: '', price: ''});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchProductDetails = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:5000/products/${id}`)
                    setProduct(response.data)
                } catch (error) {
                    console.log('Error fetching product details:', error);
                    setError(error.toString());
                }
            };
            fetchProductDetails();
        }
    }, [id]);
    
    const validateForm = () => {
        const errors = {};
        if (!product.name) errors.name = 'Product name is required';
        if (!product.price || product.price <= 0) errors.price = 'Price must be a positive number';
        return errors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            setSubmitting(true);
            setError(null);
            try {
                if (id) {
                    await axios.put(`http://127.0.0.1:5000/products/${id}`, product);
                } else {
                    await axios.post('http://127.0.0.1:5000/products', product);
                }
                setShowSuccessModal(true);
            } catch (error) {
                console.log('Error submitting the product:', error);
                setError(error.toString());
            } finally {    
                setSubmitting(false);
            }
        } else {
            setErrors(errors);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleClose = () => {
        setShowSuccessModal(false);
        setProduct({ name: '', price: '' });
        setSubmitting(false);
        navigate('/products'); //Navigate to productList after form submit
    };

    if (isSubmitting) return <p>Submitting product data...</p>;

    return (
        <>
        <Form onSubmit={handleSubmit}>
            <h3>{id ? 'Edit' : 'Add'} Product</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group controlId="productName">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="productPrice">
                <Form.Label>Price:</Form.Label>
                <Form.Control
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    isInvalid={!!errors.price}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.price}
                </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Spinner as="span" animation="border" size="sm" /> : "Submit"}
            </Button>
        </Form>

        <Modal show={showSuccessModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>Product has been successfully {id ? 'updated' : 'added'}.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default ProductForm;