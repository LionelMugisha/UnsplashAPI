import { useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';

function Main() {
    const clientId = "Ujio-nG7A240G-Hj4XtpMDgKnriKSl_REd9SUsgOZNY";
    const [photo, setPhotos] = useState("");
    const [result, setResult] = useState([]);

    function handleChange(event){
      setPhotos(event.target.value);
    }

    const handleSubmit = async (e) =>{
      e.preventDefault();
      const url = await "https://api.unsplash.com/search/photos?page=1&query="+photo+"&client_id="+clientId+"&count=10";
      axios.get(url)
        .then((response) => {
          console.log(response);
          setResult(response.data.results);
       })
    }
    
    const fetchSubmit = async () => {
      for(let i=2;i<=10;i++){
        const res = await axios.get("https://api.unsplash.com/search/photos?page="+i+"&query="+photo+"&client_id="+clientId+"&count=10")
        const data = res.data.results;
        return data;
      }
    }

    const fetchData = async () => {
      const caughtData = await fetchSubmit();
      setResult([...result,...caughtData]);
    }

  return (
    <>
        <div className="flex justify-center mb-5">
                  <form className="w-full max-w-md">
                      <div className="flex items-center border-b border-teal-800 py-2">
                          <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 text-lg py-1 px-2 leading-tight focus:outline-none" 
                          type="text" 
                          placeholder="Search for picture" 
                          required
                          onChange={handleChange}
                          />
                          <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" 
                          type="submit"
                          onClick={handleSubmit}
                          >
                          Search
                          </button>
                      </div>
                  </form>
        </div>
              <div className="border border-black max-w-2xl mx-auto rounded-sm mb-3">
                <InfiniteScroll
                  dataLength={result.length} 
                  next={fetchData}
                  hasMore={true}
                  loader={<Loader />}
                  endMessage={
                    <p style={{ textAlign: 'center' }}>
                      <b>Yay! You have seen it all</b>
                    </p>
                  }
                  >
                        <div className="flex flex-wrap content-evenly ml-1 mr-2">
                          {result.map((photo) => (
                                  <div key={photo.id} className="mt-2 ml-1 flex">
                                    <Link to={`picture/${photo.id}`} >
                                      <img src={photo.urls.thumb} 
                                      alt={photo.alt_description}
                                      />
                                    </Link>
                                  </div>
                          ))}
                        </div>
                </InfiniteScroll>
              </div>

    </>
  );
}

export default Main;
