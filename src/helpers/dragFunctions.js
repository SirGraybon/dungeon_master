//HandleDrag Function
const handleDrag = function (results) {
  console.log(results);
  console.log(cells);
  const { source, destination, type } = results;
  //dropping in play from source: result - add to play area
  if (destination.droppableId !== "source" && source.droppableId === "source") {
    const newData = [...cells];
    const destCell = newData.findIndex(
      (cell) => cell.id === destination.droppableId
    );
    const destIndex = destination.index;
    const token = players[source.index];
    newData[destCell].content.push(token);
    return setCells(newData);
  }

  //Dropping out of bounds: result - no action
  if (!destination) return;
  //droppin in same cell: result - rearange
  if (source.droppableId === destination.droppableId) {
    const newArr = [...players];
    const [moving] = newArr.splice(source.index, 1);

    newArr.splice(destination.index, 0, moving);
    return setPlayers(newArr);
  }
  if (source.droppableId !== destination.droppableId) {
    const newData = [...cells];
    const sourceCell = newData.findIndex(
      (cell) => cell.id === source.droppableId
    );
    const destCell = newData.findIndex(
      (cell) => cell.id === destination.droppableId
    );
    const destIndex = destination.index;
    const [moving] = newData[sourceCell].content.splice(source.index, 1);
    newData[destCell].content.splice(destIndex, 0, moving);
    console.log(newData);

    return setCells(newData);
  }
};

export default handleDrag;
