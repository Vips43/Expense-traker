// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("expense");

// db.expenses.updateMany(
//   { deleted: { $exists: false } },
//   { $set: { deleted: false } },
// );
// db.earnings.updateMany(
//   { deleted: { $exists: false } },
//   { $set: { deleted: false } },
// );
db.expenses.find({})