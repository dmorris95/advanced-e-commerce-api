import { useEffect, useState } from "react"
import axios from "axios";
import { Modal, Form, Container, ListGroup, Row, Col, Button, Alert } from 'react-bootstrap'


const OrderForm = () => {
    const [customerId, setCustomerId] = useState('');
    const [date, setDate] = useState('');
    const [productString, setProductString] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);




    //Fetch Products to Display in List
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products', error)
        }
    };
    //Fetch Customers to Display in List
    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/customers');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error)
        }
    };

    //On Product Click add ID to products in Order string
    const addIdToOrder = (id) => {
        let string = ""
        if (productString === "") {
            string = productString + id
        } else {
            string = productString + ", " + id
        }
        setProductString(string)
    };
    //Remove previous product from order
    const removeId = () => {
        let string = productString
        if (string !== "") {
            string = string.slice(0, -3);
            setProductString(string)
        }
    };

    //Validate the Form for Submission
    const validateForm = () => {
        const errors = {};
        if (!customerId) errors.custId = 'A customer ID must be selected from the list on the right';
        if (!date) errors.date = 'An order date must be selected';
        if (!productString) errors.date = 'At least one product must be selected from the list';
        return errors;
    };

    //Handle Form Submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            setSubmitting(true);
            setError(null);
            //CleanUp productString for send off
            const regex = /[,\s]/g;
            let cleanIds = productString.replace(regex, '');
            //Build orderData constructor
            const orderData = {
                customer_id: customerId,
                date: date
            }
            try {
                await axios.post(`http://127.0.0.1:5000/order/${Number(cleanIds)}`, orderData);
                setShowSuccessModal(true);
            } catch (error) {
                console.log('Error submitting the order:', error);
                setError(error.toString());
            } finally {
                setSubmitting(false);
            }
        } else {
            setErrors(errors);
        }
    };

    const handleClose = () => {
        setShowSuccessModal(false);
        setCustomerId('');
        setDate('');
        setProductString('');
        setSubmitting(false);
    }

    useEffect(() => {
        fetchProducts();
        fetchCustomers();
    }, []);

    return (
        <Container>
            <Row className="gx-5">
                <Col>
                    <Form className="border border-secondary p-2 rounded-4" onSubmit={handleSubmit}>
                        <h3>Add Order</h3>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group controlId="customerId" className="border border-primary-subtle p-2 mb-3">
                            <Form.Label>Customer ID:</Form.Label><br/>
                            <Form.Text id="customerHelp" muted>
                                Select a customer from the customer list:
                            </Form.Text>
                            <Form.Control
                                type="number"
                                name="customerId"
                                value={customerId}
                                readOnly plaintext
                                isInvalid={!!errors.custId}
                                aria-describedby="customerHelp"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.custId}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="orderDate" className="border border-primary-subtle p-2 mb-3">
                            <Form.Label>Order Date:</Form.Label><br/>
                            <Form.Text id="dateHelp" muted>
                                Input the order date for the customer:
                            </Form.Text>
                            <Form.Control
                                type="date"
                                name="date"
                                value={date}
                                onChange={(e) => {setDate(e.target.value)}}
                                isInvalid={!!errors.date}
                                aria-describedby="dateHelp"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.date}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="products" className="border border-primary-subtle p-2">
                            <Form.Label>Product(s) in Order:</Form.Label><br/>
                            <Form.Text id="productHelp" muted>
                                Select products from the product list:
                            </Form.Text>
                            <Form.Control
                                readOnly
                                type="text"
                                name="productId"
                                value={productString}
                                isInvalid={!!errors.product}
                                aria-describedby="productHelp"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.product}
                            </Form.Control.Feedback>
                            <Button variant="danger" disabled={(productString === "")} onClick={() => {removeId()}} size="sm">Remove Last Product</Button>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-5" disabled={isSubmitting}>
                            Submit Order
                        </Button>
                    </Form>
                </Col>
                <Col>
                    <div className="border border-secondary rounded-3 p-3 mb-1">
                        <h3>Customers</h3>
                        <ListGroup>
                            {customers.map(customer => (
                                <ListGroup.Item key={customer.id} onClick={() => {setCustomerId(customer.id)}} className="d-flex justify-content-between align-items-center shadow-sm p-1 mb-3 bg-white rounded">
                                    {customer.name} (ID: {customer.id})
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                    <div className="border border-secondary rounded-3 p-3">
                        <h3>Products</h3>
                        <ListGroup>
                            {products.map(product => (
                                <ListGroup.Item key={product.id} onClick={() => {addIdToOrder(product.id)}} className="d-flex justify-content-between align-items-center shadow-sm p-1 mb-3 bg-white rounded">
                                    {product.name} (ID: {product.id}) -- (Price: ${product.price})
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                </Col>
            </Row>
            <Modal show={showSuccessModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Successful Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>Order has been successfully Submitted.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        </Container>
    );
}

export default OrderForm