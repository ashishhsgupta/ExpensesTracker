import express from "express";
import {addTransaction, getTransactions, updateTransaction, deleteTransaction} from "../userController/userController.js"

const router = express.Router();

router.post('/expanse/api/v1/addTransaction', addTransaction);
router.get('/expanse/api/v1/getTransactions', getTransactions);
router.put('/expanse/api/v1/updateTransaction/:id', updateTransaction);
router.delete('/expanse/api/v1/deleteTransaction/:id', deleteTransaction);


export default router;