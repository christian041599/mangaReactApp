import { faDiamond, faWarning, faXmarkCircle, faMagicWandSparkles } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import './Title.css';

function Title(props) {

  const [editMode, setEditMode] = useState(false);
  const [coverTitle, setCoverTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [animeAda, setAnimeAda] = useState('');



  useEffect(() => {
    setCoverTitle(props.favManga.coverTitle);
    setAuthorName(props.favManga.authorName);
    setReleaseDate(props.favManga.releaseDate);
    setAnimeAda(props.favManga.animeAda);
  }, []);


  const saveManga = () => {
    setEditMode(false);
    const updatedManga = {coverTitle:coverTitle, authorName:authorName, releaseDate:releaseDate, animeAda:animeAda, id:props.favManga.id, image:props.favManga.image };
    props.updateManga(updatedManga);
  }



  return (
    <div className="card border border-danger">
      <img src={props.favManga.image} alt='Cover Title Art' />
      {!editMode && <ul className="list-group list-group-flush">
        <li className='list-group-item'>{props.favManga.coverTitle}</li>
        <li className='list-group-item'>{props.favManga.authorName}</li>
        <li className='list-group-item'>{props.favManga.releaseDate}</li>
        <li className='list-group-item'>{props.favManga.animeAda}</li>
        <button type='button' className='btn btn-info' onClick={(evt) => setEditMode(true)} >Edit <FontAwesomeIcon icon={faMagicWandSparkles} /></button>
        <button type='button' className='btn btn-warning' onClick={() => props.removeManga(props.favManga)}>Delete Manga <FontAwesomeIcon icon={faWarning} /></button>
      </ul>
      }
      {editMode &&
        <ul className="list-group list-group-flush">
          <li className='list-group-item'>
            <input type='text' className='form-control' value={coverTitle} onChange={(evt) => setCoverTitle(evt.currentTarget.value)} />
          </li>
          <li className='list-group-item'>
            <input type='text' className='form-control' value={authorName} onChange={(evt) => setAuthorName(evt.currentTarget.value)} />
          </li>
          <li className='list-group-item'>
            <input type='text' className='form-control' value={releaseDate} onChange={(evt) => setReleaseDate(evt.currentTarget.value)} />
          </li>
          <li className='list-group-item'>
            <input type='text' className='form-control' value={animeAda} onChange={(evt) => setAnimeAda(evt.currentTarget.value)} />
          </li>
          <li className='list-group item'><button id='btnSave' className='btn btn-info' onClick={saveManga}>Save</button></li>
        </ul>
      }
    </div>

  )
};


export default Title;