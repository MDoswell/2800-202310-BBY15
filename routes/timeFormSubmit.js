const { router } = require('../config/dependencies');
const { sessionValidation } = require('../public/js/sessionValidation');

router.post('/timeForm/submit', sessionValidation, async (req, res) => {

  const { userCollection } = await require('../config/databaseConnection');
  const availabilityData = [];

  // Iterate over each row in the table
  const tableRows = req.body.availabilityData; // Assuming the availabilityData is sent in the request body
  tableRows.forEach((row) => {
    const dayOfWeek = row.dayOfWeek;
    const date = row.date;
    const startTime = row.startTime;
    const endTime = row.endTime;

    availabilityData.push({
      dayOfWeek,
      date,
      startTime,
      endTime,
    });
  });
  
  try {
    await userCollection.findOneAndUpdate({ name: req.session.name}, { $set: {availabilityData: availabilityData}});
    res.status(200).json({ message: 'Availability data saved successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving availability data.' });
  }
});

module.exports = router;
