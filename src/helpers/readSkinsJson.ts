import fs from 'fs';
import { ISkinJson } from '../models/interfaces';


export const readSkins = () => {
    const data = fs.readFileSync('skins.json', 'utf-8');
    const skins = JSON.parse(data);

    return skins;
};

export const readSkinsIdAndUpdate = (id: number) => {
    const skins = readSkins();
    const skinToBuy = skins.find((skin: ISkinJson) => skin.id === id);

    const updatedSkins = skins.filter((skin: ISkinJson) => skin.id !== id);
    fs.writeFileSync('skins.json', JSON.stringify(updatedSkins, null, 2));

    return skinToBuy;

}