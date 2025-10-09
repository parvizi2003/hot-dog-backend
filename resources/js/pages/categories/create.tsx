import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import categories from '@/routes/categories';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { useState } from 'react';

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
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleImageClick = () => {
        document.getElementById('image')?.click();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="relative h-full flex-1 p-4">
                <Card className="absolute top-1/3 left-1/2 w-sm -translate-x-1/2 -translate-y-1/3">
                    <CardHeader>
                        <CardTitle>Create a new category</CardTitle>
                        <CardDescription>New category will appear in system</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form method="post" action={categories.store()} encType="multipart/form-data" className="flex flex-col gap-6">
                            {({ errors, processing }) => (
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Category Name</Label>
                                        <Input id="name" type="text" name="name" required autoFocus tabIndex={1} />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="image">Category Image</Label>
                                        <div className="relative h-[150px] w-full">
                                            {imagePreview && (
                                                <img
                                                    src={imagePreview}
                                                    alt="Category Image Preview"
                                                    className="h-full w-full cursor-pointer rounded-xl border object-contain p-2"
                                                    onClick={handleImageClick}
                                                />
                                            )}

                                            <Input
                                                id="image"
                                                type="file"
                                                name="image"
                                                required
                                                tabIndex={2}
                                                className={cn(imagePreview && 'hidden', 'h-full')}
                                                onChange={handleImageChange}
                                                accept="image/*"
                                            />
                                        </div>
                                        <InputError message={errors.image} />
                                    </div>

                                    <Button loading={processing} tabIndex={3}>
                                        Create
                                    </Button>
                                </div>
                            )}
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
