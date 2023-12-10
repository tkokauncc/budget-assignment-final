const router = require("express").Router();
const Expense = require("./models/Expense");
const Category = require("./models/Category");

router.post("/category", async (req, res) => {
  try {
    console.log(req.user.id);
    const { name, budget } = req.body;
    const category = await Category.create({ user: req.user.id, name, budget });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to create category" });
  }
});

router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve categories" });
  }
});

router.post("/expense", async (req, res) => {
  try {
    const { category, description, amount } = req.body;
    const expense = await Expense.create({
      category,
      description,
      amount,
      user: req.user.id,
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: "Failed to create expense" });
  }
});

router.get("/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).populate(
      "category"
    );
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve expenses" });
  }
});

module.exports = router;
