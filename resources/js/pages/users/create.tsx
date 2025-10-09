import { UserForm } from '@/components/forms/user-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import users from '@/routes/users';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: users.index.url(),
    },
    {
        title: 'Create',
        href: users.create.url(),
    },
];

export default function CreateProduct() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Product" />
            <div className="flex h-full flex-1 items-center justify-center">
                <Card>
                    <CardHeader>
                        <CardTitle>Create a new user</CardTitle>
                        <CardDescription>New product will appear in system</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <UserForm />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
