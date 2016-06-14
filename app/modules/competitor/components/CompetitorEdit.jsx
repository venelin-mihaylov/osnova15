import React from "react";
import CompetitorForm from "modules/competitor/components/CompetitorForm";

const CompetitorEdit = props => (
  <div>
    <h1>Edit Competitor</h1>
    <CompetitorForm {...props}/>
  </div>
);
export default CompetitorEdit;
