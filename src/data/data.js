import wizard from "../assets/avatars/wizard2.png"
import warrior from "../assets/avatars/barbarian.png"
import rogue from "../assets/avatars/thief.png"

const DATA = {

  playerDATA: [
    { id: 1, characterName: "Bim", class: "Wizard", avatar: wizard, location: 0, max_health: 100, current_health: 100, gold: 0, player_inventory: [] },
    { id: 2, characterName: "Bam", class: "Warrior", avatar: warrior, location: 0, max_health: 100, current_health: 100, gold: 0, player_inventory: [] },
    { id: 3, characterName: "Bom", class: "Rogue", avatar: rogue, location: 0, max_health: 100, current_health: 100, gold: 0, player_inventory: [] },
  ],
  
 cellDATA: []
}

for (let i = 0; i < 400; i++) {
  DATA.cellDATA.push({ id: `${i}`, content: [] });
}

export default DATA