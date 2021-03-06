const getPostsByCountry = async (req, res) => {
  const { country } = req.params;
  const { id } = req.session.user;
  const db = req.app.get("db");
  const posts = await db.get_posts_by_country([country]);
  for (let post of posts) {
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
  res.status(200).json(posts);
};

const addPost = async (req, res) => {
  const { country, postContent, date, imageArr } = req.body.post;
  const { id } = req.session.user;
  const db = req.app.get("db");
  const post = await db
    .add_post([id, country, postContent, date])
    .catch(error => console.log(error));
  for (let url of imageArr) {
    await db
      .add_image_to_post([post[0].post_id, url])
      .catch(error => console.log(error));
  }
  res.sendStatus(200);
};

// const addPostImage = async (req, res) => {
//     const {country, imageArr } = req.body;
//     const {id} = req.session.user;
//     const db = req.app.get('db');
// }

const editPost = async (req, res) => {
  const { postContent } = req.body;
  const { country } = req.params;
  const { id } = req.session.user;
  const db = req.app.get("db");
  await db
    .edit_post([id, country, postContent])
    .catch(error => console.log(error));
  res.sendStatus(200);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const db = req.app.get("db");
  await db.delete_post([id]).catch(error => console.log(error));
  res.sendStatus(200);
};

const likePost = async (req, res) => {
  const { postId } = req.params;
  const { id } = req.session.user;
  const db = req.app.get("db");
  await db.add_like_to_post([postId, id]).catch(error => console.log(error));
  res.sendStatus(200);
};

const unlikePost = async (req, res) => {
  const { postId } = req.params;
  const { id } = req.session.user;
  const db = req.app.get("db");
  await db.unlike_post([id, postId]).catch(error => console.log(error));
  res.sendStatus(200);
};

module.exports = {
  getPostsByCountry,
  addPost,
  editPost,
  deletePost,
  likePost,
  unlikePost
};
