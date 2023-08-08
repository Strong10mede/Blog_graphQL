import { GraphQLClient, gql } from "graphql-request";
import styles from "../../styles/Slug.module.css";
import moment from "moment";
import Image from "next/image";

const graphcms = new GraphQLClient(
  "https://api-ap-south-1.hygraph.com/v2/cljs78wlu115501ujh6vs2hcl/master"
);

const QUERY = gql`
  query blogPost($slug: String!) {
    blogPost(where: { slug: $slug }) {
      id
      title
      slug
      datePublished
      author {
        id
        name
        avatar {
          url
        }
      }
      content {
        html
      }
      coverPhoto {
        id
        url
      }
    }
  }
`;
const SLUGLIST = gql`
  {
    blogPosts {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const { blogPosts } = await graphcms.request(SLUGLIST);
  return {
    paths: blogPosts.map((blogPost) => ({ params: { slug: blogPost.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await graphcms.request(QUERY, { slug });
  const blogPost = data.blogPost;
  return {
    props: {
      blogPost,
    },
    revalidate: 30,
  };
}

export default function BlogPost({ blogPost }) {
  return (
    <main className={styles.blog}>
      <Image
        className={styles.cover}
        src={blogPost.coverPhoto.url}
        alt={blogPost.title}
      />
      <div className={styles.title}>
        <div className={styles.authdetails}>
          <Image src={blogPost.author.avatar.url} alt={blogPost.author.name} />
          <div className={styles.authtext}>
            <h6>By {blogPost.author.name} </h6>
            <h6 className={styles.date}>
              {moment(blogPost.datePublished).format("MMMM d, YYYY")}
            </h6>
          </div>
        </div>
        <h2>{blogPost.title}</h2>
      </div>

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: blogPost.content.html }}
      ></div>
    </main>
  );
}
