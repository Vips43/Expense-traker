import Earning from "../model/earningModel.js";
import Expense from "../model/expenseModel.js";
import ExcelJS from "exceljs";
import User from "../model/userModel.js";

export const reports = async (req, res) => {
  try {
    // 1. Fetch data concurrently
    const [expenses, earnings] = await Promise.all([
      Expense.find({ user: req.user._id }).lean(), // .lean() converts to plain JS objects automatically
      Earning.find({ user: req.user._id }).lean(),
    ]);
    const user = await User.findById(req.user._id)

    // 2. Format and map data so both types share a uniform structure
    const formattedExpenses = expenses.map(item => ({
      id: item._id.toString(),
      date: item.date || item.createdAt, 
      description: item.description,
      type: "Expense",
      category: item.category || "N/A",
      paymentMethod: item.paymentMethod || "Offline",
      amount: item.amount
    }));

    const formattedEarnings = earnings.map(item => ({
      id: item._id.toString(),
      date: item.date || item.createdAt,
      description: item.description,
      type: "Earning",
      category: item.category || "N/A",
      paymentMethod: item.paymentMethod || "N/A",
      amount: item.amount
    }));

    // 3. Combine and sort by date (Newest or oldest first)
    const combined = [...formattedExpenses, ...formattedEarnings].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    if (combined.length === 0) {
      return res.status(400).json({ msg: "No data available to export" });
    }

    // 4. Initialize Excel workbook & define explicit structural columns
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Financial Report");

    sheet.columns = [
      { header: "Transaction ID", key: "id", width: 30 },
      { header: "Date", key: "date", width: 15 },
      { header: "Description", key: "description", width: 25 },
      { header: "Type", key: "type", width: 12 },
      { header: "Category", key: "category", width: 15 },
      { header: "Payment Method", key: "paymentMethod", width: 18 },
      { header: "Amount (₹)", key: "amount", width: 15 },
    ];

    // Style the header row to look professional
    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFF' } };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '2F4F4F' } // Dark Slate Grey
    };

    // 5. Add rows
    sheet.addRows(combined);

    // 6. Set response headers to force download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${user.name}-${Date.now()}.xlsx`
    );

    // Write straight to response stream
    await workbook.xlsx.write(res);
    return res.end();

  } catch (error) {
    console.error("Error generating report:", error);
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};