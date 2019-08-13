const getPostsByUser = async (req, res) => {
  const { id } = req.params;
  const db = req.app.get("db");
  const posts = await db
    .get_posts_by_user([id])
    .catch(error => console.log(error));
  for (let post of posts) {
    let images = await db
      .get_images_of_post([post.post_id])
      .catch(error => console.log(error));
    let imageArr = images.map(e => (e = e.image_url));
    post.image_urls = imageArr;
  }
  res.status(200).json(posts);
};

const getCountriesByUser = async (req, res) => {
  const { id } = req.params;
  const db = req.app.get("db");
  const countries = await db
    .get_countries_by_user([id])
    .catch(error => console.log(error));
  res.status(200).json(countries);
};

const addCountryToUser = async (req, res) => {
  const { id } = req.session.user;
  const { country } = req.params;
  const db = req.app.get("db");
  const countries = await db
    .add_country_to_user([id, country])
    .catch(error => console.log(error));
  res.status(200).json(countries);
};

const deleteCountryFromUser = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json("Please login first!");
  }
  const { id } = req.session.user;
  const { country } = req.params;
  const db = req.app.get("db");
  const countries = await db
    .delete_country_from_user([id, country])
    .catch(error => console.log(error));
  res.status(200).json(countries);
};

const getAllUsers = async (req, res) => {
  const db = await req.app.get("db");
  const users = await db.get_all_users().catch(error => console.log(error));
  res.status(200).json(users);
};

const updateProfilePicture = async (req, res) => {
  const { profilePic } = req.body;
  const { id } = req.session.user;
  const db = req.app.get("db");
  db.update_profile_pic([id, profilePic]).catch(error => console.log(error));
  res.status(200).json(profilePic);
};

const updateUserColor = async (req, res) => {
  const { userColor } = req.body;
  const { id } = req.session.user;
  const db = req.app.get("db");
  db.update_user_color([id, userColor]).catch(error => console.log(error));
  res.status(200).json(userColor);
};

module.exports = {
  getPostsByUser,
  getCountriesByUser,
  addCountryToUser,
  deleteCountryFromUser,
  getAllUsers,
  updateProfilePicture,
  updateUserColor
};
