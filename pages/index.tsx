import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MainLayout } from '../components/MainLayout';
import { BreedsCard } from '../interfaces/cards';
import { fetchData } from '../services/fetchData';

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

        setCatCards(catData);
        setDogCards(dogData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    }

    if (!serverCards) {
      load();
    } else {
      setCatCards(serverCards.filter(card => card.breeds?.[0]?.name === 'cat'));
      setDogCards(serverCards.filter(card => card.breeds?.[0]?.name === 'dog'));
      setLoading(false);
    }
  }, [serverCards]);

  if (loading) {
    return (
      <MainLayout>
        <p className="text-center text-gray-600">Loading ...</p>
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
      <div className="max-w-4xl mx-auto p-4">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mixedIndices.map(([arrayName, index], i) => {
            const card = arrayName === 'cat' ? catCards[index] : dogCards[index];
            return (
              <li
                key={card.id}
                className="border rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105 hover:shadow-2xl transition-all duration-500 ease-in-out"
              >
                <Link
                  href={`/breed/${card.id}?pet=${arrayName}`}
                  passHref
                >
                  <Image
                    src={card.url}
                    width={320}
                    height={320}
                    className="w-full h-64 object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                    alt="image"
                  />
                  <div className="p-4 text-center">
                    <p className="text-lg font-semibold">{card.id}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </MainLayout>
  );
}
