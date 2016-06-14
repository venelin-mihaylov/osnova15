import React from "react";
import TournamentForm from "modules/tournament/components/TournamentForm";

const TournamentEdit = props => (
  <div>
    <h1>Edit tournament</h1>
    <TournamentForm {...props}/>
  </div>
);
export default TournamentEdit;
