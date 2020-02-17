# destiny2-manifest

a simple class with functions to download and access the d2 manifest  

```node
const D2Manifest = require('destiny2-manifest').default;
const manifest = new D2Manifest('asdf');

await manifest.load(); // or manifest.update() if you're into that
//-> manifest loaded

manifest.get('DestinyInventoryItemDefinition', 460688465).displayProperties.description;
//-> "Mine is not a final shape. She showed me that." –Eris Morn

manifest.getAll('DestinyDamageTypeDefinition').length;
//-> 4

manifest.find('DestinyInventoryItemDefinition', 'orpheus')[0].displayProperties.name;
//-> 'Orpheus Rig'
```

i mainly wanted a simple way to pull pre-typed records from the manifest  
this returns records with [bungie-api-ts](https://github.com/DestinyItemManager/bungie-api-ts) definitions  

```node
import D2Manifest from "destiny2-manifest";
// [...]
const myItem = manifest.get('DestinyInventoryItemDefinition', 460688465);

myItem.icon;
// TypeScript error: Property 'icon' does not exist on type 'DestinyInventoryItemDefinition'.ts(2339)
```
