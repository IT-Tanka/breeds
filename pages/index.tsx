import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MainLayout } from '../components/MainLayout';
import { BreedsCard } from '../interfaces/cards';
import { fetchData, enrichCardsWithBreeds } from '../services/fetchData';

const catApiUrl = 'https://api.thecatapi.com/v1/images';
const dogApiUrl = 'https://api.thedogapi.com/v1/images';
//  I can determine catApiUrl and dogApiUrl  this way too
// const catApiUrl = process.env.NEXT_PUBLIC_CAT_API_URL;
// const dogApiUrl = process.env.NEXT_PUBLIC_DOG_API_URL;

interface cardsPageProps {
  cards: BreedsCard[];
}

export default function Cards({ cards: serverCards }: cardsPageProps) {
  const [catCards, setCatCards] = useState<BreedsCard[]>([]);
  const [dogCards, setDogCards] = useState<BreedsCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [catData, dogData] = await Promise.all([
          fetchData(catApiUrl+'/search?limit=10&has_breeds=1'),
          fetchData(dogApiUrl+'/search?limit=10&has_breeds=1'),
        ]);

        const enrichedCatData = await enrichCardsWithBreeds(catData, 'cat');
        const enrichedDogData = await enrichCardsWithBreeds(dogData, 'dog');

        setCatCards(enrichedCatData);
        setDogCards(enrichedDogData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    }

    if (!serverCards) {
      load();
    } else {
      // Обогатить serverCards данными о породах
      const enrichedServerCards = serverCards.map(card => ({
        ...card,
        _petType: Array.isArray(card.breeds) && card.breeds.length > 0 ? 'unknown' : null
      }));
      
      setCatCards(enrichedServerCards);
      setDogCards([]);
      setLoading(false);
    }
  }, [serverCards]);

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
          <p className="text-center text-gray-600 text-lg">Loading ...</p>
        </div>
      </MainLayout>
    );
  }

  const mixedIndices = (() => {
    const indices1 = Array.from({ length: catCards.length }, (_, i) => ['cat', i] as const);
    const indices2 = Array.from({ length: dogCards.length }, (_, i) => ['dog', i] as const);

    return [...indices1, ...indices2].sort(() => Math.random() - 0.5);
  })();

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-2">
              Pet Breeds
            </h1>
            <p className="text-gray-600 text-lg">Discover amazing dogs and cats breeds</p>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mixedIndices.map(([arrayName, index], i) => {
              const card = arrayName === 'cat' ? catCards[index] : dogCards[index];
              return (
                <li key={card.id}>
                  <Link href={`/breed/${card.id}?pet=${arrayName}`} passHref>
                    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer h-full flex flex-col">
                      {/* Badge */}
                      <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase shadow-lg">
                        {arrayName === 'cat' ? '🐱 Cat' : '🐶 Dog'}
                      </div>

                      {/* Image Container */}
                      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-orange-100 to-yellow-100">
                        <Image
                          src={card.url}
                          width={320}
                          height={320}
                          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                          alt={card.breeds?.[0]?.name || 'Breed'}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-grow flex flex-col justify-between">
                        <div>
                          <p className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                            {card.breeds?.[0]?.name || 'Unknown Breed'}
                          </p>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                            {card.breeds?.[0]?.origin && `From ${card.breeds[0].origin}`}
                          </p>
                        </div>

                        {/* Footer Info */}
                        <div className="flex items-center justify-between pt-3 border-t border-orange-100">
                          {card.breeds?.[0]?.life_span && (
                            <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded">
                              👁️ {card.breeds[0].life_span} yrs
                            </span>
                          )}
                          <span className="text-xs text-gray-500">
                            Learn more →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}
