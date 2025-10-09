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
import { RouteDefinition } from '@/wayfinder';
import { Form } from '@inertiajs/react';

interface DeleteCategoryDialogProps {
    name: string;
    url: RouteDefinition<'delete'>;
}

export function DeleteItemDialog({ name, url }: DeleteCategoryDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full" variant="destructive">
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you shure you want to delete {name}?</DialogTitle>
                    <DialogDescription>This action cannot be undone.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                    <Form method="DELETE" action={url}>
                        {({ processing }) => (
                            <Button variant="destructive" loading={processing}>
                                Delete
                            </Button>
                        )}
                    </Form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
