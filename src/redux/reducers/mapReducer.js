const initialState = {
  bounds: [[90, 180], [-90, -180]],
  geojson: {},
  search: false,
  visitedListGeojson: [],
  displayFriendsCountries: false
};

const UPDATE_BOUNDS = "UPDATE_BOUNDS";
const UPDATE_GEOJSON = "UPDATE_GEOJSON";
const SEARCH_MAP = "SEARCH_MAP";
const EXIT_SEARCH = "EXIT_SEARCH";
const UPDATE_VISITED_GEOJSON = "UPDATE_VISITED_GEOJSON";
const RESET_VISITED_GEOJSON = "RESET_VISITED_GEOJSON";
const TOGGLE_FRIENDS_COUNTRIES = "DISPLAY_FRIENDS_COUNTRIES";
const RESET_MAP = "RESET_MAP";

export function updateBounds(bounds) {
  return {
    type: UPDATE_BOUNDS,
    payload: bounds
  };
}

export function exitSearch() {
  return {
    type: EXIT_SEARCH
  };
}

export function searchMap() {
  return {
    type: SEARCH_MAP
  };
}

export function updateGeojson(geojson) {
  return {
    type: UPDATE_GEOJSON,
    payload: geojson
  };
}

export function updateVisitedGeojson(visited) {
  return {
    type: UPDATE_VISITED_GEOJSON,
    payload: visited
  };
}

export function resetVisitedGeojson() {
  return {
    type: RESET_VISITED_GEOJSON
  };
}

export function toggleFriendsCountries() {
  return {
    type: TOGGLE_FRIENDS_COUNTRIES
  };
}

export function resetMap() {
  return {
    type: RESET_MAP
  };
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_BOUNDS:
      return {
        ...state,
        bounds: payload
      };
    case UPDATE_GEOJSON:
      return {
        ...state,
        geojson: payload
      };
    case SEARCH_MAP:
      return {
        ...state,
        searchMap: true
      };
    case EXIT_SEARCH:
      return {
        ...state,
        searchMap: false,
        bounds: [[90, 180], [-90, -180]]
      };
    case UPDATE_VISITED_GEOJSON:
      let visited = [];
      payload.map(e =>
        state.geojson.features.map(a => {
          return a.properties.name.toLowerCase() === e.country_name
            ? visited.push(a)
            : null;
        })
      );
      return {
        ...state,
        visitedListGeojson: visited
      };
    case RESET_VISITED_GEOJSON:
      return {
        ...state,
        visitedListGeojson: []
      };
    case TOGGLE_FRIENDS_COUNTRIES:
      let display = state.displayFriendsCountries ? false : true;
      return {
        ...state,
        displayFriendsCountries: display
      };
    case RESET_MAP:
      return {
        ...initialState,
        geojson: state.geojson
      };
    default:
      return state;
  }
}
