import fetch from 'node-fetch';
import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";

export const PROJECTS = gql`
    {
      projects (sort: "updated_at:DESC") {
        id
        slug
        title
        content
        github
        description
      }
    }
  `;

  
export const PAGES = gql`
{
	pages {
    id
    title
    content
    slug
    photo_credit
    photo_credit_url
    featured_image {
      url
      name
    }
  }
}
  `;


  export const ARTICLES = gql`
  {
    articles (sort: "published_at:DESC") {
      id
      title
      content
      published_at
      category {
        display
      }
      slug
      author{
        display_name
      }
      excerpt
      image {
        name
        url
      }
      live
    }
  }
  `;

export const client = new ApolloClient({
  uri: 'https://content.brian.dev/graphql',
  fetch,
});

