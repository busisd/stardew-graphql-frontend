
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
  }).then(data => data.json());

  const codeOutput = document.getElementById("code-output");
  codeOutput.innerText = JSON.stringify(apiData);
}



