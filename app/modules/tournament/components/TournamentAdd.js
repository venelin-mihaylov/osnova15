import React from "react";
import TournamentForm from "modules/tournament/components/TournamentForm";

const TournamentAdd = props => (
  <div>
    <h1>Add tournament</h1>
    <TournamentForm {...props} />
  </div>
);
export default TournamentAdd;
