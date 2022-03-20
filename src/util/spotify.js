const SpotifyClientID = "0d43a34517364daf8190296db48ac7e3";
const RedirectURL = "http://localhost:3000/";
let userAccessToken;



const Spotify = {
    getAccessToken() {
        
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            userAccessToken = accessTokenMatch[1];

            window.setTimeout(() => (userAccessToken = null), Number(expiresInMatch) * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${SpotifyClientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${RedirectURL}`;

        }
    },
    
    async search(term) {
        
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
            {
                headers: {
                    Authorization: `Bearer ${userAccessToken}`,
                },
            }

        );
        const responseJson= await response.json();


            return responseJson.tracks.items.map((track)=>({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
            }));

        },
    };



export default Spotify;