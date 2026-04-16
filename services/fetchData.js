export async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return null; 
    }
}

export async function fetchBreedInfo(breedId, petType) {
    const baseUrl = petType === 'cat' 
        ? 'https://api.thecatapi.com/v1/breeds/' 
        : 'https://api.thedogapi.com/v1/breeds/';
    
    const data = await fetchData(baseUrl + breedId);
    return data;
}

export async function enrichCardsWithBreeds(cards, petType) {
    if (!cards || cards.length === 0) return cards;
    
    const baseUrl = petType === 'cat' 
        ? 'https://api.thecatapi.com/v1/images/' 
        : 'https://api.thedogapi.com/v1/images/';
    
    return Promise.all(
        cards.map(async (card) => {
            // Если уже есть информация о породе, не запрашиваем
            if (card.breeds && card.breeds.length > 0) {
                return card;
            }
            
            // Запрашиваем полную информацию по ID картинки
            const fullCard = await fetchData(baseUrl + card.id);
            if (fullCard && fullCard.breeds && fullCard.breeds.length > 0) {
                return fullCard;
            }
            
            return card;
        })
    );
}
