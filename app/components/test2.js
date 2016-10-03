// eslint-disable
// https://unpkg.com/stardust@0.52.2/dist/umd/stardust.min.js
const { Component } = React;
const { Provider, connect } = ReactRedux;
const {
  createStore,
  combineReducers,
  applyMiddleware
} = Redux;
const {
  Field,
  Control,
  Errors,
  combineForms,
  actions,
  createFieldClass,
  controls
} = ReactReduxForm;
const RRForm = ReactReduxForm.Form
const {Form, Input, Dropdown} = stardust
const thunk = ReduxThunk.default;
const logger = reduxLogger();

const store = createStore(combineReducers({
  rrf: combineForms({
    test: {},
  }, 'rrf')
}), applyMiddleware(thunk, logger));

const model = 'rrf.test'
const updateOn = 'change'
const ignore = ['focus']
const validators = {
  required: (v) => !!v
}
const messages = {
  required: 'Field is required.'
}

const mapSuiProps = {
  string: controls.text,
  dropdown: (props) => (Object.assign(props, {
    name: props.name || props.model,
    value: props.viewValue,
    onChange: (e, value) => onChange(value),
  }))
}



class UserForm extends Component {
  loadData() {
    this.props.dispatch(actions.reset(model))
    this.props.dispatch(actions.load(model, {
      sex: 1,
      name: 'test',
      email: 'v@v.com',
      notes: 'alabala'
    }))
  }

  constructor() {
    super()
    this.loadData = this.loadData.bind(this)
  }

  render() {
    return (
      <RRForm className='ui form' model={model} onSubmit={v => console.log(v)}>

        <button type='button' onClick={this.loadData} >Load </button>



        <button type="submit">
          Submit
        </button>

        <Control.reset model={model} type="reset">
          Reset
        </Control.reset>
      </RRForm>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <UserForm />
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));