import { checkConnection } from "@/lib/checkConnection";
import styles from "./page.module.css";

export default function Home() {
  try {
    checkConnection();
  } catch (err) {
    console.log("ERROR ==", err);
  }

  return (
    <div className={styles.page}>
      <h1>Home Page</h1>
    </div>
  );
}
