import { EditCategoryForm } from '@/components/forms/edit-category-form';
import { DeleteItemDialog } from '@/components/modals/delete-item';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import AppLayout from '@/layouts/app-layout';
import categories from '@/routes/categories';
import { Category, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

export default function EditCategory({ category }: { category: Category }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Categories',
            href: categories.index.url(),
        },
        {
            title: category.name,
            href: categories.show.url(category.id),
        },
        {
            title: 'Edit',
            href: categories.edit.url(category.id),
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Category" />
            <div className="flex h-full flex-1 items-center justify-center">
                <Card>
                    <CardHeader>
                        <CardTitle>Category: {category.name}</CardTitle>
                        <CardDescription>Edit {category.name} category</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <EditCategoryForm category={category} url={categories.update.url(category.id)} />
                    </CardContent>
                    <CardFooter>
                        <DeleteItemDialog name={category.name} url={categories.destroy(category.id)} />
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
