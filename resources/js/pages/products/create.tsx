import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import products from '@/routes/products';
import { Category, type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: products.index.url(),
    },
    {
        title: 'Create',
        href: products.create.url(),
    },
];

interface ProductForm {
    category_id: string;
    name: string;
    image: string;
    price: number;
    description: string;
}

export default function CreateProduct({ categories }: { categories: Category[] }) {
    const { data, setData, post, processing, errors } = useForm<Required<ProductForm>>({
        category_id: '',
        name: '',
        image: '',
        price: 0,
        description: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(products.store.url());
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Product" />
            <div className="flex h-full flex-1 items-center justify-center">
                <Card className="w-fit">
                    <CardHeader>
                        <CardTitle>Create a new product</CardTitle>
                        <CardDescription>New product will appear in system</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="flex flex-col gap-6">
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="category_id">Category</Label>
                                    <Select value={data.category_id} onValueChange={(value) => setData('category_id', value)}>
                                        <SelectTrigger id="category_id" tabIndex={1} autoFocus>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Categories</SelectLabel>
                                                {categories.map((category) => (
                                                    <SelectItem key={category.id} value={String(category.id)}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.category_id} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="name">Product name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        required
                                        tabIndex={2}
                                        placeholder="hot dog"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="image">Product image URL</Label>
                                    <Input
                                        id="image"
                                        type="file"
                                        name="image"
                                        required
                                        tabIndex={3}
                                        value={data.image}
                                        onChange={(e) => setData('image', e.target.value)}
                                        className="h-[150px]"
                                    />
                                    <InputError message={errors.image} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="price">Product price</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        name="price"
                                        required
                                        tabIndex={4}
                                        placeholder="9.99"
                                        value={data.price}
                                        onChange={(e) => setData('price', Number(e.target.value))}
                                        min={0}
                                        step={0.01}
                                    />
                                    <InputError message={errors.price} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="description">Product description</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        tabIndex={5}
                                    />
                                    <InputError message={errors.description} />
                                </div>
                            </div>

                            <Button type="submit" loading={processing}>
                                Create Product
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
