// Load modules below.
const { router, userCollection } = require('../config/dependencies');
const { sessionValidation } = require('../public/js/sessionValidation');

// Route to handle the availability update
router.post('/availability', sessionValidation, (req, res) => {
  const userId = req.body.userId;
  const event = req.body.event; // Assuming the FullCalendar event object is passed in the request body

  // Extract the start and end times from the event object and format the availability string
  const startTime = event.start.format('h:mm a');
  const endTime = event.end.format('h:mm a');
  const availabilityRange = `${event.start.format('dddd')} ${startTime} - ${endTime}`;

  // Update the user collection with the selected availability
  userCollection.updateOne({ _id: userId }, { $set: { availability: availabilityRange } })
    .then(() => {
      res.sendStatus(200); // Send success response if the update is successful
    })
    .catch((error) => {
      console.error('Failed to update availability:', error); // Handle the error if the update fails
      res.sendStatus(500); // Send an error response
    });
});

module.exports = router;
