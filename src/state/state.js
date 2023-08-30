////////////////////IMPORTs ////////////////////////////////////////////////////////////
import { playerDATA, cellDATA } from "../data/data";
import grass from "../assets/terrain/grass.png";
import boulder from "../assets/terrain/boulder.png";
import dirt from "../assets/terrain/dirt.png";
import snow from "../assets/terrain/snow.png";
import snow2 from "../assets/terrain/snow2.png";
import sand1 from "../assets/terrain/sand1.png";
import sand2 from "../assets/terrain/sand2.png";

// const StateHook = function () {
export const defaultState = {
  // data: data,
  players: playerDATA,
  cells: cellDATA,
  board_column: 10,
  board_row: 10,
  selectedPlayer: "diceBowl",
  display: "minimap",
  feed: [],
  dice: [],
  terrainOptions: [grass, dirt, snow, snow2, sand1, sand2],
  terrainBrush: null,
  user: "DungeonMaster",
  droppableCells: [],
  boardDirectionAnimation: {}

};

////////////////////DATE / TIME VARIABLEs////////////////////////////////////////////////////////////
let months = [
  "placeholder",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]; // Months as strings
let year;
let month;
let day;
let hours;
let min;
let sec;

const updateDateTime = function () {
  year = new Date().getFullYear(); //To get the Current Year
  month = new Date().getMonth() + 1; //To get the Current Month
  day = new Date().getDate(); //To get the Current Day
  hours = new Date().getHours().toFixed(.1); //To get the Current Hours
  min = new Date().getMinutes().toFixed(.1); //To get the Current Minutes
  sec = new Date().getSeconds().toFixed(.1); //To get the Current Secondsconsole.log(date)
};

////////////////////REDUCER SWITCH CASEs////////////////////////////////////////////////////////////
export const reducer = function (state, action) {
  switch (action.type) {
    ////////////////////DICE////////////////////////////////////////////////////////////
    case "EDIT_DICE": {
      return {
        ...state,
        dice: action.payload,
      };
    }

    case "ROLL_DIE": {
      return {
        ...state,
        dice: action.payload,
      };
    }
    ////////////////////DATA////////////////////////////////////////////////////////////
    case "UPDATE_DATA": {
      return {
        ...state,
        players: action.players,
        cells: action.cells,
      };
    }
    ////////////////////DISPLAY////////////////////////////////////////////////////////////
    case "SET_DISPLAY": {
      if (action.displayType !== "player") {
        return {
          ...state,
          display: action.displayType,
        };
      }
      return {
        ...state,
        display: action.displayType,
        selectedPlayer: action.player,
      };
    }
    ////////////////////TERRAIN////////////////////////////////////////////////////////////

    case "EDIT_TERRAIN": {
      const newCells = [ ...state.cells] ;
      newCells[state.board_row][state.board_column][action.payload].background =
        state.terrainBrush;

      return {
        ...state,
        cells: newCells,
      };
    }
    case "SET_TERRAIN_BRUSH": {
      const brush = action.payload;
      return { ...state, terrainBrush: brush };
    }
    ////////////////////MOVE BOARD////////////////////////////////////////////////////////////
    case "MOVE_BOARD": {
      return { ...state, board_row: action.row, board_column: action.column, boardDirectionAnimation: action.direction };
    }

    case "POPULATE_MAP": {
      const newCells = [ ...state.cells] ;
      for (let i = 0; i < 400; i++) {
        for (let i = 0; i < 400; i++) {
          let background = snow2;
          if(action.row < 4) {

            const roll = Math.floor(Math.random() * 10) + 1;
            background = snow2;
            if (roll > 1) {
              background = snow;
            }
          }
          if(action.row === 4) {

            const roll = Math.floor(Math.random() * 10) + 1;
            background = snow;
            if (roll > 7) {
              background = grass;
            }
          }
          if(action.row ===5) {

            const roll = Math.floor(Math.random() * 10) + 1;
            background = snow;
            if (roll > 1) {
              background = grass;
            }
          }
          if(action.row > 5 && action.row < 15) {

            const roll = Math.floor(Math.random() * 10) + 1;
            background = dirt;
            if (roll > 1) {
              background = grass;
            }
          }
          if(action.row === 15) {

            const roll = Math.floor(Math.random() * 10) + 1;
            background = sand1;
            if (roll > 1) {
              background = grass;
            }
          }
          if(action.row === 16) {

            const roll = Math.floor(Math.random() * 10) + 1;
            background = sand1;
            if (roll > 7) {
              background = grass;
            }
          }
          if(action.row > 16) {

            const roll = Math.floor(Math.random() * 10) + 1;
            background = sand2;
            if (roll > 1) {
              background = sand1;
            }
          }







          newCells[action.row][action.column].push({
            id: `${i}`,
            content: [],
            background,
          });
        }

        return { ...state, cells: newCells, };
      }
    }
    ////////////////////FEED////////////////////////////////////////////////////////////
    case "POST_MESSAGE": {
      updateDateTime();

      const dateStamp = `${months[month]}, ${day} ${year}`;
      const timeStamp = `${hours}:${min}:${sec}`;
      const currentFeed = [...state.feed];
      const feedUpdate = {
        event: action.payload,
        time: timeStamp,
        postType: action.postType,
        user: state.user,
      };
      const todayIndex = currentFeed.findIndex(
        (item) => item.day === dateStamp
        );

        if (todayIndex === -1) {
          currentFeed.push({ day: dateStamp, feed: [feedUpdate] });
        } else {
          currentFeed[todayIndex].feed.push(feedUpdate);
        }
        return {
          ...state,
          feed: currentFeed,
        };
      }
      ////////////////////CHECK DROP ALLOWED////////////////////////////////////////////////////////////
  case "CHEC_DROP_ALLOWED": {
    return{
      ...state,
      droppableCells: action.payload
    }
  }
    }
};

export default reducer;
