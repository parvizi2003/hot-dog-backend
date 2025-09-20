import AppLayout from '@/layouts/app-layout';
import orders from '@/routes/orders';
import { OrderWithItems, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Orders',
        href: orders.index.url(),
    },
];

export default function ShowOrder({ data }: { data: OrderWithItems }) {
    console.log(data);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Orders" />
            <div className="h-full flex-1 overflow-x-auto rounded-xl p-4"></div>
        </AppLayout>
    );
}
