const router = require('express').Router();
const AuthService = require('./auth.service');

router.post('/login', async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const token = await AuthService.login(login, password);
    if (token) {
      res.set('Authorization', `Bearer ${token}`);
      res.status(200).json({ message: 'Success auth', token });
    }
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
