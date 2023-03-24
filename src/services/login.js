const authentication  = require('../authentication');

module.exports = app => {         
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
      const authResult = await authentication.authenticate({
        strategy: 'local',
        email,
        password
      });
      res.cookie('feathers-jwt', authResult.authentication.accessToken, {
        httpOnly: true,
        secure: true
      });

      res.send({ message: 'Login successful' });
    } catch (error) {
      res.status(401).send({ message: 'Invalid email or password' });
    }
  });
};
