import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";

const CheckOutForm = () => {

    const [error, setError] = useState('')
    const stripe = useStripe()
    const elements = useElements()
    const axiosPublic = useAxiosPublic()
    const [select, setSelect] = useState(1)
    const [amount, setAmount] = useState(0)
    const [clientSecret, setClientSecret] = useState('')
    const { user } = useAuth()
    // step-4.2




    console.log(clientSecret)
    console.log(amount)

    const handleSubmit = async (e) => {
        e.preventDefault()

        //step-1
        if (!stripe || !elements) {
            return
        }

        //step-2
        const card = elements.getElement(CardElement)
        if (card == null) {
            return
        }

        //step-3:
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        //step-3: then setup server
        if (error) {
            console.log('payment error:', error)
            setError(error.message)
        }
        else {
            console.log('payment method:', paymentMethod)
            setError('')
        }



        //step-4.1:
        axiosPublic.post('http://localhost:5000/create-payment-intent', { amount })
            .then(res => {
                // console.log(res.data.clientSecret)
                setClientSecret(res.data.clientSecret)
            })


        //step-5: confirm payments
        const { paymentIntent, error: cardConfirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                }
            }
        })

        if (cardConfirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
        }

    }


    const handleAmount = (e) => {
        setAmount(e.target.value)
    }

    return (
        <div className="mt-10">
            <div>
                <div className="flex justify-center   font-medium">
                    <button onClick={() => setSelect(1)} className={`${select === 1 ? 'bg-green-600 text-white' : ''} border-2 p-2`}>GIVE ONCE</button>

                    <button onClick={() => setSelect(2)} className={`${select === 2 ? 'bg-green-600 text-white' : ''} border-2 p-2`}>MONTHLY</button>
                </div>
                <div>
                    <input onChange={handleAmount} type="text" placeholder="amount" className="p-2 bg-gray-200 rounded-lg " />
                </div>
            </div>
            <form onSubmit={handleSubmit} className="mt-10">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-sm btn-primary mt-5" type="submit" disabled={!stripe}>
                    Payment
                </button>
            </form>
            <p className="text-red-600">{error}</p>
        </div>
    );
};

export default CheckOutForm;