'use client';

import { useProgressStore } from '@/lib/useProgressBar';
import Link from 'next/link';
import type { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';

type SmartLinkProps = LinkProps & {
    children: ReactNode;
    title?: string;
    className?: string;
    target?: string;
};

export default function SmartLink({ target, title = '', children, ...props }: SmartLinkProps) {
    const start = useProgressStore((state) => state.start);
    const pathname = usePathname()

    const [isPrefetch, setIsPrefetch] = useState(() => {
        if (props.prefetch === undefined) return false;
        return Boolean(props.prefetch);
    });

    // const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    //     props.onClick?.(e);
    const handleClick = () => {
        const href = (props.href as string).split('?')[0].split('#')[0];
        if ((href || '/') !== pathname) {
            start();
        }
    };
    return (
        <Link
            {...props}
            onNavigate={() => {
                handleClick();
            }}
            prefetch={isPrefetch}
            onMouseEnter={() => setIsPrefetch(true)}
            title={title}
            target={target}
        >
            {children}
        </Link>
    );
}
