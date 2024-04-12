import { useState } from "react";

export default function App() {
  const [bill, setBill] = useState(0);
  const [percentage, setPercentage] = useState("");
  const [percentage1, setPercentage1] = useState("");

  function reset() {
    setBill(0);
    setPercentage("Dissatisfied(0%)");
    setPercentage1("Dissatisfied(0%)");
  }

  return (
    <>
      <BillInput bill={bill} onSetBill={setBill} />

      <SelectPercentage percentage={percentage} onSetPercentage={setPercentage}>
        How did you like the service?
      </SelectPercentage>

      <SelectPercentage
        percentage1={percentage1}
        onSetPercentage1={setPercentage1}
      >
        How did your friend like the service?
      </SelectPercentage>
      {bill !== 0 && (
        <>
          <Output
            bill={bill}
            percentage={percentage}
            percentage1={percentage1}
          />
          <Reset onReset={reset} />
        </>
      )}
    </>
  );
}

function BillInput({ bill, onSetBill }) {
  return (
    <div>
      How much was the bill?
      <input
        type="text"
        value={bill}
        onChange={(e) => onSetBill(Number(e.target.value))}
        placeholder="Bill..."
      ></input>
    </div>
  );
}

function SelectPercentage({
  percentage,
  percentage1,
  onSetPercentage,
  onSetPercentage1,
  children,
}) {
  return (
    <div>
      {children}
      <select
        value={children.split(" ")[2] === "you" ? percentage : percentage1}
        onChange={(e) =>
          children.split(" ")[2] === "you"
            ? onSetPercentage(e.target.value)
            : onSetPercentage1(e.target.value)
        }
      >
        <option>Dissatisfied(0%)</option>
        <option>It was good(5%)</option>
        <option>It was okay(10%)</option>
        <option>Excellent(20%)</option>
      </select>
    </div>
  );
}

function Output({ bill, percentage, percentage1 }) {
  const billNum = bill;
  const p = Number(percentage.replace(/\D/g, "")) / 100;
  const p1 = Number(percentage1.replace(/\D/g, "")) / 100;
  const tip = (billNum * (p + p1)) / 2;
  const total = billNum + tip;

  return (
    <p>
      Your pay ${total} (${billNum} + ${tip} tip)
    </p>
  );
}

function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}
