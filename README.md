# destiny2-manifest

a simple singleton with functions to download, ⚠️CACHE⚠️, and access the d2 manifest

### features
isomorphic! basically....  
uses cross-fetch to perform the same requests in browser or node.js  
stores the manifest in indexeddb in a browser, or as .json in node.js  
just import a different file depending on which you want  

kind of flexible, syntax-wise, use this module however makes you happiest

most importantly: TYPED! these will return accurately typed entries from [bungie-api-ts](https://github.com/DestinyItemManager/bungie-api-ts).  
so your IDE of choice should know itemCategoryHashes exists and is an array of numbers,  
and itmCategoryHahses does not! made up! a trick question.


### examples
in a browser:
```node
import manifest from 'destiny2-manifest/browser';
manifest.verbose(); // make the client chatty
manifest.setApiKey('hahahoho');

async ()=>{
  await manifest.load(); // check the cache, and fetch from the API if it's missing or outdated
  // if you made it to this comment, the manifest is ready for use!
  
  const kindledOrchid = manifest.get('DestinyInventoryItemDefinition', 2575506895);
  kindledOrchid?.displayProperties.description;
  //-> "Find the beauty in the flame."
  
  manifest.getAll('DestinyDamageTypeDefinition').length;
  //-> 4
}
```

in node.js, and only load from the hard drive. no API use
```node
import manifest from 'destiny2-manifest/node';

const manifestLoaded = manifest.loadLocal();
if (manifestLoaded) {
  // success. we are ready to go

  manifest.find('DestinyInventoryItemDefinition', 'orpheus')[0].displayProperties.name;
  //-> 'Orpheus Rig'
}
```

maybe you're a rebel.   
you hate default imports and like to gamble on sending no API key (works 9 times out of ten actually..)
```node
// 
import { get, load, getLatestCachedVersion } from 'destiny2-manifest/browser';

async ()=>{
  await load();
  
  get('DestinyInventoryItemDefinition', 460688465)?.displayProperties.description;
  //-> "Mine is not a final shape. She showed me that." –Eris Morn
  
  await getLatestCachedVersion(); // what's in indexeddb right now?
  //-> 83341.20.04.17.1921-8
}
```

maybe you're as tuned out as i am most of the time. typescript has you covered.
```node
// example.ts
const myItem = manifest.get('DestinyInventoryItemDefinition', 460688465);

myItem.icon;
// TypeScript error: Property 'icon' does not exist on type 'DestinyInventoryItemDefinition'.ts(2339)
```
