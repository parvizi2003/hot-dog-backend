import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import categories from '@/routes/categories';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: categories.index.url(),
    },
    {
        title: 'Create',
        href: categories.create.url(),
    },
];

export default function CreateCategory() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="relative h-full flex-1 p-4">
                <Card className="absolute top-1/3 left-1/2 w-fit -translate-x-1/2 -translate-y-1/3">
                    <CardHeader>
                        <CardTitle>Create a new category</CardTitle>
                        <CardDescription>New category will appear in system</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form method="post" action={categories.store()} className="flex flex-col gap-6">
                            {({ errors, processing }) => (
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Category Name</Label>
                                        <Input id="name" type="name" name="name" required autoFocus tabIndex={1} autoComplete="name" />
                                        <InputError message={errors.name} />
                                    </div>
                                    <Button loading={processing}>Create</Button>
                                </div>
                            )}
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
