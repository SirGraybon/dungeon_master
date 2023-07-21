import shareState from "../state/StateContext";
import "../styles/feed.css"

const Feed = function () {
  const { feed } = shareState();

  return (
    <div className="feed">
      {feed.map((event) => {
        return (
          <div className="feedItem">
          <p >
            {event.dateStamp} | {event.timeStamp} :   
          </p>

          <p >
             {event.event}
          </p>
          </div>
        );
      })}
    </div>
  );
};

export default Feed;
