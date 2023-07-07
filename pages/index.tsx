import Head from "next/head";
import styles from "../styles/Home.module.css";
import {} from "graphql";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bloggy</title>
        <meta name="descriptions" content="bloggy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}></main>
    </div>
  );
}
