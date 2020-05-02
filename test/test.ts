import D2Manifest from '../lib';
const manifest = new D2Manifest('asdf', 'en', true);
// console.log(manifest);
(async () => {
  console.log('loading manifest');
  await manifest.load();
  console.log('manifest should be loaded');

  console.log('getting kindled orchid by hash');
  console.log(manifest.get('DestinyInventoryItemDefinition', 2575506895)?.displayProperties);

  console.log('finding Primeval Prime by name');
  console.log(manifest.find('DestinyInventoryItemDefinition', 'Primeval Prime')?.[0]?.displayProperties);
})();
