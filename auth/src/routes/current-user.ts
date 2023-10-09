import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
    if(!req.session.jwt) {
        return res.send({currentUSer:null});
    }
});

export {router as currentUserRouter };