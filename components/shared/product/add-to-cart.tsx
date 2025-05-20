'use client';

import { CartItem } from "@/types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { addItemToCart } from "@/lib/actions/cart.action";

const AddToCart = ({ item }: { item: CartItem }) => {
    const router = useRouter();

    const handleAddToCart = async () => {
        const res = await addItemToCart(item);

        if (!res.success) {
            toast.error(res.message);

            return;
        }

        toast.success(`${item.name} added to cart`, {
            action: {
                label: 'Go to cart',
                onClick: () => router.push('/cart')
            }
        })
    }
    return (
        <Button className="w-full" type="button" onClick={handleAddToCart}>
            <Plus /> Add to cart
        </Button>
    );
}

export default AddToCart;