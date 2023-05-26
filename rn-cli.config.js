module.exports = {
    dependency: {
      platforms: {
        android: {
          sourceDir: './node_modules/react-native-fs/android',
          packageImportPath: 'import com.rnfs.RNFSPackage;',
          packageInstance: 'new RNFSPackage()',
        },
      },
    },
  };
  