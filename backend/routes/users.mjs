import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).send({
        msg: 'Hello From PetConnect Backend!',
        data: 'This will be the template for the responses of PetConnect backend APIs',
        status: 'success',
    });
});

export default router;