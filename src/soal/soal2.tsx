import { useEffect, useState } from 'react';

const data = [
  { id: 1, country: 'United States' },
  { id: 2, country: 'Canada' },
  { id: 3, country: 'Mexico' },
  { id: 4, country: 'Brazil' },
  { id: 5, country: 'Argentina' },
  { id: 6, country: 'United Kingdom' },
  { id: 7, country: 'France' },
  { id: 8, country: 'Germany' },
  { id: 9, country: 'Italy' },
  { id: 10, country: 'Spain' },
  { id: 11, country: 'Russia' },
  { id: 12, country: 'China' },
  { id: 13, country: 'Japan' },
  { id: 14, country: 'South Korea' },
  { id: 15, country: 'India' },
  { id: 16, country: 'Australia' },
  { id: 17, country: 'South Africa' },
  { id: 18, country: 'Egypt' },
  { id: 19, country: 'Nigeria' },
  { id: 20, country: 'Kenya' },
];

const useKeyPress = (targetKey: string) => {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const downHandler = ({ key }: { key: string }) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    };

    const upHandler = ({ key }: { key: string }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey]);

  return keyPressed;
};

function Soal2() {
  // buatlah select box tanpa menggunakan plugin
  const [search, setSearch] = useState<string>('');
  const [openOption, setOpenOption] = useState<boolean>(false);
  const downPress = useKeyPress('ArrowDown');
  const upPress = useKeyPress('ArrowUp');
  const enterPress = useKeyPress('Enter');
  const [cursor, setCursor] = useState<number>(0);
  const [hovered, setHovered] = useState<{ id: number; country: string }>();

  useEffect(() => {
    if (openOption && downPress) {
      setCursor((prevState) =>
        prevState < data.length - 1 ? prevState + 1 : prevState
      );
    }
  }, [downPress]);

  useEffect(() => {
    if (openOption && upPress) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [upPress]);

  useEffect(() => {
    if (openOption && enterPress) {
      setSearch(data[cursor]['country']);
      setOpenOption(false);
    }
  }, [cursor, enterPress]);

  useEffect(() => {
    if (openOption && hovered) {
      setCursor(data.indexOf(hovered));
    }
  }, [hovered]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '100px',
      }}
    >
      <div>
        <p
          style={{
            fontSize: '18px',
            color: 'white',
          }}
        >
          value: {search}
        </p>

        <div
          style={{
            position: 'relative',
          }}
        >
          <input
            type='text'
            placeholder='Select'
            style={{
              backgroundColor: 'white',
              padding: '8px',
              borderRadius: '8px',
            }}
            value={search}
            onClick={() => setOpenOption(true)}
            readOnly
          />
          {search && (
            <button
              onClick={() => {
                setOpenOption(false);
                setSearch('');
              }}
              style={{
                position: 'absolute',
                top: '50%',
                right: '8px',
                transform: 'translateY(-50%)',
              }}
            >
              X
            </button>
          )}
        </div>
        {openOption && (
          <ul
            style={{
              borderRadius: '8px',
              marginTop: '8px',
              backgroundColor: 'white',
              overflow: 'hidden',
            }}
          >
            {data.map((item, idx) => (
              <li
                style={{
                  backgroundColor: idx === cursor ? 'gray' : 'white',
                  padding: '1px 8px',
                  margin: '0',
                  cursor: 'pointer',
                }}
                key={item.id}
                onMouseEnter={() => {
                  setHovered(item);
                }}
                onMouseLeave={() => setHovered(undefined)}
              >
                <button
                  style={{ width: '100%', textAlign: 'left' }}
                  onClick={() => {
                    setSearch(item.country);
                    setOpenOption(false);
                  }}
                >
                  {item.country}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Ekspektasi hasil */}
      <iframe
        src='/soal2.mp4'
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          border: '1px solid white',
        }}
      ></iframe>
    </div>
  );
}

export default Soal2;
