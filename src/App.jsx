import { useMemo, useState } from 'react';

const STAGES = [
  'Demolition',
  'Framing',
  'Electrical',
  'Plumbing',
  'Drywall',
  'Flooring',
  'Painting',
  'Fixtures',
  'Cleanup',
];

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

function calculateLoanPayment(principal, annualRate, years) {
  const monthlyRate = annualRate / 12;
  const months = years * 12;

  if (months === 0) return 0;
  if (monthlyRate === 0) return principal / months;

  const factor = (monthlyRate * (1 + monthlyRate) ** months) / ((1 + monthlyRate) ** months - 1);
  return principal * factor;
}

export default function App() {
  const [analysisInput, setAnalysisInput] = useState({
    purchasePrice: 0,
    arv: 0,
    closingCosts: 0,
    renoBudget: 0,
    holdingMonths: 6,
    monthlyCarrying: 0,
  });

  const [loanInput, setLoanInput] = useState({
    principal: 0,
    rate: 0,
    years: 30,
  });

  const [stages, setStages] = useState(STAGES.map((name) => ({ name, done: false })));

  const [expenseForm, setExpenseForm] = useState({
    description: '',
    category: 'materials',
    amount: 0,
  });
  const [expenses, setExpenses] = useState([]);

  const analysis = useMemo(() => {
    const carryingCosts = analysisInput.holdingMonths * analysisInput.monthlyCarrying;
    const totalInvestment =
      analysisInput.purchasePrice + analysisInput.closingCosts + analysisInput.renoBudget + carryingCosts;
    const grossProfit = analysisInput.arv - totalInvestment;
    const roi = totalInvestment === 0 ? 0 : (grossProfit / totalInvestment) * 100;
    const maxOffer70Rule = analysisInput.arv * 0.7 - analysisInput.renoBudget;

    return {
      carryingCosts,
      totalInvestment,
      grossProfit,
      roi,
      maxOffer70Rule,
    };
  }, [analysisInput]);

  const loan = useMemo(() => {
    const annualRate = loanInput.rate / 100;
    const monthlyPayment = calculateLoanPayment(loanInput.principal, annualRate, loanInput.years);
    const totalLoanCost = monthlyPayment * loanInput.years * 12;

    return {
      monthlyPayment,
      totalLoanCost,
    };
  }, [loanInput]);

  const stageSummary = useMemo(() => {
    const completed = stages.filter((stage) => stage.done).length;
    const completionRate = (completed / stages.length) * 100;

    return {
      completed,
      total: stages.length,
      completionRate,
    };
  }, [stages]);

  const expenseSummary = useMemo(() => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalsByCategory = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] ?? 0) + expense.amount;
      return acc;
    }, {});

    return { total, totalsByCategory };
  }, [expenses]);

  const addExpense = (event) => {
    event.preventDefault();

    if (!expenseForm.description.trim() || expenseForm.amount <= 0) {
      return;
    }

    setExpenses((current) => [
      ...current,
      {
        ...expenseForm,
        description: expenseForm.description.trim(),
      },
    ]);

    setExpenseForm({
      description: '',
      category: 'materials',
      amount: 0,
    });
  };

  return (
    <>
      <header className="app-header">
        <h1>Re-model</h1>
        <p>Home Renovation Investment App (React MVP)</p>
      </header>

      <main className="grid">
        <section className="card">
          <h2>1) Property Discovery & Analysis</h2>
          <form className="form-grid">
            <label>
              Purchase Price
              <input
                type="number"
                min="0"
                value={analysisInput.purchasePrice}
                onChange={(e) =>
                  setAnalysisInput((prev) => ({ ...prev, purchasePrice: Number(e.target.value) }))
                }
              />
            </label>

            <label>
              Estimated ARV
              <input
                type="number"
                min="0"
                value={analysisInput.arv}
                onChange={(e) => setAnalysisInput((prev) => ({ ...prev, arv: Number(e.target.value) }))}
              />
            </label>

            <label>
              Closing Costs
              <input
                type="number"
                min="0"
                value={analysisInput.closingCosts}
                onChange={(e) =>
                  setAnalysisInput((prev) => ({ ...prev, closingCosts: Number(e.target.value) }))
                }
              />
            </label>

            <label>
              Renovation Budget
              <input
                type="number"
                min="0"
                value={analysisInput.renoBudget}
                onChange={(e) =>
                  setAnalysisInput((prev) => ({ ...prev, renoBudget: Number(e.target.value) }))
                }
              />
            </label>

            <label>
              Holding Months
              <input
                type="number"
                min="0"
                value={analysisInput.holdingMonths}
                onChange={(e) =>
                  setAnalysisInput((prev) => ({ ...prev, holdingMonths: Number(e.target.value) }))
                }
              />
            </label>

            <label>
              Monthly Carrying Cost
              <input
                type="number"
                min="0"
                value={analysisInput.monthlyCarrying}
                onChange={(e) =>
                  setAnalysisInput((prev) => ({ ...prev, monthlyCarrying: Number(e.target.value) }))
                }
              />
            </label>
          </form>

          <div className="result-list">
            <div className="result-chip">Total Investment: {currency.format(analysis.totalInvestment)}</div>
            <div className="result-chip">Carrying Costs: {currency.format(analysis.carryingCosts)}</div>
            <div className="result-chip">Estimated Gross Profit: {currency.format(analysis.grossProfit)}</div>
            <div className="result-chip">Estimated ROI: {analysis.roi.toFixed(1)}%</div>
            <div className="result-chip">
              70% Rule Max Offer (minus reno): {currency.format(analysis.maxOffer70Rule)}
            </div>
          </div>
        </section>

        <section className="card">
          <h2>2) Financial Planning & Funding</h2>
          <form className="form-grid">
            <label>
              Loan Amount
              <input
                type="number"
                min="0"
                value={loanInput.principal}
                onChange={(e) => setLoanInput((prev) => ({ ...prev, principal: Number(e.target.value) }))}
              />
            </label>

            <label>
              Interest Rate (%)
              <input
                type="number"
                min="0"
                step="0.01"
                value={loanInput.rate}
                onChange={(e) => setLoanInput((prev) => ({ ...prev, rate: Number(e.target.value) }))}
              />
            </label>

            <label>
              Loan Term (years)
              <input
                type="number"
                min="1"
                value={loanInput.years}
                onChange={(e) => setLoanInput((prev) => ({ ...prev, years: Number(e.target.value) }))}
              />
            </label>
          </form>

          <div className="result-list">
            <div className="result-chip">Estimated Monthly Payment: {currency.format(loan.monthlyPayment)}</div>
            <div className="result-chip">Estimated Total Loan Cost: {currency.format(loan.totalLoanCost)}</div>
          </div>
        </section>

        <section className="card">
          <h2>3) Project Stage Tracking</h2>
          <p className="hint">Track completion across major renovation phases.</p>

          <div className="stage-list">
            {stages.map((stage, index) => (
              <label className="stage-item" key={stage.name}>
                <span>{stage.name}</span>
                <input
                  type="checkbox"
                  checked={stage.done}
                  onChange={(e) => {
                    const next = [...stages];
                    next[index] = { ...next[index], done: e.target.checked };
                    setStages(next);
                  }}
                />
              </label>
            ))}
          </div>

          <div className="result-list">
            <div className="result-chip">
              Completed Stages: {stageSummary.completed}/{stageSummary.total}
            </div>
            <div className="result-chip">Project Completion: {stageSummary.completionRate.toFixed(1)}%</div>
          </div>
        </section>

        <section className="card">
          <h2>4) Expense Management & Accounting</h2>

          <form className="form-grid" onSubmit={addExpense}>
            <label>
              Description
              <input
                type="text"
                value={expenseForm.description}
                onChange={(e) => setExpenseForm((prev) => ({ ...prev, description: e.target.value }))}
                required
              />
            </label>

            <label>
              Category
              <select
                value={expenseForm.category}
                onChange={(e) => setExpenseForm((prev) => ({ ...prev, category: e.target.value }))}
              >
                <option value="materials">Materials</option>
                <option value="labor">Labor</option>
                <option value="permits">Permits</option>
                <option value="tools">Tools</option>
                <option value="other">Other</option>
              </select>
            </label>

            <label>
              Amount
              <input
                type="number"
                min="0"
                step="0.01"
                value={expenseForm.amount}
                onChange={(e) => setExpenseForm((prev) => ({ ...prev, amount: Number(e.target.value) }))}
                required
              />
            </label>

            <button type="submit">Add Expense</button>
          </form>

          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr key={`${expense.description}-${index}`}>
                  <td>{expense.description}</td>
                  <td>{expense.category}</td>
                  <td>{currency.format(expense.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="result-list">
            <div className="result-chip">Total Tracked Spend: {currency.format(expenseSummary.total)}</div>
            {Object.entries(expenseSummary.totalsByCategory).map(([category, amount]) => (
              <div className="result-chip" key={category}>
                {category}: {currency.format(amount)}
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <small>
          React MVP starter for the Re-model roadmap. Next phases: comps integrations, persistent data,
          portfolio analytics, and 3D visualization.
        </small>
      </footer>
    </>
  );
}
