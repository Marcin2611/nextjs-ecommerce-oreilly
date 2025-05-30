import {Metadata} from "next";
import {getProductByID} from "@/lib/actions/product.action";
import {notFound} from "next/navigation";
import ProductForm from "@/app/admin/products/create/product-form";

export const metadata: Metadata = {
    title: 'Update Product'
}

const AdminProductUpdatePage = async (props: {
    params: Promise<{ id: string }>
}) => {
    const {id} = await props.params;

    const product = await getProductByID(id);

    if (!product) return notFound();

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <h1 className="h2-bold">Update Product</h1>
            <ProductForm type="Update" productId={product.id} product={product}/>
        </div>
    );
};

export default AdminProductUpdatePage;