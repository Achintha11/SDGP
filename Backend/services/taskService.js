const moment = require('moment');
const Subtask = require('../modals/SubTask');
const Schedule = require ('../modals/ScheduleData');



////////////////////////////////////////////////////////////////////////////////////


async function getScheduleDataFromDB() {
  try {
    const scheduleData = await Schedule.find();
    return scheduleData;
  } catch (error) {
    console.error('Error fetching schedule data:', error);
    return []; // Return an empty array or handle the error appropriately
  }
}


async function getExistingSubtasksFromDB() {
  try {
    const existingSubtasks = await Subtask.find();
    return existingSubtasks;
  } catch (error) {
    console.error('Error fetching existing subtasks:', error);
    return []; // Return an empty array or handle the error appropriately
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////


async function convertUtc(scheduleData) {

  console.log('before convertion' ,scheduleData);


  scheduleData.forEach(day => {
    // Convert date, sleepStart, sleepEnd, workStart, and workEnd to UTC
    day.date = moment.utc(day.date);
    day.sleepStart = moment.utc(day.sleepStart);
    day.sleepEnd = moment.utc(day.sleepEnd);
    day.workStart = moment.utc(day.workStart);
    day.workEnd = moment.utc(day.workEnd);
  });

  console.log('after convertion' ,scheduleData);


  // try {
  //   await Schedule.create(scheduleData);
  // } catch (error) {
  //   console.error('Error creating subtask:', error);
  //   // Handle error appropriately
  // }
  
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  async function calculateAvailableTime(startDate, dueDate,scheduleData, existingSubtasks) {



    // const scheduleData = await getScheduleDataFromDB();
  
    // const formattedScheduleData = scheduleData.map((e)=>{
    //   return {
    //     _id : e._id,
    //     date : moment(e.date),
    //     sleepStart : moment(e.sleepStart),
    //     sleepEnd : moment(e.sleepEnd),
    //     workStart : moment(e.workStart),
    //     workEnd : moment(e.workEnd),
        

    //   }
    // })
    // console.log('==========================================');

    // console.log(formattedScheduleData);
    
    let totalAvailableTime = 0;
  
    for (let day = moment(startDate); day.isSameOrBefore(dueDate); day.add(1, 'days')) {
      let dailyAvailableTime = 1440; // Start with 24 hours in minutes
  
      // Find schedule data for the current day
      const daySchedule = scheduleData.find(entry => moment(entry.date).isSame(day, 'day'));


      // Handle sleep time based on daily schedule
      if (daySchedule) {
        const sleepStart =daySchedule.sleepStart;
        const sleepEnd = daySchedule.sleepEnd;
        const sleepDuration = sleepEnd.diff(sleepStart, 'minutes');
        console.log('sleep : ' , sleepDuration);
        dailyAvailableTime -= sleepDuration;
      }
  
  
      // Handle work hours based on daily schedule
      if (daySchedule) {
        const workStart =daySchedule.workStart;
        const workEnd = daySchedule.workEnd;
        const workDuration = workEnd.diff(workStart, 'minutes');
        console.log('work : ' , workDuration);

        dailyAvailableTime -= workDuration;
      }
  
      // Filter existing subtasks for the current day
      const subtasksOnDay = existingSubtasks.filter(task => moment(task.date).isSame(day , 'day'));
      
  
      // Subtract durations of existing subtasks on the day
      for (const subtask of subtasksOnDay) {
        dailyAvailableTime -= subtask.duration;
        console.log(subtask.duration);
        
      }
  
      // Calculate and log daily available time
      console.log(`Daily available time on ${day.format('DD-MM-YYYY')}: ${dailyAvailableTime} minutes`);
  
      totalAvailableTime += dailyAvailableTime;
    }
  
    return totalAvailableTime;
  }









/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  
  
  function calculateSubtaskStartTime(dayStart, filteredSchedule , subtaskDuration , existingSubtasks) {
    // Find the first available time slot within the day schedule and subtask duration
    for (let startTime = moment(dayStart).clone(); startTime.isBefore(dayStart.endOf('day')); startTime.add(30, 'minutes')) {
      // Check if the current time slot is available:
      if (isTimeSlotAvailable(startTime, filteredSchedule, subtaskDuration , dayStart , existingSubtasks)) {
        return startTime; // Found an available slot, return start time
      }
    }
  
    // If no available slot is found within the day, return null (handle this case later)
    return null;
  }




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  
  function isTimeSlotAvailable(startTime, filteredSchedule, subtaskDuration, dayStart ,existingSubtasks ) {
    // Check for conflicts with existing subtasks and schedule constraints:
    const endTime = moment(startTime).add(subtaskDuration, 'minutes');
  
    // Prioritize sleep: Prevent overlap with sleep time (no grace period)
    for (const scheduleEntry of filteredSchedule) {
      if (moment(startTime).isBefore(scheduleEntry.sleepEnd) && moment(endTime).isAfter(scheduleEntry.sleepStart)) {
        return false; // Conflict with sleep time, not available
      }
    }
  
    // Check for overlaps with work times: Allow a small buffer period (adjust gracePeriod as needed)
    const gracePeriod = 15; // Adjust grace period duration (in minutes)
  
    for (const scheduleEntry of filteredSchedule) {
      const workStartGrace = moment(scheduleEntry.workStart).subtract(gracePeriod, 'minutes');
      const workEndGrace = moment(scheduleEntry.workEnd).add(gracePeriod, 'minutes');
  
      if (moment(startTime).isBefore(workEndGrace) && moment(endTime).isAfter(workStartGrace) ||
          (startTime.isBefore(workStartGrace) && endTime.isAfter(workEndGrace))) {
        return false; // Conflict with work time with buffer zone, not available
      }
    }
  
    // Check for overlaps with existing subtasks:
    for (const subtask of existingSubtasks.filter(t => moment(t.date).isSame(dayStart))) {
      if (moment(subtask.startTime).isBetween(startTime, endTime) ||
          moment(subtask.endTime).isBetween(startTime, endTime) ||
          (startTime.isBefore(subtask.startTime) && endTime.isAfter(subtask.endTime))) {
        return false; // Conflict with existing subtask, not available
      }
    }
  
    // No conflicts found, the time slot is available
    return true;
  }











  
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  async function addNewMainTask(taskName, expectedHours,startDate, dueDate ) {

    const formattedDueDate = moment(dueDate);
    const formattedStartDate = moment(startDate);

    console.log(formattedDueDate);



    const scheduleData = await getScheduleDataFromDB();
  
    const formattedScheduleData = scheduleData.map((e)=>{
      return {
        _id : e._id,
        date : moment(e.date),
        sleepStart : moment(e.sleepStart),
        sleepEnd : moment(e.sleepEnd),
        workStart : moment(e.workStart),
        workEnd : moment(e.workEnd),
        

      }
    })
    console.log('==========================================');


    const existingSubtasksDB = await getExistingSubtasksFromDB();

    const formattedExisitingSubtasks = existingSubtasksDB.map((e)=>{
      return {
        _id : e._id,
        name : e.name,
        date : moment(e.date),
        startTime : moment(e.startTime),
        endTime : moment(e.endTime),
        duration : e.duration,
        type : e.type
        

      }
    })

    console.log(formattedExisitingSubtasks);
    console.log('==========================================');



  

    // Calculate total available time
    const availableTime = await calculateAvailableTime(formattedStartDate, formattedDueDate,formattedScheduleData ,formattedExisitingSubtasks);
    const expectedMinutes = moment.duration(expectedHours, 'hours').asMinutes();
  
  
    // Check if available time is sufficient for the task
    if (availableTime >= expectedHours) {
      // Calculate total duration per day based on available time and date range
      const numDays = formattedDueDate.diff(formattedStartDate, 'days') + 1; // Add 1 to include both start and end day
      const dailyDuration = Math.floor(expectedMinutes / numDays); // Distribute available time evenly across days
  
      // Divide task into subtasks based on daily duration and date range
      for (let i = 0; i < numDays; i++) {
        const dayStart = moment(formattedStartDate).add(i, 'days');
        const dayEnd = moment(dayStart).add(1, 'days'); // Consider using .endOf('day) for inclusive end time
  
        
        // Adjust subtask duration for the last day if not evenly divisible by daily duration
        const subtaskDuration = i === numDays - 1 ? expectedMinutes - (dailyDuration * i) : dailyDuration;
  
  
        
        // Create subtask with adjusted start and end times based on daily schedule
        const filteredSchedule = formattedScheduleData.filter(s => moment(s.date).isSameOrBefore(dayEnd));
        let subtaskStartTime = calculateSubtaskStartTime(dayStart, filteredSchedule , subtaskDuration , formattedExisitingSubtasks);
        let subtaskEndTime = moment(subtaskStartTime).add(subtaskDuration, 'minutes');
  


        
        // // Handle adjustments if subtask end time goes beyond daily schedule or due date
        // if (subtaskEndTime.isAfter(dayEnd)) {
        //   subtaskEndTime = dayEnd; // Limit end time to the end of the day
        // }
        // if (subtaskEndTime.isAfter(formattedDueDate)) {
        //   subtaskDuration = formattedDueDate.diff(subtaskStartTime, 'minutes'); // Adjust duration based on remaining time
        //   subtaskEndTime = formattedDueDate; // Set end time to the due date
        // }
  



         
                                   
  
         const subtaskData = {
            name: `${taskName} - Subtask ${i + 1}`,
            date: dayStart,
            startTime: subtaskStartTime,
            endTime: subtaskEndTime,
            duration: subtaskDuration,
            type: 'subtask'
        };

        console.log(subtaskData);


                        {/*

        Subtask.create(subtaskData)
                .then(subtask => {
                    console.log(`Subtask '${subtask.name}' created and saved.`);
                })
                .catch(error => {
                    console.error('Error creating subtask:', error);
                });


*/}



      }
  
      console.log(`Main task '${taskName}' successfully divided and added as subtasks.`);
    } else {
      console.log(`Insufficient available time to add main task '${taskName}'.`);
    }
  
  
  }
  


//   // Example usage:
//   const startDate = moment('2024-02-12'); // Replace with your actual start date
//   const dueDate = moment('2024-02-15'); // Replace with your actual due date
  
//   const newTaskName = 'Important meeting';
//   const newTaskExpectedHours = 12;


  

  

  
//   addNewMainTask(newTaskName, newTaskExpectedHours,startDate, dueDate );
//  // convertUtc(scheduleData);
  


module.exports = {
    addNewMainTask
  };