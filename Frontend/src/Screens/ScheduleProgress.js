import { StatusBar } from 'react-native';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PieChart } from 'react-native-gifted-charts';
import { COLORS } from '../../assets/constants/constant';
import { Shadow } from 'react-native-shadow-2';
import { Octicons } from '@expo/vector-icons';
import moment from 'moment';

const App = ({route}) => {

    const { startDate, endDate, title , color  } = route.params;
    const completed = 70
    const thisSession = 10
    const toComplete = 100 - (completed + thisSession)

    const formattedStartDate = moment(startDate).format("YYYY  MMM  DD");
    const formattedDueDate = moment(endDate).format("YYYY  MMM  DD");


    const pieData = [
        {
            value: completed,
            color: 'green',
            gradientCenterColor: 'green',
            focused: true,
        },
        { value: thisSession, color: 'blue', gradientCenterColor: 'blue', focused: true },
        { value: toComplete, color: 'orange', gradientCenterColor: 'orange' },
    ];


    return (
        <SafeAreaView style={{ flex: 1,
            alignItems: 'center' , backgroundColor: color}}>
            <StatusBar barStyle={'light-content'} backgroundColor={color} />
            
            <View style={styles.box1}>
                <TouchableOpacity><Ionicons name="chevron-back" size={40} color="white" /></TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
            </View>


            <Shadow containerStyle={{ height: '30%' }} style={{ width: 300 }}>
                <View style={styles.box2}>
                    <Text style={styles.h1}>📋 Assignment</Text>
                    <View>
                        <Text style={styles.start}>Start : {formattedStartDate}</Text>
                        <Text style={styles.due}>Due : {formattedDueDate}</Text>
                    </View>
                    <View style={styles.box5}>
                        <View>
                            <Text style={styles.lable3}>Priority Level :  High</Text>

                            <Text style={styles.label4}>Description :  </Text>
                        </View>
                    </View>

                </View>
            </Shadow>


            <Shadow containerStyle={{ height: '45%' }} style={{ width: 300 }}>
                <View style={styles.box3}>
                    <Text style={styles.h2}>Task progress</Text>
                    <View>
                        <View style={{ alignItems: 'center' }}>
                            <PieChart
                                data={pieData}
                                donut
                                showGradient
                                sectionAutoFocus
                                radius={90}
                                innerRadius={58}
                                innerCircleColor={color}
                                centerLabelComponent={() => {
                                    return (
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text
                                                style={{ fontSize: 24, color: 'white', fontWeight: 'bold' }}>
                                                {pieData[0].value}%
                                            </Text>
                                        </View>
                                    );


                                }}
                            />
                        </View>
                        <View style={styles.box6}>
                            <View style={{ flexDirection: 'row' }}>
                                <Octicons name="dot-fill" size={20} color="#ffaa00" />
                                <Text style={{fontWeight: 'bold', color: 'white'}}>  To-Do</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Octicons name="dot-fill" size={20} color="blue" />
                                <Text style={{fontWeight: 'bold', color: 'white'}}>  This Session</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Octicons name="dot-fill" size={20} color="green" />
                                <Text style={{fontWeight: 'bold', color: 'white'}}>  Completed</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Shadow>


            <View style={styles.box4}>
                <TouchableOpacity style={styles.btn1}>
                    <Text style={styles.btnText1}>Cancel Session</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn2}>
                    <Text style={styles.btnText2}>Start Session</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },

    box1: {
        height: '8%',
        width: '100%',
        marginTop: '8%',
        flexDirection: 'row'
    },

    title: {
        fontSize: 30,
        color: COLORS.secondry,
        fontWeight: 'bold'
    },

    box2: {
        borderRadius: 25,
        width: '100%'
    },

    h1: {
        fontSize: 19,
        fontWeight: 'bold',
        color: 'white',
        margin: '3%',
        marginLeft: '4%'
    },

    start: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        marginTop: '5%',
        marginLeft: '14%'
    },

    due: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        marginTop: '3%',
        marginLeft: '14%',
        marginBottom: '5%'
    },

    box5: {
        border: '25%',
        borderColor: 'black',
        borderRadius: 25
    },

    lable3: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        padding: 5,
        marginLeft: '5%',
        marginTop: '1%'
    },

    label4: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        padding: 5,
        marginLeft: '5%'
    },

    box3: {
        width: '100%',
        borderRadius: 25
    },

    box6: {
        flexDirection: 'row',
        marginTop: '6%',
        marginBottom: '6%',
        justifyContent: 'space-evenly'
    },

    txt1: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'black'
    },

    txt2: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'black'
    },

    txt3: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'black'
    },

    h2: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        margin: '4%',
        marginLeft: '8%'
    },

    box4: {
        height: '15%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    },

    btn1: {
        height: '36%',
        width: '36%',
        backgroundColor: COLORS.eleventh,
        margin: '5%',
        justifyContent: 'center',
        borderRadius: 22,
        alignItems: 'center'
    },

    btn2: {
        height: '36%',
        width: '36%',
        backgroundColor: 'green',
        margin: '5%',
        justifyContent: 'center',
        borderRadius: 22,
        alignItems: 'center'
    },

    btnText1: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },

    btnText2: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    }
});

export default App
