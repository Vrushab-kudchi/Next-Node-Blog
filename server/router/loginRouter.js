import jwt  from 'jsonwebtoken';
import { Middleware } from '../Middleware.js';
import express from 'express';

const router = express.Router();

router.post('/login', (req, res) => {
    try
    {
        const { username, password } = req.body;
    if (username == "Daylink831" && password == "Daylink831") {
        jwt.sign({ username: "Daylink831",maxAge: 2, sameSite: 'None', secure: true }, process.env.JWT, (err, token) => {
            if (err) throw err;
            res.cookie('jwt',token);
            res.status(200).send({ Success: "Login Successfully"});
        })
        
    }
    else {
        res.status(404).send({Failed:"Not Working"})
     }
    }
    catch (error)
    {
        res.status(500).send({"error":error,Error:"Server Error"})
    }
    
});


router.get('/verify',Middleware,(req, res) => {
    try
    {
        res.send({Success:"Working"})
    }
    catch (error)
    {
        res.status(500).send({"error":error,Error:"Server Error"})
    }
    
});

router.post('/destroy', (req, res) => {
       try
    {
            res.cookie('jwt', '', { maxAge: 0 });
            res.status(200).send({ Success: "Success"});

    }
    catch (error)
    {
        res.status(500).send({"error":error,Error:"Server Error"})
    }
})
export default router;