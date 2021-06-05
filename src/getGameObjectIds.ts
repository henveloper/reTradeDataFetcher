import { gameObjectId, gameObjectName, getGameObjects } from './utils';

async function main() {
    const gameObjects = await getGameObjects();
    const targetObjectNames: string[] = [
        'An Icicle',
        'Bow of Eternal Frost',
        'Staff of Yuletide Carols',
        'Present Dispensing Wand',
        'Frostbite',
        'Salju',
    ];

    console.log(targetObjectNames.map(n => [
        gameObjectId(gameObjects.find(o => gameObjectName(o) === n)),
        n,
    ]));
}

main().catch(console.log).then();
