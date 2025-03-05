/* Previous version (only used tailwind) */
// const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
// const {withNativeWind} = require('nativewind/metro');

// const config = mergeConfig(getDefaultConfig(__dirname), {
//   /* your config */
// });

// module.exports = withNativeWind(config, {input: './global.css'});

/* Latest version (used tailwind and svg config) */
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {withNativeWind} = require('nativewind/metro');

const defaultConfig = getDefaultConfig(__dirname);
const {assetExts, sourceExts} = defaultConfig.resolver;

const config = mergeConfig(defaultConfig, {
  transformer: {
    babelTransformerPath: require.resolve(
      'react-native-svg-transformer/react-native',
    ),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
});

module.exports = withNativeWind(config, {input: './global.css'});
