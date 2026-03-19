import Image from "next/image";
import styles from "./page.module.css";
import Calculator from "./components/Calculator";
import CalculatorUi from "./components/CalculatorUi";
import Counter from "./components/Counter";
import CounterUi from "./components/CounterUi";

export default function Home() {
  return (
    <div>
      {/* <Calculator/> */}
      <CalculatorUi/>
      {/* <Counter/> */}
      {/* <CounterUi/> */}
    </div>
  )
}