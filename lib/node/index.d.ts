import D2Manifest from '..';
/**
 * D2Manifest but saves manifest jsons to a specified path
 */
export default class D2ManifestNode extends D2Manifest {
    manifestsPath: string;
    /**
     * @param apiToken api token for bungie.net
     * @param language en (default) / fr / es / es-mx / de / it / ja / pt-br / ru / pl / ko / zh-cht / zh-chs
     * @param verbose console log steps during async methods
     * @param manifestsPath where to store/load manifests (default "./manifest")
     */
    constructor(apiToken: string, language?: string, verbose?: boolean, manifestsPath?: string);
    latest(): Promise<string>;
    /**
     * loads an ALREADY saved manifest file
     * update()s one from the internet if none is found,
     * unless suppressUpdate is set
     */
    load(suppressUpdate?: boolean): Promise<void>;
    /**
     * saves the loaded manifest to a json file
     */
    save(version: string): Promise<boolean>;
}
