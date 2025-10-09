import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import products from '@/routes/products';
import { PaginatedData, ProductWithCategory, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: products.index.url(),
    },
];

export default function Products({ data }: { data: PaginatedData<ProductWithCategory> }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="flex h-full flex-1 flex-col overflow-x-auto rounded-xl p-4">
                <div className="mb-4 flex justify-end">
                    <Link href={products.create()}>
                        <Button>+ Create New </Button>
                    </Link>
                </div>

                <div className="overflow-hidden rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Category </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Prise</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead className=""></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.data.length ? (
                                data.data.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.category?.name}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>$ {item.price}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell>
                                            <div className="h-9 w-9">
                                                <img src={`storage/${item.image_url}`} alt={item.image_url} className="h-full w-full object-cover" />
                                            </div>
                                        </TableCell>
                                        <TableCell className="flex justify-end">
                                            <Link href={products.edit(item.id)} className="ml-auto inline-block">
                                                <Button size="sm">Edit</Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="mt-auto flex items-center justify-end space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        from {data.from} to {data.to} of {data.total}
                    </div>
                    <div className="space-x-2">
                        <Button variant={!data.prev_page_url ? 'default' : 'outline'} size="sm" disabled={!data.prev_page_url}>
                            <Link href={data.prev_page_url ?? ''}>Previous</Link>
                        </Button>
                        <Button variant={!data.next_page_url ? 'default' : 'outline'} size="sm" disabled={!data.next_page_url}>
                            <Link href={data.next_page_url ?? ''}>Next</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
