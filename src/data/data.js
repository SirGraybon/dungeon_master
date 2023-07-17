import wizard from "../assets/avatars/wizard2.png";
import warrior from "../assets/avatars/barbarian.png";
import rogue from "../assets/avatars/thief.png";
import placeHolder from "../assets/items/potion.png";

const DATA = {
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
        {item: "Health Potion", uses: 1, unitWeight: 15, qty: 1, get totalWeight() {this.totalWeight = this.unitWeight * this.qty } , token: placeHolder, description: "Heals user for 25HP"},
      ],
      stats: {
        Dex: 10,
        Str: 10,
        Con: 10,
        Int: 10,
        Chr: 10,
        Wis: 10,
      },
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
    },
  ],

  cellDATA: [],
};

for (let i = 0; i < 400; i++) {
  DATA.cellDATA.push({ id: `${i}`, content: [] });
}

export default DATA;
