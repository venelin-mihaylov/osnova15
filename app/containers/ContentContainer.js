"use strict"
import React from "react"


/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const ContentContainer = props => (
  <div>
   {props.children}
  </div>
)
export default ContentContainer
