'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Collection } from '@/components/shared/Collection';
import { useToast } from '../ui/use-toast';

const ClientImageSection = () => {
    const searchParams = useSearchParams();

    const [images, setImages] = useState<any[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    const page = Number(searchParams.get('page')) || 1;
    const searchQuery = searchParams.get('query') || '';

    useEffect(() => {
        const fetchImages = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`/api/get-images?page=${page}&query=${searchQuery}`);

                const data = await res.json();
                if (!res.ok) {
                    throw new Error(JSON.stringify(res.status + ' ' + res.statusText))
                }
                setImages(data.images);
                setTotalPages(data.totalPage);
                setIsLoading(false);

            } catch (error) {
                console.error('Failed to fetch images:', error);
                toast({
                    title: "Failed to fetch images",
                    description: (error as Error).message,
                    duration: 3000,
                    className: "error-toast",
                });
                setIsLoading(false);
            }
        };

        fetchImages();
    }, [page, searchQuery]);

    return (
        <Collection
            hasSearch
            images={images || []}
            totalPages={totalPages || 0}
            page={page || 1}
            isLoading={isLoading}
        />
    );
};

export default ClientImageSection;
