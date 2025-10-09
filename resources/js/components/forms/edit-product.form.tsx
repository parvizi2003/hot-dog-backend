import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import products from '@/routes/products';
import { Category, Product } from '@/types';
import { Form } from '@inertiajs/react';

import { useState } from 'react';

interface EditProductFormProps {
    className?: string;
    product: Product;
    categories: Category[];
}

export function EditProductForm({ className, product, categories }: EditProductFormProps) {
    const [imagePreview, setImagePreview] = useState<string>(`/storage/${product.image_url}`);
    const [categoryId, setCategoryId] = useState(String(product.category_id));

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
        <Form method="post" action={products.update(product.id)} encType="multipart/form-data" className={cn('flex flex-col gap-6', className)}>
            {({ processing, errors }) => (
                <>
                    <input type="hidden" name="category_id" value={categoryId} />

                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="category_id">Category</Label>
                            <Select value={categoryId} onValueChange={setCategoryId}>
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
                            <Input id="name" type="text" name="name" required tabIndex={2} defaultValue={product.name} />
                            <InputError message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="image">Product image</Label>
                            <div className="h-[150px]">
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Product Image Preview"
                                        className="h-full w-full cursor-pointer rounded-xl border object-contain"
                                        onClick={handleImageClick}
                                    />
                                )}
                                <Input
                                    id="image"
                                    type="file"
                                    name="image"
                                    tabIndex={3}
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className={cn('h-full', imagePreview && 'hidden')}
                                />
                            </div>
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
                                defaultValue={product.price}
                                min={0}
                                step={0.01}
                            />
                            <InputError message={errors.price} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Product description</Label>
                            <Textarea id="description" name="description" defaultValue={product.description} tabIndex={5} />
                            <InputError message={errors.description} />
                        </div>
                    </div>

                    <Button type="submit" loading={processing}>
                        Edit Product
                    </Button>
                </>
            )}
        </Form>
    );
}
