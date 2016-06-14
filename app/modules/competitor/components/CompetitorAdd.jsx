import React from "react";
import CompetitorForm from "modules/competitor/components/CompetitorForm";

const CompetitorAdd = props => (
  <div>
    <h1>Add Competitor</h1>
    <CompetitorForm {...props} />
  </div>
);
export default CompetitorAdd;
