const getFriendsByUser = async (req, res) => {
  const { id } = req.params;
  const db = req.app.get("db");
  const friends = await db
    .get_friends_by_user([id])
    .catch(error => console.log(error));
  const pending = await db
    .get_friend_requests_by_user([id])
    .catch(error => console.log(error));
  const sentRequests = await db
    .get_pending_friend_requests([id])
    .catch(error => console.log(error));
  if (
    friends.length === 0 &&
    pending.length === 0 &&
    sentRequests.length === 0
  ) {
    return res.status(200).json([[], [], []]);
  }
  for (let friend of friends) {
    let countries = await db
      .get_countries_by_user([friend.user_id])
      .catch(error => console.log(error));
    let countriesArr = countries.map(e => (e = e.country_name));
    friend.visitedList = countriesArr;
    friend.posts = await db
      .get_posts_by_user([friend.user_id])
      .catch(error => console.log(error));
    for (let post of friend.posts) {
      let images = await db
        .get_images_of_post([post.post_id])
        .catch(error => console.log(error));
      let imageArr = images.map(e => (e = e.image_url));
      post.image_urls = imageArr;
      let userLiked = await db
        .check_user_liked_post([id, post.post_id])
        .catch(error => console.log(error));
      if (userLiked.length > 0 && userLiked[0].liked) {
        post.userLiked = true;
      } else {
        post.userLiked = false;
      }
    }
  }
  const friendsList = [friends, pending, sentRequests];
  res.status(200).json(friendsList);
};

const addFriendRequest = async (req, res) => {
  const { id } = req.session.user;
  const id2 = req.body.userId;
  const db = req.app.get("db");
  await db.add_friend_request([id, id2]).catch(error => console.log(error));
  const friends = await db
    .get_friends_by_user([id])
    .catch(error => console.log(error));
  const pending = await db
    .get_friend_requests_by_user([id])
    .catch(error => console.log(error));
  const sentRequests = await db
    .get_pending_friend_requests([id])
    .catch(error => console.log(error));
  for (let friend of friends) {
    let countries = await db
      .get_countries_by_user([friend.user_id])
      .catch(error => console.log(error));
    let countriesArr = countries.map(e => (e = e.country_name));
    friend.visitedList = countriesArr;
    friend.posts = await db
      .get_posts_by_user([friend.user_id])
      .catch(error => console.log(error));
    for (let post of friend.posts) {
      let images = await db
        .get_images_of_post([post.post_id])
        .catch(error => console.log(error));
      let imageArr = images.map(e => (e = e.image_url));
      post.image_urls = imageArr;
      let userLiked = await db
        .check_user_liked_post([id, post.post_id])
        .catch(error => console.log(error));
      if (userLiked.length > 0 && userLiked[0].liked) {
        post.userLiked = true;
      } else {
        post.userLiked = false;
      }
    }
  }
  const friendsList = [friends, pending, sentRequests];
  res.status(200).json(friendsList);
};

const acceptFriendRequest = async (req, res) => {
  const { id } = req.session.user;
  const id2 = req.body.userId;
  const db = req.app.get("db");
  await db.accept_friend_request([id, id2]).catch(error => console.log(error));
  const friends = await db
    .get_friends_by_user([id])
    .catch(error => console.log(error));
  const pending = await db
    .get_friend_requests_by_user([id])
    .catch(error => console.log(error));
  const sentRequests = await db
    .get_pending_friend_requests([id])
    .catch(error => console.log(error));
  for (let friend of friends) {
    let countries = await db
      .get_countries_by_user([friend.user_id])
      .catch(error => console.log(error));
    let countriesArr = countries.map(e => (e = e.country_name));
    friend.visitedList = countriesArr;
    friend.posts = await db
      .get_posts_by_user([friend.user_id])
      .catch(error => console.log(error));
    for (let post of friend.posts) {
      let images = await db
        .get_images_of_post([post.post_id])
        .catch(error => console.log(error));
      let imageArr = images.map(e => (e = e.image_url));
      post.image_urls = imageArr;
      let userLiked = await db
        .check_user_liked_post([id, post.post_id])
        .catch(error => console.log(error));
      if (userLiked.length > 0 && userLiked[0].liked) {
        post.userLiked = true;
      } else {
        post.userLiked = false;
      }
    }
  }
  const friendsList = [friends, pending, sentRequests];
  res.status(200).json(friendsList);
};

const updateFriendsColor = async (req, res) => {
  let { userId, friendColor } = req.body;
  let { id } = req.session.user;
  let db = req.app.get("db");
  db.update_friends_color([id, userId, friendColor]).catch(error =>
    console.log(error)
  );
  res.status(200).json(req.body);
};

module.exports = {
  getFriendsByUser,
  addFriendRequest,
  acceptFriendRequest,
  updateFriendsColor
};
