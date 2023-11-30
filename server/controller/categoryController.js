import db from '../model/db.js'

export const POST = async (req, res) => {
    try {
        const { category_name, category_image } = req.body;

        if (!category_name || !category_image) {
                return res.status(400).send({ error: "Category name and image are required" });
            }

        db.run(`INSERT INTO categorys (category_name, category_image)
        VALUES (?,?)`, [category_name, category_image], (err) => {
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
        db.all(`SELECT * FROM categorys`, (err,rows) => {
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
        const category_id = req.query.categoryId;
        const { category_name, category_image } = req.body;

        const updateFields = [];
        const updateValues = [];

        if (category_name !== undefined) {
            updateFields.push("category_name = ?");
            updateValues.push(category_name);
        }

        if (category_image !== undefined) {
            updateFields.push("category_image = ?");
            updateValues.push(category_image);
        }

        if (updateFields.length === 0) {
            return res.status(400).send({ error: "No valid update fields provided" });
        }

        await db.run(
            `UPDATE categorys SET ${updateFields.join(', ')} WHERE category_id = ?`,
            [...updateValues, category_id],
            (err) => {
                if (err) {
                    return res.status(500).send({ error: "An error occurred" });
                } else {
                    return res.status(200).send({ success: "Category updated successfully" });
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
        const category_id  = req.query.categoryId;
        db.run(`DELETE FROM categorys where category_id = ?`, [category_id]
            , (err) => {
                if (err)
                {
                    return res.status(500).send({ error: "An error occurred" });
                }
                else
                {
                    return res.status(200).send({"Success": "Category Deleted Successfully"})
                }
        })
    }
    catch
    {
        res.status(500).send({"error":"An error occured in Server"})
    }
}


export const related = async (req, res) => {
    let { id } = req.params;
    db.all(`Select * from posts
            where category_id = ?` , [id],
        (err,rows) => {
                if (err)
                {
                    return res.status(500).send({ error: "An error occurred" });
                }
                else
                {
                    return res.status(200).send(rows)
                }
    })
}