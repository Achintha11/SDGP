import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import IntroPage1 from "../Screens/IntroPage1";
import IntroPage2 from "../Screens/IntroPage2";
import IntroPage3 from "../Screens/IntroPage3";

const styles = StyleSheet.create({
  wrapper: {},
});

export default class SwiperComponent extends Component {
  goToNextPage = () => {
    // Function to navigate to the next page in the swiper
    if (this.swiper) {
      this.swiper.scrollBy(1); // Scrolls to the next page
    }
  };




  skipPress = () => {
    // Function to navigate to the next page in the swiper
    if (this.swiper) {
      this.swiper.scrollBy(2); // Scrolls to the next page
    }
  };

  render() {
    return (
      <Swiper loop={false} style={styles.wrapper} ref={(swiper) => { this.swiper = swiper; }} onIndexChanged={index => console.log(index)}>
        <IntroPage1 skiPress={this.skipPress}  goToNextPage={this.goToNextPage} />
        <IntroPage2 goToNextPage={this.goToNextPage}  />
        <IntroPage3 />
      </Swiper>
    );
  }
}
