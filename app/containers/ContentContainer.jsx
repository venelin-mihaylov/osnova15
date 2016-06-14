"use strict";
import React from "react";
import Paper from "material-ui/Paper";


/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const ContentContainer = props => (
  <div>
    <Paper style={{paddingBottom: 20}}>
      {props.children}
    </Paper>
  </div>
);
export default ContentContainer;
