const logout = (app) => {
  app.post('/logout', async (req, res) => {
    res.cookie('feathers-jwt', '', {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
    });

    res.send({ message: 'Logout successful' });
  });
};
export default logout;