'use client';

import {useRouter} from "next/navigation";
import {useFormStatus} from "react-dom";
import {Button} from "@/components/ui/button";
import {Check, Loader} from "lucide-react";
import {createOrder} from "@/lib/actions/order.actions";

const PlaceOrderForm = () => {
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const res = await createOrder();

        if (res.redirectTo) router.push(res.redirectTo);
    };

    const PlaceholderButton = () => {
        const {pending} = useFormStatus();

        return (
            <Button disabled={pending} className="w-full">
                {
                    pending ?
                        <Loader className="w-4 h-4 animate-spin"/>
                        :
                        <Check className="w-4 h-4"/>
                }
                {' '}Place order
            </Button>
        )
    }

    return (
        <form className="w-full" onSubmit={handleSubmit}>
            <PlaceholderButton/>
        </form>
    );
};

export default PlaceOrderForm;