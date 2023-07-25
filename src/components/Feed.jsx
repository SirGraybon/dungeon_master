import { useState } from "react";
import shareState from "../state/StateContext";
import "../styles/feed.css";

const Feed = function () {
  const [message, setMessage] = useState("");
  const { feed, postMessage } = shareState();
  console.log(feed)

  const updateMessage = function (event) {
    setMessage(event.target.value);
  };

  const prepPost = function () {
    postMessage(message, "message");
    setMessage("");
  };

  return (
    <div className="feed">
      <div className="feedLog">
        {feed.map((event) => {
          return (
            <div className="feedItem">
              <div> -- {event.day} -- </div>
              {event.feed.map((item) => {
                return (
                  <div>
                    <div>{item.time} : {item.user} {item.event} </div>

                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="textInput">
        <textarea
          name="message"
          value={message}
          onChange={updateMessage}
        ></textarea>
        <button onClick={() => prepPost()}></button>
      </div>
    </div>
  );
};

export default Feed;
