import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import orders from '@/routes/orders';
import { Order, PaginatedData, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Orders',
        href: orders.index.url(),
    },
];

export default function Orders({ data }: { data: PaginatedData<Order> }) {
    console.log(data);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="h-full flex-1 overflow-x-auto rounded-xl p-4">
                <div className="overflow-hidden rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>User Name</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>Phone Number</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>

                                <TableHead className="max-w-[100px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.data.length ? (
                                data.data.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.user_name}</TableCell>
                                        <TableCell>{item.address}</TableCell>
                                        <TableCell>{item.phone_number}</TableCell>
                                        <TableCell>{item.total}</TableCell>
                                        <TableCell>{item.status}</TableCell>

                                        <TableCell className="flex w-[100px] justify-end">
                                            <Link href={orders.edit(item.id)} className="inline-block">
                                                <Button>Edit</Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
