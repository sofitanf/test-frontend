import { useState, useRef, useEffect, useCallback } from 'react';

// Soal Nomor 4
// Buatlah sebuah website yang menampilkan daftar pokemon yang di load dengan infinite scroll

const BASE_URL = 'https://pokeapi.co/api/v2';

const fetchPokemon = async (offset: number, limit: number) => {
  // fungsi untuk fetch data pokemon
  const response = await fetch(
    `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
  );
  const { results } = await response.json();
  return results;
};

const Soal4 = () => {
  const limit = 20;
  const [pokemonList, setPokemonList] = useState<
    { name: string; url: string }[]
  >([]);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const loadMorePokemon = useCallback(async () => {
    setLoading(true);
    const newPokemon = await fetchPokemon(offset, limit);

    if (newPokemon.length === 0) setHasMore(false);
    else setPokemonList((prevPokemon) => [...prevPokemon, ...newPokemon]);

    setLoading(false);
  }, [offset]);

  useEffect(() => {
    if (hasMore) {
      loadMorePokemon();
    }
  }, [loadMorePokemon, hasMore]);

  const lastPokemonElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading || !hasMore) return; // Stop observing if loading or no more posts
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setOffset((prevOffset) => prevOffset + limit); // Trigger loading of new posts by changing page number
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          flexGrow: 1,
          color: 'white',
          fontSize: '1.5em',
          textAlign: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <h1
          style={{
            fontWeight: 'bolder',
          }}
        >
          Pokémon Infinite Scroll
        </h1>
        {pokemonList.map((pokemon, index) => (
          <div
            key={index}
            ref={
              pokemonList.length === index + 1 ? lastPokemonElementRef : null
            }
          >
            <p>{pokemon.name}</p>
          </div>
        ))}
        {loading && <p>Loading...</p>}
      </div>
      <iframe
        src='/soal4.mp4'
        style={{
          height: '100vh',
          border: '1px solid white',
        }}
      ></iframe>
    </div>
  );
};

export default Soal4;
