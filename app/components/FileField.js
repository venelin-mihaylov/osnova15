import React from 'react'
import {autobind} from 'core-decorators'
import {Button, Icon} from 'semantic-ui-react'

import styles from 'styles/components/FileField.css'

@autobind
export default class FileField extends React.Component {

  static propTypes = {
    /**
     * Label
     */
    label: React.PropTypes.string,
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
     * onChange is supposed to store the new value in redux store, and it will be passed down as 'value' prop to this component, so the newly selected image
     * will be displayed in the image preview component
     */
    onChange: React.PropTypes.func,
  }

  static defaultProps = {
    onChange: () => {}
  }

  ihandleImageChange(e) {
    const {onChange} = this.props

    e.preventDefault()

    const reader = new FileReader()
    const file = e.target.files[0]
    if (!file) {
      return
    }

    reader.onloadend = () => {
      onChange(reader.result)
    }

    reader.readAsDataURL(file)
  }

  refInputFile = null

  render() {
    const {
      name,
      label = name,
      value,
      onChange, // do not pass it to FileInput
      type, // eslint-disable-line
      ...rest,
    } = this.props

    return (<div>
      {value && <div><img alt='Current' src={value} /></div>}
      {!value && <div className={styles.emptyPlaceholder}>No {label} uploaded yet ...</div>}
      <div>
        <Button
          labeled
          icon
          onClick={() => this.refInputFile.click()}
        >
          <Icon name='upload' />
          Upload
        </Button>
        <Button
          labeled
          icon
          onClick={() => {
            this.refInputFile.value = ''
            onChange('')
          }}
        >
          <Icon name='erase' />
          Clear
        </Button>
        <input

          id='file-input'
          type='file'
          onChange={this.ihandleImageChange}
          className={styles.input}
          ref={input => (this.refInputFile = input)}
          {...rest}
        />
      </div>
    </div>)
  }
}
