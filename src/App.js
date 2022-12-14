import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { nanoid } from 'nanoid';
import React, { useState, useEffect } from 'react';
import AddManga from './Components/AddManga';
import _ from 'lodash';
import Title from './Components/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';



function App() {

  const [allManga, setAllManga] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [keywords, setKeywords] = useState('');
  const [releaseDate, setReleaseDate] = useState('');


  useEffect(() => {
    if (localStorage) {
      const favMangaLocalStorage = JSON.parse(localStorage.getItem('favManga'));

      if (favMangaLocalStorage) {
        saveManga(favMangaLocalStorage);
      } else {
        saveManga(favManga)
      }
    }
  }, []);


  const saveManga = (favManga) => {
    setAllManga(favManga);
    setSearchResults(favManga);

    if (localStorage) {
      localStorage.setItem('favManga', JSON.stringify(favManga))
      console.log('Saved to local storage');
    }
  }

  const addNewManga = (newManga) => {
    const updatedManga = [...allManga, newManga];
    saveManga(updatedManga);
  }


  const searchManga = () => {
    let keywordsArray = [];

    if (keywords) {
      keywordsArray = keywords.toLowerCase().split(' ');
    }


    if (releaseDate) {
      keywordsArray.push(releaseDate.toString());
    }


    if (keywordsArray.length > 0) {
      const searchResults = allManga.filter(favManga => {
        for (const word of keywordsArray) {
          if (favManga.coverTitle.toLowerCase().includes(word) ||
            favManga.authorName.toLowerCase().includes(word) ||
            favManga.releaseDate === parseInt(word)) {
            return true;
          }
        }
        return false;
      });
      setSearchResults(searchResults);
    } else {
      setSearchResults(allManga);
    }



  }


  const removeManga = (favMangaToDelete) => {
    console.table(favMangaToDelete);
    const updatedMangaArray = allManga.filter(favManga => favManga.id !== favMangaToDelete.id);
    saveManga(updatedMangaArray);
  }


  const updateManga = (updatedManga) => {
    // console.table(updatedManga);
    const updatedMangaArray = allManga.map(favManga => favManga.id === updatedManga.id ? { ...favManga, ...updatedManga } : favManga);
    saveManga(updatedMangaArray);
  }


  const favManga = [
    {
      id: nanoid(),
      coverTitle: 'Tokyo Ghoul',
      authorName: 'Sui Ishida',
      releaseDate: 2011,
      animeAda: 'Yes, there is an adaptation: Recommended',
      image: 'images/mangacover1.jpg'
    },

    {
      id: nanoid(),
      coverTitle: 'Uzumaki',
      authorName: 'Junji Ito',
      releaseDate: 1999,
      animeAda: 'Yes, there is an adaptation: Not Recommended',
      image: 'images/mangacover2.jpg'
    },

    {
      id: nanoid(),
      coverTitle: 'Seraph of the End',
      authorName: 'Takaya Kagami',
      releaseDate: 2012,
      animeAda: 'Yes, there is an adaptation: Highly Recommended',
      image: 'images/mangacover3.jpg'
    },

    {
      id: nanoid(),
      coverTitle: 'Noragami',
      authorName: 'Adachitoka',
      releaseDate: 2010,
      animeAda: 'Yes, there is an adaptation: Highly Recommended',
      image: 'images/mangacover4.jpg'
    },

    {
      id: nanoid(),
      coverTitle: 'Jujutsu Kaisen',
      authorName: 'Gege Akutami',
      releaseDate: 2018,
      animeAda: 'Yes, there is an adaptation: Must watch',
      image: 'images/mangacover5.jpg'
    },

    {
      id: nanoid(),
      coverTitle: 'Blame!',
      authorName: 'Tsutomu Nihei',
      releaseDate: 1997,
      animeAda: 'Yes, there is an adaptation: Not Recommended',
      image: 'images/mangacover6.jpg'
    },

    {
      id: nanoid(),
      coverTitle: 'Berserk',
      authorName: 'Kentaro Miura',
      releaseDate: 1988,
      animeAda: 'Yes, there is an adaptation: Not Recommended',
      image: 'images/mangacover7.jpg'
    },

    {
      id: nanoid(),
      coverTitle: 'Death Note',
      authorName: 'Tsugumi Ohba',
      releaseDate: 2003,
      animeAda: 'Yes, there is an adaptation: Must watch',
      image: 'images/mangacover8.jpg'
    },

    {
      id: nanoid(),
      coverTitle: 'Vagabond',
      authorName: 'Takehiko Inoue',
      releaseDate: 1998,
      animeAda: 'No, there is an adaptation. Possibly soon',
      image: 'images/mangacover9.jpg'
    },

    {
      id: nanoid(),
      coverTitle: 'Hunter X Hunter',
      authorName: 'Yoshihiro Togashi',
      releaseDate: 1998,
      animeAda: 'Yes, there is an adaptation: Highly Recommended',
      image: 'images/mangacover10.jpg'
    },

    {
      id: nanoid(),
      coverTitle: 'Toradora',
      authorName: 'Yuyuko Takemiya',
      releaseDate: 2011,
      animeAda: 'Yes, there is an adaptation: Highly Recommended',
      image: 'images/mangacover11.jpg'
    },

    {
      id: nanoid(),
      coverTitle: 'Demon Slayer',
      authorName: 'Koyoharu Gotouge',
      releaseDate: 2016,
      animeAda: 'Yes, there is an adaptation: Must watch',
      image: 'images/mangacover12.jpg'
    },
  ];

  return (
    <div className='container'>

      <div className="row" id='allManga'>
        <div className='fs-1 text-center badge rounded-pill text-bg-danger mb-5  text-black border border-dark'>Manga Library<i className="fa-solid fa-book me-3"></i></div>

        {searchResults && searchResults.map((favManga) => (
          <div className="col-lg-2" key={favManga.id}>
            <Title favManga={favManga} removeManga={removeManga} updateManga={updateManga} />
          </div>)
        )}

      </div>
      <AddManga addNewManga={addNewManga} />


      <div className="row mt-5" id='searchPage'>
        <h3 className='fs-1 text-black badge rounded-pill text-bg-danger'>Search</h3>
        <div className="col-lg-2 mx-2">
          <label htmlFor="txtKeywords" className='text-danger fs-2'>Title</label>
          <input type="text" className='form-control' placeholder='Title or Release Date' onChange={evt => setKeywords(evt.currentTarget.value)} value={keywords} />
        </div>

        <div className="col-lg-2 mx-2 mt-5">
          <select value={releaseDate} onChange={evt => setReleaseDate(evt.currentTarget.value)} className='form-select'>
            <option value="">Select Year</option>
            {_(allManga).map(favManga => favManga.releaseDate).sort().uniq().map(year => <option key={year} value={year}>{year}</option>).value()}
          </select>
        </div>

        <div className="col-lg-4 mt-5">
          <button type='button' className='btn btn-danger btn-lg text-black' onClick={searchManga}>Search Manga <FontAwesomeIcon icon={faSearch} /></button>
        </div>
      </div>


    </div>




  );
}

export default App;
