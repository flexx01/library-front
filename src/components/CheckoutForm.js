import React, { useState } from 'react';
import {
    CardElement,
    useStripe,
    useElements,
    AddressElement,
} from '@stripe/react-stripe-js';
import axiosInstance from "../api/axiosConfig";
import Modal from '@mui/material/Modal';
import {Box} from "@mui/material";

const CheckoutForm = ({show, selectedFineId, onPaymentComplete, onPaymentFailed,close }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    // Domyślne style dla Stripe CardElement
    const cardElementOptions = {
        style: {
            base: {
                color: '#32325d',
                fontFamily: 'Arial, sans-serif',
                fontSize: '16px',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#fa755a',
            },
        },
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            console.error("Stripe.js has not loaded yet.");
            return;
        }

        setIsProcessing(true);

        try {
            // Wywołaj backend, aby uzyskać clientSecret
            const response = await axiosInstance.post('/api/fine/create-payment-intent', {
                fineId: selectedFineId,
            });

            const { clientSecret } = response.data;

            // Potwierdź płatność za pomocą Stripe
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: 'John Doe', // Zastąp danymi z formularza, jeśli dodasz pola
                    },
                },
            });

            if (result.error) {
                setMessage(`Payment failed: ${result.error.message}`);
                onPaymentFailed(result.error.message);
            } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
                setMessage('Payment succeeded!');
                onPaymentComplete();
            }

        } catch (error) {
            console.error("Error during payment processing:", error);
            setMessage("An unexpected error occurred.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Modal
            open={show}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 600,
                backgroundColor: 'white',
                border: '2px solid #6772e5',
                borderRadius: '10px',
                boxShadow: 24,
                overflow: "scroll",
                maxHeight: '80%',
                padding: 10,
                p: 4,}}>
        <div style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
            <h2>Szczegóły Płatności</h2>
            <form onSubmit={handleSubmit}>
                <div style={{marginBottom: '20px'}}>
                    <label htmlFor="card-element" style={{display: 'block', marginBottom: '10px'}}>
                        Dane Karty
                    </label>
                    <CardElement id="card-element" options={cardElementOptions}/>
                </div>

                <div style={{marginBottom: '20px'}}>
                    <label htmlFor="address-element" style={{display: 'block', marginBottom: '10px'}}>
                        Adres
                    </label>
                    <AddressElement id="address-element" options={{mode: 'billing'}}/>
                </div>

                <button
                    type="submit"
                    disabled={isProcessing}
                    style={{
                        backgroundColor: '#6772e5',
                        color: '#fff',
                        padding: '10px 15px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        width: '100%',
                        fontSize: '16px',
                    }}
                >
                    {isProcessing ? 'Procesowanie...' : 'Zapłać'}
                </button>
                <button
                    onClick={close}
                    disabled={isProcessing}
                    style={{
                        marginTop: '20px',
                        backgroundColor: '#32325d',
                        color: '#fff',
                        padding: '10px 15px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        width: '100%',
                        fontSize: '16px',
                    }}
                >
                    {"Anuluj"}
                </button>
            </form>
            {message && (
                <p style={{marginTop: '20px', color: message.startsWith('Payment failed') ? 'red' : 'green'}}>
                    {message}
                </p>
            )}
        </div>
            </Box>
        </Modal>
    );
};

export default CheckoutForm;
