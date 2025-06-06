import {auth} from "@/auth";
import {Metadata} from "next";
import {deleteOrder, getAllOrders} from "@/lib/actions/order.actions";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {formatCurrency, formatDateTime, formatId} from "@/lib/utils";
import Link from "next/link";
import Pagination from "@/components/shared/pagination";
import {Button} from "@/components/ui/button";
import DeleteDialog from "@/components/shared/delete-dialog";

export const metadata: Metadata = {
    title: 'Admin Orders'
};

const AdminOrdersPage = async (props: {
    searchParams: Promise<{ page: string }>
}) => {
    const session = await auth();
    const {page = '1'} = await props.searchParams;

    if (session?.user?.role !== 'admin') throw new Error('User is not authorized');

    const orders = await getAllOrders({
        page: Number(page),
        limit: 2
    });

    return (
        <div className="space-y-2">
            <h2 className="h2-bold">Orders</h2>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>DATE</TableHead>
                            <TableHead>TOTAL</TableHead>
                            <TableHead>PAID</TableHead>
                            <TableHead>DELIVERED</TableHead>
                            <TableHead>ACTIONS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.data.map(order => (
                            <TableRow key={order.id}>
                                <TableCell>{formatId(order.id)}</TableCell>
                                <TableCell>{formatDateTime(order.createdAt).dateTime}</TableCell>
                                <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                                <TableCell>
                                    {
                                        order.isPaid && order.paidAt ? formatDateTime(order.paidAt).dateTime
                                            : 'Not paid'
                                    }
                                </TableCell>
                                <TableCell>
                                    {
                                        order.isDelivered && order.deliveredAt ? formatDateTime(order.deliveredAt).dateTime
                                            : 'Not delivered'
                                    }
                                </TableCell>
                                <TableCell>
                                    <Button asChild variant="outline" size="sm">
                                        <Link href={`/order/${order.id}`}>
                                            Details
                                        </Link>
                                    </Button>
                                    <DeleteDialog id={order.id} action={deleteOrder}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {
                    orders.totalPages > 1 && (
                        <Pagination page={Number(page)} totalPages={orders.totalPages}/>
                    )
                }
            </div>
        </div>
    );
};

export default AdminOrdersPage;