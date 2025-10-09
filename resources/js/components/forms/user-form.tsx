import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import users from '@/routes/users';
import { Form } from '@inertiajs/react';

interface UserFormProps {
    defaultValues?: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
}

export function UserForm({ defaultValues }: UserFormProps) {
    const isEditing = Boolean(defaultValues);

    return (
        <Form
            className="flex flex-col gap-6"
            method={isEditing ? 'put' : 'post'}
            action={defaultValues ? users.update(defaultValues.id) : users.store()}
        >
            {({ processing, errors }) => (
                <>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                required
                                tabIndex={1}
                                placeholder="Johny"
                                autoFocus
                                defaultValue={defaultValues?.name}
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                required
                                tabIndex={2}
                                placeholder="johny@example.com"
                                defaultValue={defaultValues?.email}
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">
                                Password {isEditing && <span className="ml-1 text-muted-foreground">(leave blank to keep current)</span>}
                            </Label>
                            <Input
                                id="password"
                                type="text"
                                name="password"
                                tabIndex={3}
                                placeholder="********"
                                minLength={8}
                                required={!isEditing}
                            />
                            <InputError message={errors.password} />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="role">Role</Label>
                        <Select name="role" defaultValue={defaultValues?.role}>
                            <SelectTrigger id="role" tabIndex={4}>
                                <SelectValue placeholder="Select user role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Roles</SelectLabel>
                                    <SelectItem value="ADMIN">ADMIN</SelectItem>
                                    <SelectItem value="USER">USER</SelectItem>
                                    <SelectItem value="CASHIER">CASHIER</SelectItem>
                                    <SelectItem value="COOK">COOK</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.role} />
                    </div>

                    <Button type="submit" loading={processing} tabIndex={5}>
                        {isEditing ? 'Update User' : 'Create User'}
                    </Button>
                </>
            )}
        </Form>
    );
}
