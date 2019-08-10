const getPostsByUser = async (req, res) => {
    const { id } = req.params;
    const db = req.app.get('db');
    const posts = await db.get_posts_by_user([id]).catch(error => console.log(error));
    for (let post of posts) {
        let images = await db.get_images_of_post([post.post_id]).catch(error => console.log(error));
        let imageArr = images.map(e => e = e.image_url)
        post.image_urls = imageArr;
    }
    res.status(200).json(posts);
}

const getCountriesByUser = async (req, res) => {
    const { id } = req.params;
    const db = req.app.get('db');
    const countries = await db.get_countries_by_user([id]).catch(error => console.log(error));
    res.status(200).json(countries)
}

const addCountryToUser = async (req, res) => {
    const { id } = req.session.user;
    const { country } = req.params;
    const db = req.app.get('db');
    const countries = await db.add_country_to_user([id, country]).catch(error => console.log(error));
    res.status(200).json(countries);
}

const deleteCountryFromUser = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json("Please login first!")
    }
    const { id } = req.session.user;
    const { country } = req.params;
    const db = req.app.get('db');
    const countries = await db.delete_country_from_user([id, country]).catch(error => console.log(error));
    res.status(200).json(countries);
}

const getAllUsers = async (req, res) => {
    const db = req.app.get('db');
    const users = await db.get_all_users().catch(error => console.log(error));
    res.status(200).json(users);
}

const getFriendsByUser = async (req, res) => {
    const { id } = req.params;
    const db = req.app.get('db');
    const friends = await db.get_friends_by_user([id]).catch(error => console.log(error));
    const pending = await db.get_friend_requests_by_user([id]).catch(error => console.log(error));
    for (let friend of friends) {
        let countries = await db.get_countries_by_user([friend.user_id]).catch(error => console.log(error));
        let countriesArr = countries.map(e => e = e.country_name);
        console.log(countriesArr);
        friend.visitedList = countriesArr;
    }
    const friendsList = [friends, pending];
    res.status(200).json(friendsList);
}

const addFriendRequest = async (req, res) => {
    const { id } = req.session.user;
    const id2 = req.body.userId;
    const db = req.app.get('db');
    await db.add_friend_request([id, id2]).catch(error => console.log(error));
    res.sendStatus(200);
}

const acceptFriendRequest = async (req, res) => {
    const { id } = req.session.user;
    const id2 = req.body.user_id;
    const db = req.app.get('db');
    await db.accept_friend_request([id, id2]).catch(error => console.log(error));
    res.sendStatus(200);
}

module.exports = {
    getPostsByUser,
    getCountriesByUser,
    addCountryToUser,
    deleteCountryFromUser,
    getFriendsByUser,
    addFriendRequest,
    acceptFriendRequest,
    getAllUsers
}