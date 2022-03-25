const User = require('../models/user');
const Movie = require('../models/movie');

// NOTE route handler to save a new movie to mongodb and add it to the auth'd user's watchlist
exports.addMovieToList = function (req, res) {
  User.findOne({_id: req.user._id}, function (err, user) {
    const movie = new Movie.MovieModel(req.body.movie);

    movie.save((err, movie) => {
      user.watchList.push(movie);
      user.save().then((user) => {
        debugger;
        res.send({movie, watchListCount: user.watchList.length});
      });
    })
  })
}

exports.getWatchList = function (req, res) {
  User.find({ _id: req.user._id }, function (err, user) {
    res.send({
      movies: user.watchList,
      watchListCount: user.watchList.length,
    });
  });
};