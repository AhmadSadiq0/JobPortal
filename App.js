/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
} from 'react-native';
import Navigation from './src/navigation';
import { Provider as JobProvider } from './src/store/context/JobsContext';
import { BannerAd, TestIds, BannerAdSize } from '@react-native-firebase/admob';
import { BANNER_AD_ID_ANDROID } from './res/strings';
const App: () => React$Node = () => {
  const [ads, showAds] = useState(true)
  return (
    <>
      <SafeAreaView style={styles.container}>
        <JobProvider>
          <Navigation/>
          {ads ? <BannerAd
            unitId={BANNER_AD_ID_ANDROID}
            size={BannerAdSize.SMART_BANNER}
            onAdFailedToLoad={(e) => showAds(false)}
          /> : null}
        </JobProvider>
      </SafeAreaView>
    </>
  );
};

const styles = {
  container: {
    flex: 1
  }
}

export default App;
