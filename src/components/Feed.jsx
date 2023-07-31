import { useState } from "react";
import shareState from "../state/StateContext";
import "../styles/feed.css";

const Feed = function () {
  const [message, setMessage] = useState("");
  const { feed, postMessage } = shareState();

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
                if (item.postType !== "message") {
                  return (
                    <div className="lineItem">
                      <div>[ {item.time} ] </div>
                      <div className="user">{item.user} </div>
                      <div className="content"> {item.event} </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="lineItem">
                      <div>[ {item.time} ] </div>
                      <div className="user">{item.user} says: </div>
                      <div> "{item.event}" </div>
                    </div>
                  );
                }
              })}
            </div>
          );
        })}
      </div>
      <div className="textInput">
        <textarea
        className="chatBox"
          name="message"
          value={message}
          onChange={updateMessage}
        ></textarea>
        <button className="sendMessageButton" onClick={() => prepPost()}>⇉</button>
      </div>
    </div>
  );
};

export default Feed;
