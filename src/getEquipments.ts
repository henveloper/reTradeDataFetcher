import { EAbilitySlot, EArmorSlot, EWeaponSlot, IEquipment, IXmlEquipment } from './types';
import * as fs from 'fs';
import { getGameObjects } from './utils';

async function main() {
    const gameObjects = await getGameObjects();

    const equipments: IEquipment[] = [];
    const menu: [
        [ EWeaponSlot[], number, number ],
        [ EAbilitySlot[], number, number ],
        [ EArmorSlot[], number, number ],
    ] = [
        [
            [ EWeaponSlot.sword,
                EWeaponSlot.katana,
                EWeaponSlot.dagger,
                EWeaponSlot.bow,
                EWeaponSlot.staff,
                EWeaponSlot.wand, ],
            10,
            12,
        ],
        [
            [ EAbilitySlot.cloak, EAbilitySlot.quiver, EAbilitySlot.spell, EAbilitySlot.tome,
                EAbilitySlot.helmet, EAbilitySlot.shield, EAbilitySlot.seal, EAbilitySlot.poison,
                EAbilitySlot.skull, EAbilitySlot.trap, EAbilitySlot.orb, EAbilitySlot.prism,
                EAbilitySlot.scepter, EAbilitySlot.star, EAbilitySlot.wakizashi, EAbilitySlot.lute, ],
            5,
            6,
        ],
        [
            [ EArmorSlot.robe, EArmorSlot.light, EArmorSlot.heavy ],
            11,
            13,
        ]
    ];

    console.log(gameObjects.filter(o => o.SlotType === 1));

    for (const [ slotTypes, minTier, maxTier ] of menu) {
        for (const slotType of slotTypes) {
            for (let tier = minTier; tier <= maxTier; tier++) {
                const entry: IXmlEquipment | undefined = gameObjects.find(o => o.SlotType === slotType && o.Tier === tier);
                if (!entry) {
                    throw new Error(`Missing Equipment ${ slotType } ${ tier }.`);
                }
                const id = parseInt(entry['@_type'], 16);
                equipments.push({ id, tier, slotType, name: entry['@_id'] });
            }
        }
    }

    let file = '';
    file += 'export const equipments = [\n';
    equipments.forEach(e => {
        file += JSON.stringify(e) + ',\n';
    });
    file += '];\n\n';

    fs.writeFile('outputs/equipments.ts', file, () => console.log('done'));
}

main().catch(console.log).then();
