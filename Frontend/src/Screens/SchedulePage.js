import React, { useState, useRef } from 'react';
import { StyleSheet, SafeAreaView, View, TouchableWithoutFeedback, Text, Dimensions, StatusBar } from 'react-native';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import { COLORS } from '../../assets/constants/constant';
import ScheduleTimeLine from "../Components/ScheduleTimeLine"
const { width } = Dimensions.get('window');

export default function ScheduleScreen2() {
  const swiper = useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);

  const weeks = React.useMemo(() => {
    const start = moment().add(week, 'weeks').startOf('week');

    return [-1, 0, 1].map(adj => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, 'week').add(index, 'day');

        return {
          weekday: date.format('ddd'),
          date: date.toDate(),
        };
      });
    });
  }, [week]);

  const handleDatePress = (date) => {
    setValue(date)
    setTimeout(() => {
      setValue(date);
    }, 0);
  };


  
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.third}/>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Schedule</Text>
        </View>

        <View style={styles.picker}>
          <Swiper
          
            index={1}
            ref={swiper}
            loop={false}
            showsPagination={false}
            
            onIndexChanged={ind => {
              // if (ind === 1) {
              //   return;
              // }

                setTimeout(() => {
                const newIndex = ind -1;
                const newWeek = week + newIndex;
                setValue(moment(value).add(newIndex, 'week').toDate());
                setWeek(newWeek);
                swiper.current.scrollTo(1 , false);
              },0);

              
              
            }}>
            {weeks.map((dates, index) => (
              <View
                style={[styles.itemRow, { paddingHorizontal: 16 }]}
                key={index}>
                {dates.map((item, dateIndex) => {
                  const isActive = moment(value).isSame(item.date, 'day');
                  return (
                    <TouchableWithoutFeedback
                      key={dateIndex}
                      onPress={() => handleDatePress(item.date)}>
                      <View
                        style={[
                          styles.item,
                          isActive && {
                            backgroundColor: COLORS.primary,
                            borderColor: COLORS.primary,
                          },
                        ]}>
                        <Text
                          style={[
                            styles.itemWeekday,
                            isActive && { color: '#fff' },
                          ]}>
                          {item.weekday}
                        </Text>
                        <Text
                          style={[
                            styles.itemDate,
                            isActive && { color: '#fff' },
                          ]}>
                          {item.date.getDate()}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            ))}
          </Swiper>
        </View>
        <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
          <Text style={styles.subtitle}>{value.toDateString()}</Text>
          <View style={styles.placeholder}>
            <ScheduleTimeLine selectedDate={value}/>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
  },
  header: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  picker: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#999999',
    marginBottom: 12,
  },
  footer: {
    marginTop: 'auto',
    paddingHorizontal: 16,
  },
  /** Item */
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#e3e3e3',
    flexDirection: 'column',
    alignItems: 'center'
  },
  itemRow: {  
    width: width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginHorizontal: -4,
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: '500',
    color: '#737373',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',  
  },
  /** Placeholder */
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 0,
    backgroundColor: 'transparent',
  },
  
});
