import React, { useState, useEffect, Fragment, useRef } from "react";
import {
  StyleSheet,
  View,
  Animated,
  SafeAreaView,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../assets/constants/constant";
import LottieView from "lottie-react-native";
import * as Progress from "react-native-progress";

const Circle = ({ delay, backgroundColor }) => {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(scale, {
        toValue: 2,
        duration: 3000,
        delay: delay,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(opacity, {
        toValue: 0,
        duration: 3000,
        delay: delay,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.circle,
        {
          transform: [{ scale }],
          opacity,
          backgroundColor,
        },
      ]}
    ></Animated.View>
  );
};

const Countdown = () => {
  const [status, setStatus] = useState("work");
  const [time, setTime] = useState(25);
  const [taskTime, setTaskTime] = useState(50);
  const [currentInterval, setCurrentInterval] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (completed) {
      return;
    }
    const timer = setInterval(() => update(), 1000);
    return () => {
      clearInterval(timer);
    };
  }, [time, status, currentInterval, completed]);

  useEffect(() => {
    setProgress((currentInterval - 1) / Math.ceil(taskTime / 25));
  }, [currentInterval]);

  const update = () => {
    if (time === 0) {
      if (status === "work") {
        if (currentInterval < Math.ceil(taskTime / 25)) {
          setTime(5);
          setStatus("relax");
          setCurrentInterval(currentInterval + 1);
        } else {
          setStatus("Completed");
          setCompleted(true);
          setCurrentInterval(currentInterval + 1);
        }
      } else {
        setTime(25);
        setStatus("work");
      }
    } else {
      setTime(time - 1);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", backgroundColor: COLORS.third }}
    >
      <StatusBar barStyle={"dark-content"} backgroundColor={COLORS.third} />
      <View
        style={{
          height: "25%",
          width: "100%",
          padding: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>Algorithms </Text>
      </View>
      <View
        style={{
          height: "18%",
          marginTop: "1%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fragment>
          {Array(6)
            .fill()
            .map((_, index) => (
              <Circle
                key={index}
                delay={index * 500}
                backgroundColor={
                  status === "Completed"
                    ? "green"
                    : status === "work"
                    ? COLORS.primary
                    : "red"
                }
              />
            ))}
          {!completed && (
            <Text style={{ fontSize: 40, color: "white", fontWeight: "bold" }}>
              {secondsToMinutes(time)}
            </Text>
          )}
          <Text style={{ fontSize: 40, color: "white", fontWeight: "bold" }}>
            {status}
          </Text>
        </Fragment>
      </View>

      <View
        style={{
          padding: "2%",
          height: "35%",
          width: "90%",
          backgroundColor: COLORS.third,
          borderRadius: 10,
          marginTop: "30%",
          elevation: 15,
        }}
      >
        {status === "Completed" ? (
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "gray" }}>
              Task Successfully Completed
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "gray" }}>
              Cheers!!
            </Text>
          </View>
        ) : status === "work" ? (
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "gray" }}>
              Keep Up The Good Work!!
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "gray" }}>
              You are Doing Well!
            </Text>
          </View>
        ) : (
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "gray" }}>
              You did well on previous session
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "gray" }}>
              It's Relax Time Now
            </Text>
          </View>
        )}

        <View style={{ height: "80%", width: "100%" }}>
          {status === "Completed" ? (
            <LottieView
              style={{ height: "88%", width: "100%" }}
              source={require("../../assets/complete.json")} // Change the source based on status
              autoPlay
              loop
            />
          ) : status === "work" ? (
            <LottieView
              style={{ height: "88%", width: "100%" }}
              source={require("../../assets/work.json")} // Change the source based on status
              autoPlay
              loop
            />
          ) : (
            <LottieView
              style={{ height: "88%", width: "100%" }}
              source={require("../../assets/Relax.json")} // Change the source based on status
              autoPlay
              loop
            />
          )}

          <View style={{alignItems : 'center'}}>
            <Progress.Bar
              progress={progress}
              width={300}
              height={15}
              borderRadius={10}
              borderColor={COLORS.nineth}
              unfilledColor={COLORS.nineth}
              color={COLORS.tenth}
            />

            <Text style={{}}>{progress * 100}%</Text>
          </View>

          {/* <ProgressBar
            progress={progress}
            color={status === "Completed" ? "green" : COLORS.primary}
            style={{
              borderRadius: 10,
              width: "100%",
              height: 15,
            }}
          /> */}
        </View>
      </View>

      <View
        style={{
          height: "6%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "2%",
        }}
      >
        {completed && (
          <TouchableOpacity
            onPress={() => {
              // Handle navigation or action to return to the schedule
            }}
            style={{
              height: "80%",
              width: "45%",
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor: COLORS.primary,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
              Return to Schedule
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Render the button only when the task is completed */}
    </SafeAreaView>
  );
};

const secondsToMinutes = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  return (
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds)
  );
};

export default Countdown;

const styles = StyleSheet.create({
  circle: {
    height: 200,
    width: 200,
    borderRadius: 100,
    position: "absolute",
  },
});