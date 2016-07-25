import React from 'react'
import {autobind} from 'core-decorators'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton';


import styles from 'styles/components/FileField.css'

@autobind
export default class FileField extends React.Component {


  refInputFile = 'test'

  static propTypes = {
    /**
     * name of the field
     */
    name: React.PropTypes.string,
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

  _handleImageChange(e) {
    const {onChange} = this.props

    e.preventDefault()

    let reader = new FileReader()
    let file = e.target.files[0]
    reader.onloadend = () => {
      console.log('result')
      console.log(reader.result)
      onChange(reader.result)
    }

    reader.readAsDataURL(file)
  }

  render() {
    const {
      name,
      label = name,
      value,
      onChange, // do not pass it to FileInput
      ...rest
    } = this.props

    return <div>

      {value && <div><img src={value}/></div>}
      {!value && <div className={styles.emptyPlaceholder}>No {label} uploaded yet ...</div>}

      <div>
        <FlatButton
          label="Upload ..."
          primary={true}
          icon={<FontIcon className="fa fa-upload"/>}
          onClick={() => this.refInputFile.click()}
        />
        <FlatButton
          label="Clear ..."
          secondary={true}
          icon={<FontIcon className="fa fa-eraser"/>}
          onClick={() => onChange('')}
        />
        <input id="file-input" type="file"
               onChange={this._handleImageChange}
               className={styles.input}
               ref={input => this.refInputFile = input}
               {...rest}
        />
      </div>
    </div>
  }
}