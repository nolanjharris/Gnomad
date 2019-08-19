import axios from "axios";

const initialState = {
  addPost: false,
  editPost: [false, ""],
  viewPosts: false,
  postCountryInfo: {},
  postCountry: [],
  posts: [],
  loading: false
};

const OPEN_POST_FORM = "OPEN_POST_FORM";
const CLOSE_POST_FORM = "CLOSE_POST_FORM";
const OPEN_EDIT_POST_FORM = "OPEN_EDIT_POST_FORM";
const REQUEST_COUNTRY_POSTS = "REQUEST_COUNTRY_POSTS";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const OPEN_VIEW_POSTS = "OPEN_VIEW_POSTS";
const CLOSE_VIEW_POSTS = "CLOSE_VIEW_POSTS";
const RESET_POST = "RESET_POST";
const EDIT_PROFILE_POST = "EDIT_PROFILE_POST";
const LIKE_POST = "LIKE_POST";
const UNLIKE_POST = "UNLIKE_POST";

export function openPostForm(country) {
  return {
    type: OPEN_POST_FORM,
    payload: country
  };
}

export function closePostForm() {
  return {
    type: CLOSE_POST_FORM
  };
}

export function openEditPostForm(id, country) {
  return {
    type: OPEN_EDIT_POST_FORM,
    payload: [[true, id], [country]]
  };
}

export function openViewPosts(country, countryInfo) {
  return {
    type: OPEN_VIEW_POSTS,
    payload: [country, countryInfo]
  };
}

export function closeViewPosts() {
  return {
    type: CLOSE_VIEW_POSTS
  };
}

export function requestCountryPosts(country, countryInfo) {
  let countryName = country.properties.name.toLowerCase();
  return {
    type: REQUEST_COUNTRY_POSTS,
    payload: axios
      .get(`/api/posts/${countryName}`)
      .then(res => [res.data, country, countryInfo])
  };
}

export function addPost(post) {
  return {
    type: ADD_POST,
    payload: axios.post("/api/posts", { post })
  };
}

export function submitEditPost(country, post) {
  return {
    type: EDIT_POST,
    payload: axios.put(`/api/posts/${country}`, post)
  };
}

export function deletePost(id) {
  return {
    type: DELETE_POST,
    payload: axios.delete(`/api/posts/${id}`)
  };
}

export function resetPost() {
  return {
    type: RESET_POST
  };
}

export function editProfilePost(post) {
  return {
    type: EDIT_PROFILE_POST,
    payload: post
  };
}

export function likePost(postId) {
  return {
    type: LIKE_POST,
    payload: axios.post(`/api/posts/like/${postId}`)
  };
}

export function unlikePost(postId) {
  return {
    type: UNLIKE_POST,
    payload: axios.put(`/api/posts/unlike/${postId}`)
  };
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case OPEN_VIEW_POSTS:
      return {
        ...state,
        viewPosts: true,
        postCountry: payload[0],
        countryInfo: payload[1],
        editPosts: [false, ""]
      };
    case CLOSE_VIEW_POSTS:
      return {
        ...state,
        viewPosts: false,
        posts: [],
        loading: false,
        addPost: false,
        editPosts: [false, ""]
      };
    case OPEN_POST_FORM:
      return {
        ...state,
        addPost: true,
        postCountry: payload,
        viewPosts: false,
        editPosts: [false, ""]
      };
    case CLOSE_POST_FORM:
      return {
        ...state,
        addPost: false,
        posts: [],
        postCountry: [],
        viewPosts: false,
        editPosts: [false, ""]
      };
    case OPEN_EDIT_POST_FORM:
      return {
        ...state,
        addPost: true,
        viewPosts: false,
        editPost: payload[0],
        postCountry: payload[1]
      };
    case `${REQUEST_COUNTRY_POSTS}_FULFILLED`:
      return {
        ...state,
        posts: payload[0],
        postCountry: payload[1],
        postCountryInfo: payload[2],
        loading: false,
        addPost: false,
        viewPosts: true,
        editPosts: [false, ""]
      };
    case `${REQUEST_COUNTRY_POSTS}_PENDING`:
      return {
        ...state,
        loading: true,
        addPost: false,
        // viewPosts: false,
        editPosts: [false, ""]
      };
    case `${ADD_POST}_FULFILLED`:
      return {
        ...state,
        loading: false,
        addPost: false,
        viewPosts: false,
        editPosts: [false, ""]
      };
    case `${ADD_POST}_PENDING`:
      return {
        ...state,
        loading: true,
        addPost: false,
        viewPosts: false,
        editPosts: [false, ""]
      };
    case `${EDIT_POST}_FULFILLED`:
      return {
        ...state,
        loading: false,
        addPost: false,
        viewPosts: false,
        editPosts: [false, ""]
      };
    case `${EDIT_POST}_PENDING`:
      return {
        ...state,
        loading: true,
        addPost: false,
        viewPosts: false,
        editPosts: [false, ""]
      };
    case `${DELETE_POST}_FULFILLED`:
      return {
        ...state,
        loading: false,
        addPost: false,
        viewPosts: false,
        editPosts: [false, ""]
      };
    case `${DELETE_POST}_PENDING`:
      return {
        ...state,
        loading: true,
        addPost: false,
        viewPosts: false,
        editPosts: [false, ""]
      };
    case EDIT_PROFILE_POST:
      return {
        ...state,
        loading: false,
        viewPosts: false,
        posts: payload
      };
    case `${LIKE_POST}_FULFILLED`:
      return {
        ...state,
        loading: false
      };
    case `${LIKE_POST}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${UNLIKE_POST}_FULFILLED`:
      return {
        ...state,
        loading: false
      };
    case `${UNLIKE_POST}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case RESET_POST:
      return initialState;
    default:
      return state;
  }
}
