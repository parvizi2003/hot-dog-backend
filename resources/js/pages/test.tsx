import { Title } from '@/components/title';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Test',
        href: dashboard().url,
    },
];

export default function Test() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Test" />
            <div className="h-full flex-1 overflow-x-auto rounded-xl p-4">
                <div className="grid h-full grid-cols-3 gap-4">
                    <div className="rounded-2xl bg-red-500">
                        <Title size="2xl" text="1" className="flex h-full w-full items-center justify-center font-bold" />
                    </div>
                    <div className="row-span-2 rounded-2xl bg-red-500">
                        <Title size="2xl" text="2" className="flex h-full w-full items-center justify-center font-bold" />
                    </div>
                    <div className="row-span-2 rounded-2xl bg-red-500">
                        <Title size="2xl" text="3" className="flex h-full w-full items-center justify-center font-bold" />
                    </div>
                    <div className="rounded-2xl bg-red-500">
                        <Title size="2xl" text="4" className="flex h-full w-full items-center justify-center font-bold" />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
