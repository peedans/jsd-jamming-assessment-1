import "./SearchResults.css";
import Tracklist from "../Tracklist/Tracklist";

const SearchResults = ({searchResults,onAdd}) => {

    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <Tracklist lists={searchResults} onAdd={onAdd} isRemovel={false} />
        </div>
    );
};


    export default SearchResults;