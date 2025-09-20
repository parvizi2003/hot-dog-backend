import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import categories from '@/routes/categories';
import { Category, type BreadcrumbItem } from '@/types';
import { Form, Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function EditCategory({ data }: { data: Category }) {
    const {
        data: formData,
        setData: setFormData,
        put,
        errors,
        processing,
    } = useForm<{ name: string }>({
        name: data.name,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Categories',
            href: categories.index.url(),
        },
        {
            title: data.name,
            href: categories.edit.url(data.id),
        },
    ];

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(categories.update.url(data.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="h-full flex-1 gap-8 overflow-x-auto rounded-xl p-4">
                <div className="m-auto mt-10 flex max-w-lg flex-col gap-2">
                    <form onSubmit={submit}>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-4">
                                <Label htmlFor="name" className="text-center">
                                    Category Name
                                </Label>
                                <Input
                                    id="name"
                                    type="name"
                                    name="name"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData('name', e.target.value)}
                                />
                                <InputError message={errors.name} />
                            </div>
                            <Button loading={processing}>Submit</Button>
                        </div>
                    </form>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="destructive" type="button" className="w-full">
                                Delete Category
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Do you really want to delete {data.name}</DialogTitle>
                                <DialogDescription>This cant be returned</DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose>Close</DialogClose>
                                <Form method="delete" action={categories.destroy(data.id)}>
                                    <Button variant="destructive" type="submit" className="ml-2">
                                        Delete
                                    </Button>
                                </Form>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </AppLayout>
    );
}
