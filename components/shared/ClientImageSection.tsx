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
                setImages(data.images);
                setTotalPages(data.totalPage);
            } catch (error) {
                console.error('Failed to fetch images:', error);
                toast({
                    title: "Error",
                    description: (error as Error).message,
                    duration: 3000,
                    className: "error-toast",
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchImages();
    }, [page, searchQuery]);

    return (
        <Collection
            hasSearch
            images={images}
            totalPages={totalPages}
            page={page}
            isLoading={isLoading}
        />
    );
};

export default ClientImageSection;
