import shareState from "../state/StateContext"

const Feed = function(){
const {feed} = shareState()

  return(
feed.map((event) => {
  return <p>{event.dateStamp} | {event.timeStamp} | {event.event}</p>
})
  )
}

export default Feed