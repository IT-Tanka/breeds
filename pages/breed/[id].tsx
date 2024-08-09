import { useState, useEffect } from 'react';
import { GetServerSidePropsContext, GetServerSideProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { MainLayout } from '../../components/MainLayout';
import { BreedsCard } from '../../interfaces/cards';
import { fetchData } from '../../services/fetchData';

const baseApiUrl = 'https://api.thecatapi.com/v1/images';
//  I can determine catApiUrl and dogApiUrl  this way too
// const baseApiUrl = process.env.NEXT_PUBLIC_CAT_API_URL;

interface breedPageProps {
    breed: BreedsCard | null;
}

export default function Breed({ breed: serverCard }: breedPageProps) {
    const [breed, setBreed] = useState<BreedsCard | null>(serverCard);
    const [relatedImages, setRelatedImages] = useState<BreedsCard[]>([]);
    const router = useRouter();
    const { id, pet } = router.query;

    useEffect(() => {
        if (!serverCard && id && pet) {
            const fetchBreedData = async () => {
                const petUrl = baseApiUrl.replace('cat', `${pet}`).concat(`/${id}`);
                const fetchedBreed = await fetchData(petUrl);
                setBreed(fetchedBreed);
            };
            fetchBreedData();
        }
    }, [id, pet, serverCard]);

    useEffect(() => {
        async function loadRelatedImages() {
            if (breed?.breeds && breed.breeds.length > 0) {
                const breedId = breed.breeds[0].id;
                const petUrl = baseApiUrl.replace('cat', `${pet}`).concat(`/search?limit=5&breed_ids=${breedId}`);
                const fetchedRelatedImages = await fetchData(petUrl);
                setRelatedImages(fetchedRelatedImages);
            }
        }
        loadRelatedImages();
    }, [breed, pet]);

    if (!breed) {
        return (
            <MainLayout>
                <p className="text-center text-gray-600">Loading or no data available...</p>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">
                    {breed.breeds && breed.breeds.length > 0 ? (
                        <>
                            <span className="text-2xl font-semibold">{breed.breeds[0].name}</span>
                            <p className="mt-2 text-gray-700">{breed.breeds[0].description}</p>
                            <p className="mt-2"><strong>Origin:</strong> {breed.breeds[0].origin}</p>
                            <p className="mt-2"><strong>Life Span:</strong> {breed.breeds[0].life_span}</p>
                            <p className="mt-2"><strong>Temperament:</strong> {breed.breeds[0].temperament}</p>
                        </>
                    ) : (
                        <p className="text-gray-700">{breed.id}</p>
                    )}
                </h1>

                <div className="my-6">
                    <Image
                        src={breed.url}
                        width={300}
                        height={300}
                        className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                        alt="Breed image"
                    />
                </div>

                <h2 className="text-2xl font-semibold mb-4">Related Images</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {relatedImages.length > 0 ? (
                        relatedImages.map((image) => (
                            <li key={image.id} className="border rounded-lg overflow-hidden shadow-md">
                                <Image
                                    src={image.url}
                                    width={150}
                                    height={150}
                                    className="w-full h-40 object-cover"
                                    alt="Related image"
                                />
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-600">No related images available.</p>
                    )}
                </ul>

                <div className="mt-8 text-center">
                    <Link href="/" className="text-3xl text-orange-800 hover:text-yellow-300 transition-colors duration-300 font-custom flex items-center">
                        <span className="mr-2 text-xl">&#9664;</span>
                        back to home
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { id, pet } = context.query;
    if (pet !== 'cat' && pet !== 'dog') {
        return {
            notFound: true,
        };
    }
    const petUrl = baseApiUrl.replace('cat', `${pet}`).concat(`/${id}`);
    const breed = await fetchData(petUrl);

    return {
        props: {
            breed,
        },
    };
};

