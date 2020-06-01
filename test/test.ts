import manifest from '../lib/node/index.js';
// const manifest = new D2Manifest('asdf', 'en', true);
// console.log(manifest);
manifest.verbose();
(async () => {
  console.log('loading manifest');
  await manifest.load();
  console.log('manifest should be loaded');

  console.log('\nloading manifest again, this should use the memory cache');
  await manifest.load();
  console.log('manifest should be loaded');

  console.log('\ngetting kindled orchid by hash');
  console.log(manifest.get('DestinyInventoryItemDefinition', 2575506895)?.displayProperties);

  console.log('\nfinding Primeval Prime by name');
  console.log(manifest.find('DestinyInventoryItemDefinition', 'Primeval Prime')?.[0]?.displayProperties);

  console.log('\nswitching to french');
  manifest.setLanguage('fr');
  await manifest.load();

  console.log('\ngetting kindled orchid by hash, but french');
  console.log(manifest.get('DestinyInventoryItemDefinition', 2575506895)?.displayProperties);
})();
