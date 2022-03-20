import SearchBar from '../SearchBar/SearchBar';
import './App.css';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import { useState,useEffect } from 'react';
import Spotify from '../../util/spotify';


function App() {

  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  useEffect(() => {
    Spotify.getAccessToken()}, []);

  const addTrack = (track) => {
    if (playlistTracks.find(prevTrack => prevTrack.id === track.id)) return;
    setPlaylistTracks([...playlistTracks, track]);
  };

  const removeTrack =(track) => {
    setPlaylistTracks(playlistTracks.filter(prevTrack => prevTrack.id !== track.id));
  }

  const UpdatePlaylistName = (name) => {
    setPlaylistName(name);
  }

  const savePlaylist = () => {
    const trackURIs = playlistTracks.map((track) => track.uri);
  }

  const search =(searchTerm) => {
    Spotify.search(searchTerm).then((tracks) => {
      setSearchResults(tracks);
  });
};

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={search}/>
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onNameChange={UpdatePlaylistName}
            onRemove={removeTrack}
            onSave={savePlaylist} />
        </div>
      </div>
    </div>
  );
}

export default App;
