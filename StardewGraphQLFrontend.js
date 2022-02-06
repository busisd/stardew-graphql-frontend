import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

const getDataAndApply = async () => {
  const apiData = await fetch("http://localhost:4000/", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      {
        query: `
          query {
            books {
              author,
              title
            }
          }`
      }),
  }).then(data => { console.log(data); return data.json() });

  client
    .query({
      query: gql`
      query books {
        author,
        title
      }
    `
    })
    .then(result => console.log(result));

  const codeOutput = document.getElementById("code-output");
  codeOutput.innerText = JSON.stringify(apiData);
}



