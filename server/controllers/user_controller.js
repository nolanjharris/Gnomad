const getPostsByUser = async (req, res) => {
    const { id } = req.params;
    const db = req.app.get('db');
    const posts = await db.get_posts_by_user([id]).catch(error => console.log(error));
    for (let post of posts) {
        let images = await db.get_images_of_post([post.post_id]).catch(error => console.log(error));
        let imageArr = images.map(e => e = e.image_url)
        post.image_urls = imageArr;
    }
    console.log(posts);
    res.status(200).json(posts);
}

const getCountriesByUser = async (req, res) => {
    const { id } = req.params;
    const db = req.app.get('db');
    const countries = await db.get_countries_by_user([id]).catch(error => console.log(error));
    const countriesArr = countries.map(e => e = e.country_name);
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

module.exports = {
    getPostsByUser,
    getCountriesByUser,
    addCountryToUser,
    deleteCountryFromUser
}