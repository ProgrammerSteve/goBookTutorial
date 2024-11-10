import React, { useState, ChangeEvent, FormEvent } from 'react';
import { loadStripe, Stripe,StripeCardElement  } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements, CardElementComponent, } from '@stripe/react-stripe-js';


const stripePromise = loadStripe('');

interface CreditCardFormProps {
    operation: string;
}

interface CreditCardInformationProps {
    show: boolean;
    separator?: boolean;
    operation: string;
}

const INITIALSTATE = 'INITIAL';
const SUCCESSSTATE = 'COMPLETE';
const FAILEDSTATE = 'FAILED';

const CreditCardForm: React.FC<CreditCardFormProps> = ({ operation }) => {
    const [value, setValue] = useState<string>('');
    const [status, setStatus] = useState<string>(INITIALSTATE);

    const stripe = useStripe();
    const elements = useElements();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        console.log('Handle submit called, with name:', value);
    
        if (!stripe || !elements) {
            console.error('Stripe.js has not loaded yet.');
            return;
        }
    
        const cardElement = elements.getElement(CardElement) as StripeCardElement;
        if (!cardElement) {
            console.error('CardElement not found.');
            return;
        }
    
        const { error, token } = await stripe.createToken(cardElement, { name: value });
        if (error || !token) {
            console.log('Invalid token');
            setStatus(FAILEDSTATE);
            return;
        }
    
        const response = await fetch('/charge', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: token.id,
                operation,
            }),
        });
    
        if (response.ok) {
            console.log('Purchase Complete!');
            setStatus(SUCCESSSTATE);
        } else {
            setStatus(FAILEDSTATE);
        }
    };

    const renderCreditCardInformation = () => (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={value} 
                onChange={handleInputChange} 
                placeholder="Cardholder Name" 
                required 
            />
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    );

    const renderSuccess = () => <div>Payment successful!</div>;
    const renderFailure = () => <div>Payment failed. Please try again.</div>;

    let body;
    switch (status) {
        case SUCCESSSTATE:
            body = renderSuccess();
            break;
        case FAILEDSTATE:
            body = renderFailure();
            break;
        default:
            body = renderCreditCardInformation();
    }

    return <div>{body}</div>;
};

const CreditCardInformation: React.FC<CreditCardInformationProps> = ({ show, separator, operation }) => {
    if (!show) {
        return null;
    }

    return (
        <div>
            {separator && <hr />}
            <Elements stripe={stripePromise}>
                <CreditCardForm operation={operation} />
            </Elements>
        </div>
    );
};

export default CreditCardInformation;
