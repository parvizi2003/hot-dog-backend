import AppLayout from '@/layouts/app-layout';
import products from '@/routes/products';
import { Category, Product, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { EditProductForm } from '@/components/forms/edit-product.form';
import { DeleteItemDialog } from '@/components/modals/delete-item';

export default function EditProduct({ product, categories }: { product: Product; categories: Category[] }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Products',
            href: products.index.url(),
        },
        {
            title: product.name,
            href: products.show.url(product.id),
        },
        {
            title: 'Edit',
            href: products.edit.url(product.id),
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="flex h-full flex-1 items-center justify-center">
                <Card>
                    <CardHeader>
                        <CardTitle>Create a new product</CardTitle>
                        <CardDescription>New product will appear in system</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <EditProductForm product={product} categories={categories} />
                    </CardContent>
                    <CardFooter>
                        <DeleteItemDialog name={product.name} url={products.destroy(product.id)} />
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
