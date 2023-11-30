import db from '../model/db.js'

export const POST = async (req, res) => {
    try {
        const { post_id } = req.body;

        if (!post_id) {
                return res.status(400).send({ error: "trending post_id are required" });
            }

        db.run(`INSERT INTO trendings (post_id)
        VALUES (?)`, [post_id], (err) => {
            if (err) {
                return res.status(500).send({ error: "An error occurred" });
            } else
            {
                return res.status(201).send({"Success": "Data Added"})
            }
        })

    } catch (error) {
        return res.status(500).send({ error: "An error occurred in Server" });
    }
};


export const GET = async (req, res) => {
    try {
        db.all(`SELECT * FROM trendings`, (err,rows) => {
            if (err) {
                return res.status(500).send({ error: "An error occurred" });
            } else
            {
                return res.status(200).send(rows)
            }
        })
    }
    catch
    {
        res.status(500).send({"error":"An error occured in Server"})
    }
}

export const DELETE = async (req, res) => {
    try {
        const trending_id = req.query.trendingId;
        db.run(`DELETE FROM trendings WHERE trending_id = ?`, [trending_id], (err) => {
            if (err) {
                return res.status(500).send({ error: "An error occurred", "More Details": err.message });
            } else {
                return res.status(200).send({ success: "Trending Deleted Successfully" });
            }
        });
    } catch (error) {
        res.status(500).send({ error: "An error occurred in Server" });
    }
};

export const getTrendingPost = async (req, res) => {
    try
    {
        db.all(`SELECT p.post_id,p.title,p.subtitle,c.category_name,p.category_id,p.image,p.published_date
                FROM posts p, categorys c
                WHERE p.category_id = c.category_id
                AND post_id in (SELECT post_id FROM Trendings)
                ORDER BY post_id DESC`, (err, rows) => {
                  if (err) {
                        return res.status(500).send({ error: "An error occurred", "More Details": err.message });
                    } else {
                        return res.status(200).send(rows);
                    }
                })
    }
    catch(error)
    {
        res.status(500).send({ error: "An error occurred in Server" });
    }
}


export const dashboardtrending = async (req, res) => {
    try
    {
        db.all(`SELECT p.post_id,p.title
                FROM posts p
                WHERE post_id NOT IN (SELECT post_id FROM Trendings)
                ORDER BY post_id DESC`, (err, rows) => {
                  if (err) {
                        return res.status(500).send({ error: "An error occurred", "More Details": err.message });
                    } else {
                        return res.status(200).send(rows);
                    }
                })
    }
    catch(error)
    {
        res.status(500).send({ error: "An error occurred in Server" });
    }
}


export const getdashboardtrending = async (req, res) => {
    try
    {
        db.all(`SELECT t.trending_id, p.title
                FROM trendings t, posts p
                WHERE t.post_id = p.post_id
                GROUP BY t.trending_id;`, (err, rows) => {
                  if (err) {
                        return res.status(500).send({ error: "An error occurred", "More Details": err.message });
                    } else {
                        return res.status(200).send(rows);
                    }
                })
    }
    catch(error)
    {
        res.status(500).send({ error: "An error occurred in Server" });
    }
}