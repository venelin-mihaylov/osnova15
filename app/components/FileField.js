import React from 'react'
import FileInput from 'react-file-input'

export default class FileField extends React.Component {

  static propTypes = {
    /**
     * Current value - base64, to be displayed in the image preview sub-component. passed from RRF
     */
    value: React.PropTypes.string,
    /**
     * When a new image is selected by the user, it is read by the browser, and then the base64 data for it is passed as value to onChange().
     * onChange is supposed to store the new value in redux store, and it will be passed down as "value" prop to this component, so the newly selected image
     * will be displayed in the image preview component
     */
    onChange: React.PropTypes.func,
  }

  _onChange() {

  }

  render() {

    return <div>

      <If condidition={value}>

      </If>

      <image></image>

      <FileInput name="image" accept=".png,.jpg" placeholder="Target Image" onChange={() => {
      console.log(arguments)
      }}/>
      </div>
  }
}