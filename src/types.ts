export interface IXmlEquipment {
    '@_type': string;
    '@_id': string;
    Class: 'Equipment';
    Tier: number;
    SlotType: EEquipmentSlot;
}

export enum EWeaponSlot {
    dagger = 2, bow = 3, staff = 17, wand = 8, sword = 1, katana = 24,
}

export enum EAbilitySlot {
    cloak = 13, quiver = 15, spell = 11, tome = 4,
    helmet = 16, shield = 5, seal = 12, poison = 18,
    skull = 19, trap = 20, orb = 21, prism = 22,
    scepter = 23, star = 25, wakizashi = 27, lute = 28,
}

export enum EArmorSlot {
    robe = 14, light = 6, heavy = 7,
}

export type EEquipmentSlot = EWeaponSlot | EAbilitySlot | EArmorSlot;

interface IGameItem {
    id: number;
}

export interface Equipment extends IGameItem {
    tier: number,
    slotType: EEquipmentSlot,
    name: string,
}
