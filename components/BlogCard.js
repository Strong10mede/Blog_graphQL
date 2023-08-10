import React from "react";
import styles from "../styles/BlogCard.module.css";
import Link from "next/link";
import Image from "next/image";

const BlogCard = ({ title, author, coverPhoto, key, datePublished, slug }) => {
  return (
    <div className={styles.card}>
      <Link href={`/posts/${slug}`}>
        <div className={styles.imgContainer}>
          <Image src={coverPhoto?.url} alt={title} width={640} height={640} />
        </div>
      </Link>
      <div className={styles.text}>
        <h2>{title}</h2>
        <div className={styles.details}>
          <div className={styles.author}>
            <Image src={author?.avatar?.url} alt="" width={32} height={32} />
            <h3>{author.name}</h3>
          </div>
          <div className={styles.date}>
            <h3>{datePublished}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
