import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUsers);
router.get('/:userId', UserControllers.getSingleUser);
router.put('/:userId', UserControllers.updatedUser);
router.delete('/:userId', UserControllers.deleteUser);
router.put('/:userId/orders', UserControllers.updateOrCreateOrders);
router.get('/:userId/orders', UserControllers.getUserOrders);
router.get('/:userId/orders/total-price', UserControllers.getTotalPriceOfOrder);

export const UserRoutes = router;
