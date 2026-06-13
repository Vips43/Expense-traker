// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("expense");

db.expenses.createIndex({ name: 1 });
db.expenses.find({ name: "bus ticket" }).explain("executionStats")

// db.expenses.countDocuments({})
