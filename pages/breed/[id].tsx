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
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-4">
                <div className="max-w-5xl mx-auto">
                    {/* Back Button */}
                    <Link href="/" className="inline-flex items-center text-orange-600 hover:text-orange-800 transition-colors duration-300 mb-6 font-semibold">
                        <span className="mr-2">←</span>
                        Back to home
                    </Link>

                    {breed.breeds && breed.breeds.length > 0 ? (
                        <>
                            {/* Main Header */}
                            <div className="mb-8">
                                <h1 className="text-5xl font-bold text-gray-800 mb-2">{breed.breeds[0].name}</h1>
                                <p className="text-lg text-gray-600">{breed.breeds[0].description}</p>
                            </div>

                            {/* Main Image */}
                            <div className="mb-10">
                                <div className="relative w-full max-w-2xl mx-auto">
                                    <Image
                                        src={breed.url}
                                        width={600}
                                        height={400}
                                        className="w-full rounded-2xl shadow-2xl object-cover"
                                        alt={breed.breeds[0].name}
                                    />
                                </div>
                            </div>

                            {/* Info Cards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                                {/* Origin Card */}
                                <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-orange-500 hover:shadow-lg transition-shadow">
                                    <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide">Origin</p>
                                    <p className="text-xl font-bold text-gray-800 mt-1">{breed.breeds[0].origin || 'Unknown'}</p>
                                </div>

                                {/* Life Span Card */}
                                <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
                                    <p className="text-sm font-semibold text-green-600 uppercase tracking-wide">Life Span</p>
                                    <p className="text-xl font-bold text-gray-800 mt-1">{breed.breeds[0].life_span || 'Unknown'} years</p>
                                </div>

                                {/* Weight Card */}
                                {breed.breeds[0].weight && (
                                    <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
                                        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Weight</p>
                                        <p className="text-lg font-bold text-gray-800 mt-1">
                                            {breed.breeds[0].weight.metric} kg
                                        </p>
                                        <p className="text-sm text-gray-600">{breed.breeds[0].weight.imperial} lbs</p>
                                    </div>
                                )}

                                {/* Energy Level Card */}
                                {breed.breeds?.[0]?.energy_level && (
                                    <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-red-500 hover:shadow-lg transition-shadow">
                                        <p className="text-sm font-semibold text-red-600 uppercase tracking-wide">Energy Level</p>
                                        <div className="mt-2 flex gap-1">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`h-2 w-full rounded ${
                                                        i < (breed.breeds?.[0]?.energy_level || 0) ? 'bg-red-500' : 'bg-gray-300'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Temperament */}
                            <div className="bg-white rounded-xl shadow-md p-6 mb-10 border-t-4 border-orange-500">
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">Temperament</h3>
                                <p className="text-gray-700 leading-relaxed">{breed.breeds[0].temperament}</p>
                            </div>

                            {/* Characteristics Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
                                {[
                                    { label: 'Adaptability', value: breed.breeds?.[0]?.adaptability },
                                    { label: 'Affection', value: breed.breeds?.[0]?.affection_level },
                                    { label: 'Child Friendly', value: breed.breeds?.[0]?.child_friendly },
                                    { label: 'Dog Friendly', value: breed.breeds?.[0]?.dog_friendly },
                                    { label: 'Intelligence', value: breed.breeds?.[0]?.intelligence },
                                    { label: 'Social Needs', value: breed.breeds?.[0]?.social_needs },
                                    { label: 'Grooming', value: breed.breeds?.[0]?.grooming },
                                    { label: 'Health Issues', value: breed.breeds?.[0]?.health_issues },
                                ].map((char) => (
                                    char.value && (
                                        <div key={char.label} className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-lg p-4">
                                            <p className="text-sm font-semibold text-gray-700 mb-2">{char.label}</p>
                                            <div className="flex gap-1">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`h-2 w-full rounded ${
                                                            i < (char.value || 0) ? 'bg-orange-500' : 'bg-orange-200'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>

                            {/* Related Images */}
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-6">Related Images</h2>
                                {relatedImages.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                        {relatedImages.map((image) => (
                                            <div
                                                key={image.id}
                                                className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                            >
                                                <Image
                                                    src={image.url}
                                                    width={200}
                                                    height={200}
                                                    className="w-full h-48 object-cover"
                                                    alt="Related image"
                                                />
                                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-gray-600 text-lg">No related images available.</p>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-700 text-lg">No breed information available.</p>
                        </div>
                    )}
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

