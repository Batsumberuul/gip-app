import Image from "next/image";
import localFont from "next/font/local";
import { useEffect, useState } from "react";

export default function Home() {
  const [gifs, setGifs] = useState([]);
  const [search, setSearch] = useState("trending");
  const url = `https://api.giphy.com/v1/gifs/search?api_key=fD8jJxrWrLZDuJOw2D1hfOk2B4F7LTb7&q=trending&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
  useEffect(() => {
    const getgifs = async () => {
      const respose = await fetch(url);
      const { data } = await respose.json();

      console.log(data);
      setGifs(data);
    };

    getgifs();
  }, []);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  const handleClick = async () => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=fD8jJxrWrLZDuJOw2D1hfOk2B4F7LTb7&q=${search}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
    const respose = await fetch(url);
    const { data } = await respose.json();
    console.log(data);
    setGifs(data);
  };
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-50"
          defaultValue={search}
          onChange={handleChange}
        ></input>
        <button onClick={handleClick}>Submit</button>
      </div>
      <div className="grid grid-cols-4">
        {gifs.map((gif) => {
          return (
            <img
              key={gif.id}
              src={gif.images.fixed_width.url}
              className="w-[300px] h-[200px]"
            />
          );
        })}
      </div>
    </div>
  );
}
