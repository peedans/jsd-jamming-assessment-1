import "./Tracklist.css"
import Track from "../Track/Track";



const Tracklist = ({ lists, isRemoval, onAdd,onRemove }) => {
  return (
    <div className="TrackList">
      {lists &&
        lists.map((track) => (
          < Track
            key={track.id}
            track={track}
            isRemoval={isRemoval}
            onAdd={onAdd}
            onRemove={onRemove}
          />))}
    </div>
  )
}

export default Tracklist;