const ScheduleData = require("../modals/ScheduleData");


const addSchedule = async (req, res) => {
    const newDataArray = req.body;
    console.log(newDataArray);

  try {
    // Iterate over each object in the array
    for (const newData of newDataArray) {
      // Find existing data with matching date attribute
      const existingData = await ScheduleData.findOne({ date: newData.date });

      if (existingData) {
        // Delete existing data from the database
        await ScheduleData.deleteOne({ _id: existingData._id });
        await ScheduleData.create(newData);

      }
      else{
         // Create new data in the database
      await ScheduleData.create(newData);

      }

     
    }

    res.status(200).json({ message: 'Schedule data updated successfully.' });
  } catch (error) {
    console.error('Error updating schedule data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  };

  
  const checkSchedule = async (req, res) => {
    try {
      const { startDate, endDate } = req.body;
      const { id: uid } = req.params;

      console.log("params u id",uid);

      console.log("this is my req body",req.body);
  
      // Convert start and end dates to Date objects
      const formattedStartDate = new Date(startDate);
      const formattedEndDate = new Date(endDate);
      console.log(formattedStartDate);
      console.log(formattedEndDate);
  
      // Iterate over each date between startDate and endDate
      let currentDate = new Date(formattedStartDate);
      while (currentDate <= formattedEndDate) {
        // Check if there is data for the current date
        const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

        const existingData = await ScheduleData.findOne({ date: { $gte: currentDateOnly, $lt: new Date(currentDateOnly.getTime() + 24 * 60 * 60 * 1000) }, uid: uid });

  
        // If data doesn't exist for any date, return false
        if (!existingData) {
          return res.json({ exists: false });
        }
  
        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
      }
  
      // If data exists for all dates, return true
      res.json({ exists: true });
    } catch (error) {
      console.error('Error checking schedule data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  





  module.exports={addSchedule , checkSchedule};
