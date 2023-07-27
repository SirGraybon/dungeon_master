////////////////////IMPORTs ////////////////////
import wizard from "../assets/avatars/wizard2.png";
import warrior from "../assets/avatars/barbarian.png";
import rogue from "../assets/avatars/thief.png";
import placeHolder from "../assets/items/potion.png";
import helm from "../assets/items/helm.png";
import torso from "../assets/items/torso.png";
import metaltorso from "../assets/items/metaltorso.png";
import grass from "../assets/terrain/grass.png"


const data = {
  playerDATA: [
    {
      id: 1,
      characterName: "Bim",
      class: "Wizard",
      avatar: wizard,
      level: 6,
      location: 0,
      max_health: 100,
      current_health: 100,
      gold: 0,
      player_inventory: [
        {item: "Health Potion", uses: 1, unitWeight: 15, qty: 1, get totalWeight() {this.totalWeight = this.unitWeight * this.qty } , token: placeHolder, description: "Heals user for 25HP"},
        {item: "Mana Potion", uses: 1, unitWeight: 15, qty: 1, get totalWeight() {this.totalWeight = this.unitWeight * this.qty } , token: placeHolder, description: "Replenishes 25MP"},


      ],
      stats: {
        Dex: 10,
        Str: 10,
        Con: 10,
        Int: 10,
        Chr: 10,
        Wis: 10,
      },
      equipment: {head:{}, torso: {}, belt: {}, legs: {}, gloves: {}, right: {}, boots: {}, amulet: {}, left: {}, ring: {}}
    },
    {
      id: 2,
      characterName: "Bam",
      class: "Warrior",
      avatar: warrior,
      level: 6,
      location: 0,
      max_health: 100,
      current_health: 100,
      gold: 0,
      player_inventory: [
        {item: "Health Potion", item_type: "consumable", uses: 1, unitWeight: 15, qty: 1, get totalWeight() {this.totalWeight = this.unitWeight * this.qty } , token: placeHolder, description: "Heals user for 25HP"},
        {item: "metal helmet", item_type: "head", uses: 1, unitWeight: 15, qty: 1, get totalWeight() {this.totalWeight = this.unitWeight * this.qty } , token: helm, description: ""},
        {item: "metal plate", item_type: "torso", uses: 1, unitWeight: 15, qty: 1, get totalWeight() {this.totalWeight = this.unitWeight * this.qty } , token: metaltorso, description: ""},
      ],
      stats: {
        Dex: 10,
        Str: 10,
        Con: 10,
        Int: 10,
        Chr: 10,
        Wis: 10,
      },
      equipment: {head: [], torso: [{item: "leather plate", item_type: "torso", uses: 1, unitWeight: 15, qty: 1, get totalWeight() {this.totalWeight = this.unitWeight * this.qty } , token: torso, description: ""}], belt: [], legs: [], gloves: [], right: [], boots: [], amulet: [], left: [], ring: []} 
    },
    {
      id: 3,
      characterName: "Bom",
      class: "Rogue",
      avatar: rogue,
      level: 6,
      location: 0,
      max_health: 100,
      current_health: 100,
      gold: 0,
      player_inventory: [


      ],
      stats: {
        Dex: 10,
        Str: 10,
        Con: 10,
        Int: 10,
        Chr: 10,
        Wis: 10,
      },
      equipment: {head:{}, torso: {}, belt: {}, legs: {}, gloves: {}, right: {}, boots: {}, amulet: {}, left: {}, ring: {}}
    },
  ],

  cellDATA: [],
};

for (let i = 0; i < 400; i++) {
  data.cellDATA.push({ id: `${i}`, content: [], background: grass });
}

export default data;
