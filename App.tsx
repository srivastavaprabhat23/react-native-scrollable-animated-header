import React from 'react'
import {View,StatusBar} from 'react-native'
import { ScrollContextProvider } from './ScrollContext'
import  {Document}  from './Document'

export const App = () =>
  <ScrollContextProvider>
    <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="pink"
      />
    {/* <View style={{backgroundColor:'blue',height:StatusBar.currentHeight}}></View> */}
    <Document />
  </ScrollContextProvider>;

export default App;