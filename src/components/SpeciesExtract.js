import React, { useState, useEffect } from "react";

const SpeciesExtract = (props) => {
  const [extract, setExtract] = useState("");
  const [titleEstimate, setTitleEstimate] = useState("");

  // eslint-disable-next-line
  useEffect(() => fetchPageTitleEstimate(), [props]);
  useEffect(() => fetchExtract(), [titleEstimate]);

  const formatSpeciesCanonName = () => {
    return props.species["canonicalName"].replace(" ", "_");
  };

  const retrieveExtrctFromJSONResp = (resp) => {
    const pages = [];
    for (let key in resp["query"]["pages"]) {
      pages.push(resp["query"]["pages"][key]);
    }
    return pages[0]["extract"];
  };

  const fetchPageTitleEstimate = () => {
    fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${formatSpeciesCanonName()}&utf8=&format=json&origin=*`
    )
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(
          "curr species via. props:",
          props.species["canonicalName"],
          ", title estimate:",
          resp["query"]["search"][0]["title"]
        );
        setTitleEstimate(resp["query"]["search"][0]["title"]);
      });
  };

  const fetchExtract = () => {
    fetch(
      `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=3&exlimit=1&titles=${titleEstimate}&explaintext=1&formatversion=1&format=json&origin=*`
    )
      .then((resp) => resp.json())
      .then((resp) => {
        console.log("page response", resp);
        return retrieveExtrctFromJSONResp(resp);
      })
      .then((ext) => setExtract(ext))
      .catch(() => {
        setExtract(null);
      });
  };

  return (
    <div>
      <p>{!!extract ? extract.split("=")[0] : null}</p>
    </div>
  );
};

export default SpeciesExtract;
