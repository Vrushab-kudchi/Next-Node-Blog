import db from '../model/db.js'

export const POST = async (req, res) => {
    try {
        const { title,subtitle,category_id ,image,content,meta_title,meta_description } = req.body;

        if (!title || !subtitle || !category_id || !image || !content || !meta_description || !meta_title) {
                return res.status(400).send({ error: "Category name and image are required" });
            }

        db.run(`INSERT INTO posts (title,subtitle,category_id ,image,content,meta_title,meta_description)
        VALUES (?,?,?,?,?,?,?)`, [title,subtitle,category_id ,image,content,meta_title,meta_description], (err) => {
            if (err) {
                return res.status(500).send({ error: "An error occurred","errorDetail":err.message });
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
        db.all(`SELECT * FROM posts
            ORDER BY post_id DESC`, (err, rows) => {
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

export const PUT = async (req, res) => {
    try {
        const post_id = req.query.postId;
        const { title,subtitle,category_id ,image,content,meta_title,meta_description } = req.body;

        const updateFields = [];
        const updateValues = [];

        if (title !== undefined) {
            updateFields.push("title = ?");
            updateValues.push(title);
        }

        if (subtitle !== undefined) {
            updateFields.push("subtitle = ?");
            updateValues.push(subtitle);
        }

        if (category_id !== undefined) {
            updateFields.push("category_id = ?");
            updateValues.push(category_id);
        }
        if (image !== undefined) {
            updateFields.push("image = ?");
            updateValues.push(image);
        }
        if (content !== undefined) {
            updateFields.push("content = ?");
            updateValues.push(content);
        }
        if (meta_title !== undefined) {
            updateFields.push("meta_title = ?");
            updateValues.push(meta_title);
        }
        if (meta_description !== undefined) {
            updateFields.push("meta_description = ?");
            updateValues.push(meta_description);
        }

        if (updateFields.length === 0) {
            return res.status(400).send({ error: "No valid update fields provided" });
        }

        await db.run(
            `UPDATE posts SET ${updateFields.join(', ')} WHERE post_id = ?`,
            [...updateValues, post_id],
            (err) => {
                if (err) {
                    return res.status(500).send({ error: "An error occurred" });
                } else {
                    return res.status(200).send({ success: "Posts updated successfully" });
                }
            }
        );
    } catch (error) {
        return res.status(500).send({ error: "An error occurred in Server" });
    }
};

export const DELETE = async (req, res) => {
    try
    {
        const post_id  = req.query.postId;
        db.run(`DELETE FROM posts where post_id = ?`, [post_id]
            , (err) => {
                if (err)
                {
                    return res.status(500).send({ error: "An error occurred" });
                }
                else
                {
                    return res.status(200).send({"Success": "Post Deleted Successfully"})
                }
        })
    }
    catch
    {
        res.status(500).send({"error":"An error occured in Server"})
    }
}


export const getSpecific = async (req,res) => {
    try
    {
        const { id } = req.params;
        db.all(`SELECT p.post_id,p.title,p.subtitle,p.content ,c.category_name,c.category_id,p.image,p.meta_title,p.meta_description
        from posts p , categorys c
        where p.category_id = c.category_id
        and post_id = ?`, [id],
            (err, rows) => {
         if (err) {
                return res.status(500).send({ error: "An error occurred","ErrorDetail":err.message });
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

export const getDashboardPosts = async (req,res) => {
    try
    {
        db.all(`SELECT p.post_id,p.title,p.subtitle,c.category_name,p.category_id,p.image,p.content,p.meta_title,p.meta_description,p.published_date
        FROM posts p, categorys c
        WHERE p.category_id = c.category_id;`,
            (err, rows) => {
         if (err) {
                return res.status(500).send({ error: "An error occurred","ErrorDetail":err.message });
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