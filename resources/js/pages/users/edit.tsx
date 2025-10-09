import AppLayout from '@/layouts/app-layout';
import { User, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { UserForm } from '@/components/forms/user-form';
import { DeleteItemDialog } from '@/components/modals/delete-item';
import users from '@/routes/users';

export default function EditProduct({ user }: { user: User }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Products',
            href: users.index.url(),
        },
        {
            title: user.name ?? '',
            href: users.show.url(user.id),
        },
        {
            title: 'Edit',
            href: users.edit.url(user.id),
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
                        <UserForm defaultValues={{ id: user.id, name: user.name ?? '', email: user.email ?? '', role: user.role }} />
                    </CardContent>
                    <CardFooter>
                        <DeleteItemDialog name={user.name ?? ''} url={users.destroy(user.id)} />
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
