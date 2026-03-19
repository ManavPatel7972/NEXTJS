"use client"
import { useState } from "react"

export default function CalculatorUi() {
  const [num1, setNum1] = useState<string>("")
  const [num2, setNum2] = useState<string>("")
  const [result, setResult] = useState<number | string | null>(null)
  const [activeOp, setActiveOp] = useState<string | null>(null)

  const calculate = (op: string) => {
    setActiveOp(op)
    const a = Number(num1)
    const b = Number(num2)
    if (op === "/" && b === 0) {
      setResult("Error")
      return
    }
    const ops: Record<string, number> = {
      "+": a + b,
      "−": a - b,
      "×": a * b,
      "÷": a / b,
    }
    setResult(ops[op])
  }

  const clear = () => {
    setNum1("")
    setNum2("")
    setResult(null)
    setActiveOp(null)
  }

  const formatResult = (val: number | string | null) => {
    if (val === null) return "—"
    if (val === "Error") return "Err"
    if (typeof val === "number") {
      if (!isFinite(val)) return "∞"
      return Number.isInteger(val) ? val.toString() : parseFloat(val.toFixed(8)).toString()
    }
    return val
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;600;700&display=swap');

        .calc-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f0f0f0;
          font-family: 'Rajdhani', sans-serif;
        }

        .calc-shell {
          width: 320px;
          background: #ffffff;
          border: 2px solid #1a1a1a;
          border-radius: 20px;
          padding: 28px 24px 24px;
          box-shadow: 6px 6px 0px #1a1a1a;
          position: relative;
          overflow: hidden;
        }

        .calc-shell::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: #1a1a1a;
        }

        .calc-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.25em;
          color: #888;
          text-transform: uppercase;
          margin-bottom: 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .calc-label span {
          color: #1a1a1a;
          font-weight: bold;
        }

        .input-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 14px;
        }

        .input-wrap {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .input-lbl {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.2em;
          color: #555;
          font-weight: bold;
        }

        .calc-input {
          width: 100%;
          background: #f5f5f5;
          border: 2px solid #1a1a1a;
          border-radius: 8px;
          padding: 10px 12px;
          color: #1a1a1a;
          font-family: 'Share Tech Mono', monospace;
          font-size: 16px;
          font-weight: bold;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }

        .calc-input::placeholder {
          color: #bbb;
          font-size: 13px;
          font-weight: normal;
        }

        .calc-input:focus {
          border-color: #0057ff;
          box-shadow: 3px 3px 0px #0057ff;
          background: #fff;
        }

        /* Remove number input arrows */
        .calc-input::-webkit-outer-spin-button,
        .calc-input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        .calc-input[type=number] { -moz-appearance: textfield; }

        .divider {
          height: 2px;
          background: #1a1a1a;
          margin: 16px 0;
          opacity: 0.12;
        }

        .ops-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-bottom: 12px;
        }

        .op-btn {
          background: #f5f5f5;
          border: 2px solid #1a1a1a;
          border-radius: 10px;
          color: #1a1a1a;
          font-family: 'Share Tech Mono', monospace;
          font-size: 20px;
          font-weight: bold;
          padding: 12px 0;
          cursor: pointer;
          transition: all 0.1s;
          position: relative;
          box-shadow: 3px 3px 0px #1a1a1a;
        }

        .op-btn:hover {
          background: #e8e8e8;
          transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0px #1a1a1a;
        }

        .op-btn:active {
          transform: translate(2px, 2px);
          box-shadow: 1px 1px 0px #1a1a1a;
        }

        .op-btn.active {
          background: #1a1a1a;
          color: #ffffff;
          box-shadow: 3px 3px 0px #555;
        }

        .result-panel {
          background: #1a1a1a;
          border: 2px solid #1a1a1a;
          border-radius: 12px;
          padding: 14px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          min-height: 56px;
        }

        .result-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.2em;
          color: #888;
        }

        .result-value {
          font-family: 'Share Tech Mono', monospace;
          font-size: 28px;
          font-weight: bold;
          color: #ffffff;
          letter-spacing: -0.02em;
          transition: all 0.2s;
        }

        .result-value.empty {
          color: #444;
          font-size: 22px;
        }

        .result-value.error {
          color: #ff3b3b;
        }

        .clear-btn {
          width: 100%;
          background: transparent;
          border: 2px solid #ccc;
          border-radius: 10px;
          color: #888;
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          padding: 9px 0;
          cursor: pointer;
          transition: all 0.15s;
          text-transform: uppercase;
        }

        .clear-btn:hover {
          border-color: #ff3b3b;
          color: #ff3b3b;
          background: rgba(255,59,59,0.06);
        }

        .op-sub-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 8px;
          letter-spacing: 0.1em;
          color: inherit;
          opacity: 0.5;
          display: block;
          margin-top: 2px;
        }
      `}</style>

      <div className="calc-root">
        <div className="calc-shell">
          <div className="calc-label">
            CALC <span>v1.0</span>
          </div>

          <div className="input-row">
            <div className="input-wrap">
              <span className="input-lbl">A</span>
              <input
                className="calc-input"
                type="number"
                placeholder="0"
                value={num1}
                onChange={(e) => { setNum1(e.target.value); setResult(null); setActiveOp(null) }}
              />
            </div>
            <div className="input-wrap">
              <span className="input-lbl">B</span>
              <input
                className="calc-input"
                type="number"
                placeholder="0"
                value={num2}
                onChange={(e) => { setNum2(e.target.value); setResult(null); setActiveOp(null) }}
              />
            </div>
          </div>

          <div className="divider" />

          <div className="ops-grid">
            {[
              { sym: "+", sub: "ADD" },
              { sym: "−", sub: "SUB" },
              { sym: "×", sub: "MUL" },
              { sym: "÷", sub: "DIV" },
            ].map(({ sym, sub }) => (
              <button
                key={sym}
                className={`op-btn${activeOp === sym ? " active" : ""}`}
                onClick={() => calculate(sym)}
              >
                {sym}
                <span className="op-sub-label">{sub}</span>
              </button>
            ))}
          </div>

          <div className="result-panel">
            <span className="result-label">RESULT</span>
            <span className={`result-value${result === null ? " empty" : ""}${result === "Error" ? " error" : ""}`}>
              {formatResult(result)}
            </span>
          </div>

          <button className="clear-btn" onClick={clear}>
            Clear
          </button>
        </div>
      </div>
    </>
  )
}