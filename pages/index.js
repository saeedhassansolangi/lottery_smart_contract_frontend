import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Header } from "../components/Header";
import LotteryEntrance from "../components/LotteryEntrance";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Lottery Smart Contract</title>
        <meta name="description" content="lottery smart contract" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <LotteryEntrance />
      </main>
    </div>
  );
}
