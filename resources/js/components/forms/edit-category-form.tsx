import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Category } from '@/types';
import { Form } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '../input-error';

interface Props {
    className?: string;
    category: Category;
    url: string;
}

export function EditCategoryForm({ className, category, url }: Props) {
    const [imagePreview, setImagePreview] = useState<string>(`/storage/${category.image_url}`);

    const handleImageClick = () => {
        document.getElementById('image')?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <Form method="post" action={url} encType="multipart/form-data" className={cn('flex flex-col gap-6', className)}>
            {({ errors, processing }) => (
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Category Name</Label>
                        <Input id="name" type="text" name="name" required autoFocus tabIndex={1} defaultValue={category.name} />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="image">Category Image</Label>
                        <div className="relative h-[150px] w-full">
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Category Image Preview"
                                    className="h-full w-full cursor-pointer rounded-xl border object-contain"
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
                        Update
                    </Button>
                </div>
            )}
        </Form>
    );
}
