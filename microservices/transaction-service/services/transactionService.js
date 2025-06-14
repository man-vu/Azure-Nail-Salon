import { createTransaction, getTransactionsForUser } from '../models/transactionModel.js';

export function listTransactions(userId) {
  return getTransactionsForUser(userId);
}

export function addTransaction(data) {
  return createTransaction(data);
}
