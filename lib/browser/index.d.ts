import D2Manifest from '..';
/**
 * D2Manifest but saves manifest obects to indexeddb
 */
export default class D2ManifestNode extends D2Manifest {
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
