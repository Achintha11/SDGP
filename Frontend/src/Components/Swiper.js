import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'
import IntroPage1 from "../Screens/IntroPage1"
import IntroPage2 from "../Screens/IntroPage2"
import IntroPage3 from "../Screens/IntroPage3"

import Swiper from 'react-native-swiper'

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})

export default class SwiperComponent extends Component {
  render() {
    return (
      <Swiper loop={false} style={styles.wrapper} >
        <IntroPage1/>
        <IntroPage2/>
        <IntroPage3/>
      </Swiper>
    )
  }
}
