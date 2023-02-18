let last = town;
let combattext;
let equipped = 1;
let opponent;
let equipment = [0, 'Puny Stick'];

const button0 = document.querySelector('#button0');
const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3')
const text = document.querySelector('#text');
const lvl = document.querySelector('#lvl')
const xp = document.querySelector('#xp');
const nextlvl = document.querySelector('#nextlvl');
const hp = document.querySelector('#hp');
const maxhp = document.querySelector('#maxhp');
const gld = document.querySelector('#gld');
const enemies = document.querySelector('#enemies');
const enemy = document.querySelector('#enemy');
const enemylvl = document.querySelector('#enemylvl');
const enemyhp = document.querySelector('#enemyhp');
const maxenemyhp = document.querySelector('#maxenemyhp');
const slide = document.querySelector('#slide');
const locations = [
    {name: 'Town',
    btext: ['Go to Store', 'Go to Boar Cave', 'Fight King Pig'],
    bfuncs: [store, cave, king],
    text: 'You are in the town square. You see a sign that says "Store".',
    slide: ''},

    {name: 'Store',
    btext: ['Buy HP Potion (20 GLD)', 'Buy new Weapon (90 GLD)', 'Go back to Town'],
    bfuncs: [getpotion, getdagger, town],
    text: 'You enter the Store. This establishment seems to never run out of Potions.',
    slide: ''},

    {name: 'Boar_Cave',
    btext: ['Fight Small Pig', 'Fight Ferocious Boar', 'Go back to Town'],
    bfuncs: [smallpig, boar, town],
    text: 'You enter the Boar Cave. Something smells off.',
    slide: ''},

    {name: 'Inventory',
    btext: ['Drink HP Potion (+10% HP)', 'Use Map', 'Equip Weapon'],
    bfuncs: [drink, map, equip],
    text: 'You are viewing your Inventory. Your trusty Map guides you.',
    slide: ''},

    {name: 'Combat',
    btext: ['Attack', 'Defend', 'Flee'],
    bfuncs: [attack, defend, flee],
    text: 'You are in Combat.',
    slide: ''}
];
const pigs = [
    {name: 'Small Pig',
    elvl: [1, 3],
    ehp: 15,
    actions: [[' Attacks!', 12, ' tackles you, dealing '], [' Attacks!', 5, ' fumbles cutely, and inflicts '], [' Attacks!', 7, ' trips over and into you, dealing '],
    [' Defends!', 3, ' hides behind a rock and blocks '], [' Heals!', 5, ' eats some wild berries and recovers '], [' Flees!', 0, ' makes a run for it. ']],
    desc: ' The Small Pig stares at you.'},

    {name: 'Ferocious Boar',
    elvl: [16, 22],
    ehp: 50,
    actions: [[' Attacks!', 50, ' charges straight through you, dealing '], [' Attacks!', 10, '\'s charge barely grazes you, dealing '], [' Attacks!', 20, ' bites into your flesh, '],
    [' Defends!', 10, ' uses his tusks to deflect '], [' Heals!', 3, ' takes a quick nap. Heals '], [' Invokes!', 0, ' is imbued with Boar Strength for next ']],
    desc: ' The Ferocious Boar huffs and readies a charge.'},

    {name: 'King Pig',
    elvl: [50, 51],
    ehp: 500,
    actions: [[' Attacks!', 100, ' devastates you, dealing '], [' Attacks!', 40, ' aimlessly stomps around, dealing '], [' Attacks!', 10, ' huffs, and sends you flying for '],
    [' Defends!', 100, '\'s skin becomes impenetrable, preventing '], [' Craves!', 0, ' You are swallowed whole. ' ], [' Craves!', 0, ' You are swallowed whole. ']],
    desc: ' The King Pig towers before you.'}
];
const weapons = [
    {name: 'Puny_Stick',
    damage: 5,
    desc: 'A short wooden Stick. You can\'t seem to remember where you got it.'},

    {name: 'Basic_Dagger',
    damage: 20,
    desc: 'A common stabby-stabby, made of iron. Used to stabby-stab some Pigs.'},

    {name: 'Staff_of_Oink',
    damage: 1,
    desc: 'An enchanted wooden Stick. Imbues you with the strength of 100 Boars.'},

    {name: 'Hero\'s_Butcher_Knife',
    damage: 100,
    desc: 'The Hero\'s blood courses through your veins. There are Pigs to be flain.'}
];

button0.onclick = store;
button1.onclick = cave;
button2.onclick = king;
button3.onclick = inventory;

function update(location) {
    button0.innerText = location.btext[0];
    button1.innerText = location.btext[1];
    button2.innerText = location.btext[2];
    button3.innerText = 'View Inventory';
    button0.onclick = location.bfuncs[0];
    button1.onclick = location.bfuncs[1];
    button2.onclick = location.bfuncs[2];
    button3.onclick = inventory;
    text.innerText = location.text;
    slide.src = location.slide;
    slide.alt = location.name;
}

function town() {
    update(locations[0]);
    last = town;
}

function store() {
    update(locations[1]);
    last = store;
}

function cave() {
    update(locations[2]);
    last = cave;
}

function inventory() {
    combattext = text.innerText
    update(locations[3]);
    enemies.style.display = 'none';
    text.innerText = 'You are viewing your Inventory. Your trusty Map guides you.\n' + textupdate();
    button3.innerText = 'Close Inventory';
    button3.onclick = last;
}

function combat() {
    last = combat;
    update(locations[4]);
    slide.src = '';
    slide.alt = pigs[opponent].name;
    enemies.style.display = 'block';
    if (!enemy.innerText) {
        enemy.innerText = pigs[opponent].name;
        enemylvl.innerText = randnum(pigs[opponent].elvl[0], pigs[opponent].elvl[1]);
        var bhp = Math.ceil((Number(pigs[opponent].ehp) + pigs[opponent].ehp * enemylvl.innerText / 3.53)**(1-enemylvl.innerText/500)) - Math.ceil(pigs[opponent].ehp/5) - 4;
        enemyhp.innerText = randnum(bhp-3,bhp+5);
        maxenemyhp.innerText = enemyhp.innerText;
        text.innerText += pigs[opponent].desc;
        combattext = text.innerText
    } else {
        text.innerText = combattext
    }
    if (enemylvl.txt == '50') {
        enemylvl.txt = 'MAX'
    }
}

function attack() {
    if (enemylvl.txt == 'MAX') {
        enemylvl.txt = '50'
    }
    text.innerText = combattext;
    var dplayer = Math.ceil((Number(weapons[equipped-1].damage) + lvl.innerText * weapons[equipped-1].damage / 10)**(1-lvl.innerText/1000)) - Math.ceil(weapons[equipped-1].damage/10) + 5;
    dplayer = randnum(dplayer - 3, dplayer + 3);
    var action = pigs[opponent].actions[randnum(0, 6)];
    var denemy = Math.ceil((action[1] + action[1] * enemylvl.innerText / 20)**(1-enemylvl.innerText/500)) + Math.ceil(action[1]*enemylvl.innerText/500) + 6;
    denemy = randnum(denemy - 2, denemy + 1);
    var defense = Math.floor(4 * hp.innerText ** (lvl.innerText/100) * lvl.innerText ** (1/12)) + 8
    defense = randnum(defense - 3, defense + 4)
    denemy -= defense
    switch (action[0]) {
        case ' Attacks!':
            if (randnum(0, 2) == 0) {
                text.innerText += '\nYou Attack!'
                add(enemyhp, -1 * dplayer)
                text.innerText += ' You deal ' + dplayer + ' Damage to ' + pigs[opponent].name + '!'
                if (Number(enemyhp.innerText) <= 0) {
                    enemyhp.innerText = 0;
                    victory();
                    break;
                }
                text.innerText += '\n' + pigs[opponent].name + action[0]
                add(hp, -1 * denemy)
                text.innerText += ' ' + pigs[opponent].name + action[2] + denemy + ' Damage!'
                if (Number(hp.innerText) >= 20) {
                    hp.innerText = 20;
                }
                if (Number(hp.innerText) <= 0) {
                    hp.innerText = 0;
                    loss();
                }
            } else {
                text.innerText += '\n' + pigs[opponent].name + action[0]
                add(hp, -1 * denemy)
                text.innerText += ' ' + pigs[opponent].name + action[2] + denemy + ' Damage!'
                if (Number(hp.innerText) >= 20) {
                    hp.innerText = 20;
                }
                if (Number(hp.innerText) <= 0) {
                    hp.innerText = 0;
                    loss();
                    break;
                }
                text.innerText += '\nYou Attack!'
                add(enemyhp, -1 * dplayer)
                text.innerText += ' You deal ' + dplayer + ' Damage to ' + pigs[opponent].name + '!'
                if (Number(enemyhp.innerText) <= 0) {
                    enemyhp.innerText = 0;
                    victory();
                }
            }
            break;
        case ' Defends!':
            pass
            break;
        default:
            console.log(action[0])
    }
    if (enemylvl.txt == '50') {
        enemylvl.txt = 'MAX'
    }
}

function defend() {
    //player always goes second
}

function flee() {
    if (randnum(0, 2) == 0) {
            
    }
}

function victory() {
    console.log('victory!')
}

function loss() {
    console.log('loss!')
}

function getpotion() {
    if (gld.innerText >= 20) {
        add(gld, -20);
        equipment[0] += 1;
        text.innerText = `You recieve 1 HP Potion!\nCurrently in possesion: ${equipment[0]}.`;
    } else {
        text.innerText = 'Not enough GLD for HP Potion!';
    }
}

function getdagger() {
    if (!equipment.includes('Basic Dagger')) {
        if (gld.innerText >= 90) {
            add(gld, -90);
            text.innerText = 'You recieve Basic Dagger!';
            equipment.push('Basic Dagger');
        } else {
            text.innerText = 'Not enough GLD for Weapon!';
        }
    } else {
        text.innerText = 'You already have this Weapon!';
    }
}

function drink() {
    if (equipment[0] >= 1) {
        if (Number(hp.innerText) < Number(maxhp.innerText)) {
            equipment[0] -= 1;
            text.innerText = 'You drink an HP Potion.\n' + textupdate();
            add(hp, maxhp.innerText/10);
        } else {
            text.innerText = 'You can\'t recover any more HP!\n' + textupdate();
        }
    } else {
        text.innerText = 'You have no HP Potions!\n' + textupdate();
    }
    slide.src = '';
    slide.alt = 'Inventory';
}

function map() {
    if (slide.alt == 'Inventory' || slide.alt == 'Equip') {
        slide.src = '';
        slide.alt = 'Map';
        text.innerText = '∨ ∨ ∨ ∨';
    } else {
        slide.src = '';
        slide.alt = 'Inventory';
        text.innerText = 'You are viewing your Inventory. Your trusty Map guides you.\n' + textupdate();
    }
}

function equip() {
    if (!equipment.includes('Hero\'s Butcher Knife')) {
        button0.innerText = 'Puny Stick';
        button0.onclick = stick;
        if (equipment.includes('Basic Dagger')) {
            button1.innerText = 'Basic Dagger';
            button1.onclick = dagger;
        } else {
            button1.innerText = 'Undiscovered';
            button1.onclick = pass;
        }
        if (equipment.includes('Staff of Oink')) {
            button2.innerText = 'Staff of Oink';
            button2.onclick = staff;
        } else {
            button2.innerText = 'Undiscovered';
            button2.onclick = pass;
        }
        button3.innerText = 'Go back';
        button3.onclick = inventory;
        text.innerText = 'Equip a Weapon from your Inventory.';
    } else {
        text.innerText = 'You can\'t unequip the Hero\'s Butcher Knife!\n' + textupdate();
    }
    slide.src = '';
    slide.alt = weapons[equipped-1].name;
}

function stick() {
    equipped = 1;
    slide.src = '';
    slide.alt = weapons[equipped-1].name;
}

function dagger() {
    equipped = 2;
    slide.src = '';
    slide.alt = weapons[equipped-1].name;
}

function staff() {
    equipped = 3;
    slide.src = '';
    slide.alt = weapons[equipped-1].name;
}

function smallpig() {
    opponent = 0;
    combat();
}

function boar() {
    opponent = 1;
    combat();
}

function king() {
    opponent = 2;
    combat();
}

function textupdate() {
    return  `HP Potions: ${equipment[0]}\nWeapons: ${equipment.slice(1, equipment.length).join(', ')}
    Current Weapon: ${equipment[equipped]} (${weapons[equipped-1].damage} Attack)\n${weapons[equipped-1].desc}`;
}

function randnum(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

function add(variable, amount) {
    var x = Number(variable.innerText);
    x += amount;
    variable.innerText = x;
}

function sleep(milliseconds) {
    const date = Date.now();
    var currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
    }

function pass() {}