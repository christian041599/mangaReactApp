import React, { useState } from "react";
import { nanoid } from 'nanoid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import './AddManga.css';
// random comment


function AddManga(props) {
  const [coverTitle, setCoverTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [animeAda, setAnimeAda] = useState('');
  const [selectedFile, setSelectedFile] = useState('');


  const doWork = () => {
    const newManga = { 'id': nanoid(), 'coverTitle': coverTitle, 'authorName': authorName, 'releaseDate': parseInt(releaseDate), 'animeAda': animeAda, 'image': URL.createObjectURL(selectedFile) };
    props.addNewManga(newManga);
  }

  const imageUpdate = (event) => {
    setSelectedFile(event.target.files[0]);
  }


  return (
    <div className="container" >
      <div className="row mt-5 " id="addManga">
        <h3 className="mb-5 fs-1 text-black badge rounded-pill text-bg-danger">Add Manga</h3>
        <div className="col-lg-2 ">
          <label htmlFor="txtTitleName" className="form-label text-danger">Title Name</label>
          <input type="text" id="txtTitleName" placeholder="Title Name" className="form-control" onChange={(evt) => setCoverTitle(evt.currentTarget.value)} value={coverTitle} />
        </div>
        <div className="col-lg-2">
          <label htmlFor="txtAuthorName" className="form-label text-danger">Author Name</label>
          <input type="text" id="txtAuthorName" placeholder="Author Name" className="form-control" onChange={(evt) => setAuthorName(evt.currentTarget.value)} value={authorName} />
        </div>
        <div className="col-lg-2">
          <label htmlFor="txtReleaseDate" className="form-label text-danger">Release Date</label>
          <input type="text" id="txtReleaseDate" placeholder="Release Date" className="form-control" onChange={(evt) => setReleaseDate(evt.currentTarget.value)} value={releaseDate} />
        </div>
        <div className="col-lg-2">
          <label htmlFor="txtAnimeAda" className="form-label text-danger">Anime Adaptation?</label>
          <input type="text" id="txtAnimeAda" placeholder="Yes or No?" className="form-control" onChange={(evt) => setAnimeAda(evt.currentTarget.value)} value={animeAda} />
        </div>
        <div className="col-lg-2">
          <label htmlFor="fileUpload" className="form-label text-danger">Cover Image</label>
          <input type="file" name="file" id="fileUpload" className="form-control" onChange={imageUpdate} />
        </div>
        <div className="col-lg-2">
          <button className="btn btn-danger btn-lg mt-4 text-black" id="btnAdd" type="button" onClick={doWork}>Add Manga <FontAwesomeIcon icon={faPlusCircle} /></button>
        </div>
      </div>
    </div>
  )

}


export default AddManga;