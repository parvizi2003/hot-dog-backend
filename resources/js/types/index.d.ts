import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name?: string;
    email?: string;
    avatar?: string;
    role: string;
    address?: string;
    phone_number?: string;
    created_at: string;
    updated_at: string;

    [key: string]: unknown; // This allows for additional properties...
}

export interface PaginatedData<T> {
    data: T[];
    next_page_url: string | null;
    prev_page_url: string | null;
    total: number;
    from: number;
    to: number;
}

export interface Order {
    id: number;
    user_id: number;
    user_name: string;
    total: number;
    status: string;
    items_count: number;
    address: string;
    phone_number: string;
    created_at: string;
    updated_at: string;
}

export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    items_count: number;
    price_at_add: number;
    total: number;
    created_at: string;
    updated_at: string;
}

export interface OrderWithItems extends Order {
    items: OrderItem[];
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    image_url: string;
    created_at: string;
    updated_at: string;
}

export interface Product {
    id: number;
    category_id: number;
    name: string;
    price: number;
    slug: string;
    image_url: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface ProductWithCategory extends Product {
    category: Category;
}
