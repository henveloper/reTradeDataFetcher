import axios from 'axios';
import { parse } from 'fast-xml-parser';
import { EAbilitySlot, EArmorSlot, Equipment, EWeaponSlot, IXmlEquipment } from './types';
import * as fs from 'fs';

async function main() {
    const xmlReq = await axios.get('https://static.drips.pw/rotmg/production/current/xmlc/Objects.xml');
    const parsedXml = parse(xmlReq.data, { ignoreAttributes: false });
    const gameObjects: any[] = parsedXml.Objects.Object;

    const equipments: Equipment[] = [];
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
