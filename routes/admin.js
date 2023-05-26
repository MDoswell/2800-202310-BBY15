// Load modules below.
require('dotenv').config();
const { router } = require('../config/dependencies');
const { sessionValidation } = require('../public/js/sessionValidation');
const { adminAuthorization } = require('../public/js/adminAuthorization');
const PAGE_SIZE = 10; //Number of users per page

// Route to admin page
router.get('/admin', sessionValidation, adminAuthorization, async (req, res) => {
    const { userCollection } = await require('../config/databaseConnection');

    try {
        const currentPage = parseInt(req.query.page) || 1; // Current page number from query parameter, default to 1
        // Retrieve all users with specific fields
        const totalUsers = await userCollection.find({}, { projection: { name: 1, email: 1, user_type: 1 } }).toArray();
        // Total number of users
        const totalUserCount = totalUsers.length;

        // Calculate the starting index for pagination
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        // Calculate the ending index for pagination
        const endIndex = startIndex + PAGE_SIZE;

        // Get the users for the current page
        const paginatedUsers = totalUsers.slice(startIndex, endIndex);
        // Calculate the total number of pages
        const totalPages = Math.ceil(totalUserCount / PAGE_SIZE);

        res.render("admin", {
            // Pass the paginated users to the "admin" view
            users: paginatedUsers,
            // Pass the current page number to the "admin" view
            currentPage,
            // Pass the total number of pages to the "admin" view
            totalPages
        });
    } catch (error) {
        console.error(error);
        // Render an "error" view if there's an error retrieving user data
        res.render('error', { message: 'Error retrieving user data.' });
    }
});

module.exports = router;
