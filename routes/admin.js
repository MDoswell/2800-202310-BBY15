// Load modules below.
require('dotenv').config();
const { router } = require('../config/dependencies');
const { sessionValidation } = require('../public/js/sessionValidation');
const { adminAuthorization } = require('../public/js/adminAuthorization');
const PAGE_SIZE = 10;

// Route to admin page
router.get('/admin', sessionValidation, adminAuthorization, async (req, res) => {
    const { userCollection } = await require('../config/databaseConnection');

    try {
        const currentPage = parseInt(req.query.page) || 1;
        const totalUsers = await userCollection.find({}, { projection: { name: 1, email: 1, user_type: 1 } }).toArray();
        const totalUserCount = totalUsers.length;

        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;

        const paginatedUsers = totalUsers.slice(startIndex, endIndex);
        const totalPages = Math.ceil(totalUserCount / PAGE_SIZE);

        res.render("admin", {
            users: paginatedUsers,
            currentPage,
            totalPages
        });
    } catch (error) {
        console.error(error);
        res.render('error', { message: 'Error retrieving user data.' });
    }
});

module.exports = router;
