const getPostsByUser = async (req, res) => {
    const { id } = req.params;
    const db = req.app.get('db');
    const posts = await db.get_posts_by_user([id]).catch(error => console.log(error));
    res.status(200).json(posts);
}

const getCountriesByUser = async (req, res) => {
    const { id } = req.params;
    const db = req.app.get('db');
    const countries = await db.get_countries_by_user([id]).catch(error => console.log(error));
    res.status(200).json(countries);
}

const addCountryToUser = async (req, res) => {
    const { id } = req.session.user;
    const { country } = req.body;
    const db = req.app.get('db');
    await db.add_country_to_user([id, country]).catch(error => console.log(error));
    res.sendStatus(200);
}

const deleteCountryFromUser = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json("Please login first!")
    }
    const { id } = req.session.user;
    const { country } = req.body;
    const db = req.app.get('db');
    await db.delete_country_from_user([id, country]).catch(error => console.log(error));
    res.sendStatus(200);
}

module.exports = {
    getPostsByUser,
    getCountriesByUser,
    addCountryToUser,
    deleteCountryFromUser
}