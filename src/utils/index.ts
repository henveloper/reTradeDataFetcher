import axios from 'axios';
import { parse } from 'fast-xml-parser';

export async function getGameObjects() {
    const xmlReq = await axios.get('https://static.drips.pw/rotmg/production/current/xmlc/Objects.xml');
    return parse(xmlReq.data, { ignoreAttributes: false })
        .Objects.Object as object[];
}

export function gameObjectName(gameObj: any): string {
    return gameObj['@_id'] ?? '';
}

export function gameObjectId(gameObj: any): number {
    return parseInt(gameObj['@_type'], 16);
}
