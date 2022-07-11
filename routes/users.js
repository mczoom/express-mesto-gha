const { createUser } = require('../controllers/users');

router.post('/', createUser);