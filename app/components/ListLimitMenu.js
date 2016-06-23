import React from "react"
import MenuItem from "material-ui/MenuItem"
import IconMenu from "material-ui/IconMenu"
import FontIcon from "material-ui/FontIcon"

const ListLimitMenu = props => (
  <IconMenu
    onChange={props.onLimitChange}
    value={props.limit}
    iconButtonElement={<FontIcon className="fa fa-sort-amount-asc fa-3x" style={{marginTop: 15}}/>}
  >
    <MenuItem value={2} primaryText="2"/>
    <MenuItem value={5} primaryText="5"/>
    <MenuItem value={100} primaryText="100"/>
    <MenuItem value={1000} primaryText="1000"/>
  </IconMenu>
)

ListLimitMenu.propTypes = {
  onLimitChange: React.PropTypes.func.isRequired,
  limit: React.PropTypes.number.isRequired
}

export default ListLimitMenu
