import express from 'express';
import {
  getAllCryptos,
  getGainers,
  getNewListings,
  getCryptoById,
  createCrypto,
  updateCrypto,
  deleteCrypto
} from '../controllers/cryptoController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/')
  .get(getAllCryptos)
  .post(createCrypto);

router.get('/gainers', getGainers);
router.get('/new', getNewListings);

router.route('/:id')
  .get(getCryptoById)
  .put(updateCrypto)
  .delete(deleteCrypto);

export default router;