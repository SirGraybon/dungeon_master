//HandleDrag Function
const handleDrag = function (results) {
  
  const { source, destination, type } = results;
  const newData = { ...data };
  const destCell = newData.cellDATA.findIndex(
    (cell) => cell.id === destination.droppableId
  );
  const destIndex = destination.index;

  //dropping in play from source: result - add to play area
  if (
    destination.droppableId !== "source" &&
    source.droppableId === "source"
  ) {
    const sourceIndex = newData.playerDATA.findIndex(
      (player) => player.characterName === results.draggableId
    );

    const currentLocation = newData.playerDATA[sourceIndex].location;

    const token = newData.playerDATA[source.index];
    newData.cellDATA[destCell].content.push(token);
    if (currentLocation > 0) {
      newData.cellDATA[currentLocation].content = [];
    }
    newData.playerDATA[sourceIndex].location = destCell;

    return setData(newData);
  }

  //Dropping out of bounds: result - no action
  if (!destination) return;

  //droppin in same cell: result - rearange

  if (source.droppableId !== destination.droppableId) {
    const sourceCell = newData.cellDATA.findIndex(
      (cell) => cell.id === source.droppableId
    );

    const [moving] = newData.cellDATA[sourceCell].content.splice(
      source.index,
      1
    );
    newData.cellDATA[destCell].content.splice(destIndex, 0, moving);

    return setData(newData);
  }
};

export default handleDrag;
