"use client"
import { useState } from "react"

export default function CounterUi() {
  const [count, setCount] = useState<number>(0)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@600;700&display=swap');

        .counter-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f0f0f0;
          font-family: 'Rajdhani', sans-serif;
        }

        .counter-card {
          width: 300px;
          background: #ffffff;
          border: 2px solid #1a1a1a;
          border-radius: 20px;
          padding: 36px 28px 28px;
          box-shadow: 6px 6px 0px #1a1a1a;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          position: relative;
          overflow: hidden;
        }

        .counter-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: #1a1a1a;
        }

        .counter-title {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.25em;
          color: #888;
          text-transform: uppercase;
          margin-bottom: 28px;
        }

        .counter-display {
          width: 100%;
          background: #1a1a1a;
          border-radius: 12px;
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          margin-bottom: 24px;
        }

        .counter-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.25em;
          color: #888;
          text-transform: uppercase;
        }

        .counter-value {
          font-family: 'Share Tech Mono', monospace;
          font-size: 64px;
          font-weight: bold;
          color: #ffffff;
          line-height: 1;
          letter-spacing: -0.02em;
          transition: transform 0.1s;
        }

        .counter-value.bump {
          transform: scale(1.08);
        }

        .btn-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 8px;
          width: 100%;
          margin-bottom: 10px;
        }

        .btn {
          background: #f5f5f5;
          border: 2px solid #1a1a1a;
          border-radius: 10px;
          color: #1a1a1a;
          font-family: 'Share Tech Mono', monospace;
          font-size: 22px;
          font-weight: bold;
          padding: 14px 0;
          cursor: pointer;
          transition: all 0.1s;
          box-shadow: 3px 3px 0px #1a1a1a;
        }

        .btn:hover {
          background: #e8e8e8;
          transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0px #1a1a1a;
        }

        .btn:active {
          transform: translate(2px, 2px);
          box-shadow: 1px 1px 0px #1a1a1a;
        }

        .btn.decrement:hover { border-color: #cc2200; color: #cc2200; box-shadow: 4px 4px 0px #cc2200; }
        .btn.increment:hover { border-color: #0057ff; color: #0057ff; box-shadow: 4px 4px 0px #0057ff; }

        .btn-reset {
          width: 100%;
          background: transparent;
          border: 2px solid #ccc;
          border-radius: 10px;
          color: #aaa;
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          padding: 9px 0;
          cursor: pointer;
          transition: all 0.15s;
          text-transform: uppercase;
        }

        .btn-reset:hover {
          border-color: #cc2200;
          color: #cc2200;
          background: rgba(204,34,0,0.04);
        }
      `}</style>

      <div className="counter-root">
        <div className="counter-card">
          <p className="counter-title">Counter</p>

          <div className="counter-display">
            <span className="counter-label">Current Count</span>
            <span className="counter-value">{count}</span>
          </div>

          <div className="btn-row">
            <button className="btn decrement" onClick={() => setCount(c => c - 1)}>−</button>
            <button className="btn" onClick={() => setCount(c => c + 10)} title="+10" style={{fontSize: 13, letterSpacing: '0.05em'}}>+10</button>
            <button className="btn increment" onClick={() => setCount(c => c + 1)}>+</button>
          </div>

          <button className="btn-reset" onClick={() => setCount(0)}>Reset</button>
        </div>
      </div>
    </>
  )
}