import React, { useState, useEffect } from "react";
import SpeciesExtract from "./SpeciesExtract";

const SpeciesIndex = () => {
  const [speciesID, setSpeciesID] = useState(0);
  const [species, setSpecies] = useState([]);

  // eslint-disable-next-line
  useEffect(() => fetchSpecificSpecies(), [speciesID]);

  const fetchSpecificSpecies = () => {
    fetch(`http://api.gbif.org/v1/species/${speciesID}`)
      .then((resp) => resp.json())
      .then((resp) => {
        setSpecies(resp);
      })
      .catch(nextSpecificSpecies);
  };

  const nextSpecificSpecies = () => {
    setSpeciesID(speciesID + 1);
  };

  const prevSpecificSpecies = () => {
    setSpeciesID(speciesID - 1);
  };

  return (
    <div>
      <b>scientific name</b>
      <h1>{species[`scientificName`]}</h1>
      <div>
        <b>rank: {species[`rank`]}</b>
        <br />
        <b>canonical name: {species["canonicalName"]}</b>
      </div>
      <div>
        <b>kingdom: {!!species[`kingdom`] ? species[`kingdom`] : "N/A"}</b>
        <br />
        <b>phylum: {!!species[`phylum`] ? species[`phylum`] : "N/A"}</b>
        <br />
        <b>class: {!!species[`class`] ? species[`class`] : "N/A"}</b>
        <br />
        <b>order: {!!species[`order`] ? species[`order`] : "N/A"}</b>
      </div>
      <div>
        <b>id: {speciesID}</b>
      </div>
      <br />
      <div>
        <b onClick={() => prevSpecificSpecies()}>prev</b>
        <b> </b>
        <b onClick={() => nextSpecificSpecies()}>next</b>
      </div>
      <div>
        {species.length !== 0 ? <SpeciesExtract species={species} /> : null}
      </div>
    </div>
  );
};

export default SpeciesIndex;
