import { useEffect, useState } from 'react';

export default function Soal3() {
  /**
   * ? 1. hilangkan semua error dan deskripsikan apa penyebab error.
   * ? 2. tampilkan data yang di panggil dari api tersebut...
   */

  return <SeachComponent />;
}

type Result = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

function SeachComponent() {
  const [search, setSearch] = useState<string>('');
  const [result, setResult] = useState<Result>();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos/${search}`
      );
      const data = await response.json();

      setResult(data);
    }

    if (search) fetchData();
  }, [search]);

  return (
    <div>
      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value.trim())}
        placeholder='Search...'
      />
      <ul>
        <li>{result?.title}</li>
      </ul>
    </div>
  );
}
