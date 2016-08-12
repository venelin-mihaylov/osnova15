import React from 'react'
import {Table} from 'reactabular';
import EasyTable from 'reactabular-easy';

export default class BaseTable extends React.Component {
  render() {
    return <EasyTable {...this.props}/>
  }
}