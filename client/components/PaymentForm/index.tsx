'use client';

import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { PaymentIntent, StripeCardElementChangeEvent } from "@stripe/stripe-js";
import { createPayment, createPaymentIntent } from "@/utils/stripe/methods";
import * as S from "@/components/PaymentForm/styles";
import Link from "next/link";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import { FormLoading } from "@/components/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export interface PaymentFormProps {
    session: Session;
};

const PaymentForm = ({ session }: PaymentFormProps) => {
    const { items } = useCart();
    const { push } = useRouter();
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(true);
    const [clientSecret, setClientSecret] = useState<string>('');
    const [freeGames, setFreeGames] = useState<boolean>(false);

    useEffect(() => {
        const setPaymentMode = async () => {
            if (items.length) {
                const data = await createPaymentIntent({
                    items,
                    token: session.user.jwt as string,
                });

                if (data.freeGames) {
                    setFreeGames(true);
                    return;
                }

                if (data.error) {
                    setError(data.error.message);
                } else {
                    setFreeGames(false);
                    setClientSecret(data.client_secret);
                }
            }
        };

        setPaymentMode();
    }, [items, session]);

    const handleChange = async (event: StripeCardElementChangeEvent) => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : '');
    };

    const saveOrder = async (paymentIntent?: PaymentIntent) => {
        const data = await createPayment({
            items,
            paymentIntent,
            token: session.user.jwt as string,
        });

        return data;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        if (freeGames) {
            saveOrder();
            push('/success');
            return;
        }

        const payload = await stripe!.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements!.getElement(CardElement)!,
            },
        });

        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setLoading(false);
        } else {
            setError(null);
            setLoading(false);
            saveOrder(payload.paymentIntent);
            push('/success');
        }
    };

    return (
        <S.PaymentFormContainer>
            <form
                method="POST"
                onSubmit={handleSubmit}
            >
                <S.Body>
                    <Heading color="black" size="small" lineBottom>
                        Payment
                    </Heading>

                    {freeGames ? (
                        <S.FreeGames>Only free games, click buy and enjoy!</S.FreeGames>
                    ) : (
                        <CardElement
                            options={{
                                hidePostalCode: true,
                                style: {
                                    base: {
                                        fontSize: '16px'
                                    }
                                }
                            }}
                            onChange={handleChange}
                        />
                    )}

                    {error && (
                        <S.Error>
                            <FontAwesomeIcon icon={faCircleExclamation} width={20} height={20} />
                            {error}
                        </S.Error>
                    )}
                </S.Body>
                <S.Footer>
                    <Button as={Link} href="/" fullWidth minimal>
                        Continue shopping
                    </Button>
                    <Button
                        fullWidth
                        icon={loading ? <FormLoading src="/img/dots.svg" alt="Loading" width={20} height={20} /> : <FontAwesomeIcon icon={faCartShopping} />}
                        disabled={!freeGames && (disabled || !!error || loading)}
                    >
                        {!loading && <span>Buy now</span>}
                    </Button>
                </S.Footer>
            </form>
        </S.PaymentFormContainer>
    );
};

export default PaymentForm;