module.exports = {
  index,
};

// render view/index as home page
function index(req, res) {
  // const user = req.user;
  res.render('index', { user:req.user });// define var user as an object, when no user logged in, user would be null but still works in the template
}