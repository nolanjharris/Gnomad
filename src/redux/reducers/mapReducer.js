const initialState = {
    bounds: [[90, 180], [-90, -180]],
    geojson: {},
    search: false
}

const UPDATE_BOUNDS = 'UPDATE_BOUNDS';
const UPDATE_GEOJSON = 'UPDATE_GEOJSON';
const SEARCH_MAP = 'SEARCH_MAP';

export function updateBounds(bounds) {
    return {
        type: UPDATE_BOUNDS,
        payload: bounds
    }
}

export function searchMap() {
    return {
        type: SEARCH_MAP
    }
}

export function updateGeojson(geojson) {
    return {
        type: UPDATE_GEOJSON,
        payload: geojson
    }
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case UPDATE_BOUNDS:
            return {
                ...state,
                bounds: payload
            }
        case UPDATE_GEOJSON:
            return {
                ...state,
                geojson: payload
            }
        case SEARCH_MAP:
            return {
                ...state,
                searchMap: true
            }
        default: return state;
    }
}