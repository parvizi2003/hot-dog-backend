import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import users from '@/routes/users';
import { PaginatedData, User } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs = [{ title: 'Users', href: users.index.url() }];

export default function UsersIndex({ data }: { data: PaginatedData<User> }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col overflow-x-auto rounded-xl p-4">
                <div className="mb-4 flex justify-end">
                    <Link href={users.create()}>
                        <Button>+ Create New </Button>
                    </Link>
                </div>

                <div className="overflow-hidden rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name </TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className=""></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.data.length ? (
                                data.data.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.role}</TableCell>
                                        <TableCell className="flex justify-end">
                                            <Link href={users.edit(item.id)} className="inline-block">
                                                <Button size="sm">Edit</Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="mt-auto flex items-center justify-end space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        from {data.from} to {data.to} of {data.total}
                    </div>
                    <div className="space-x-2">
                        <Button variant={!data.prev_page_url ? 'default' : 'outline'} size="sm" disabled={!data.prev_page_url}>
                            <Link href={data.prev_page_url ?? ''}>Previous</Link>
                        </Button>
                        <Button variant={!data.next_page_url ? 'default' : 'outline'} size="sm" disabled={!data.next_page_url}>
                            <Link href={data.next_page_url ?? ''}>Next</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
