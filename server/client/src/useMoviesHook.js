import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, fetchWatchListMovies } from "./actions";

const useMovies = (type) => {
  const dispatch = useDispatch();

  const moviesKey = () => {
    if (type === "discover") {
      return "movies";
    } else {
      return "watchListMovies";
    }
  };

  const fetchSelectedMovies = (page) => {
    if (type === "discover") {
      return fetchMovies(page);
    } else {
      return fetchWatchListMovies();
    }
  };

  return {
    movieOrder: useSelector((state) => state[moviesKey()].order),
    movies: useSelector((state) => state[moviesKey()].entries),
    getMovies: (page) => dispatch(fetchSelectedMovies(page)),
  };
};

export default useMovies;