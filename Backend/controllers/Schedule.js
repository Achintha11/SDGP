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


  module.exports={addSchedule};
