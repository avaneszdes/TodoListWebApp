# ts-form-validation

[![Greenkeeper badge](https://badges.greenkeeper.io/mindhivefi/ts-form-validation.svg)](https://greenkeeper.io/)

This is a simple library to do form validation using Typescript's magnificent strong typing features. Framework focuses in giving an uniform architecture for validating a form fields and a form as a whole with a proper state validation. To do actual field type validations, it is recommended to use this library besides some other library such as [validator -library](https://www.npmjs.com/package/validator).

The framework is been kept in simple, so that it should be easy to integrate into a different frameworks. The framework is been tested in production use with React and React Native projects.

## Installation

All you need to do is to:

```bash
yarn add ts-form-validation
```

or

```bash
npm install ts-form-validation
```

## Migrating from 1.x version

In 2.0 field validator's validate method have a more inituitive notation:

```typescript
    value =>
        // return true if field is valid or if not return an error message object:
        validator.isLength(value, { min: 5, max: 30 }) || {
          type: MessageType.ERROR,
          message: 'Display name must be between 5 to 30 characters in length.',
        },
```

The old notation which was returning false when there was no need for a message, continues to work but
it is encouraged to update the form validation to a new notation.

## Using validator

The whole validation is based on a type interface defined by you, which will contain all the fields that are used in your form. This might be easier to explain with an example. Lets build a registration form:

### 1. Define the type for the form

Define an interface which will contain all fields that are used in your form:

```typescript
interface RegisterForm {
  displayName: string;
  email: string;
  photoURL?: string;
  password1: string;
  password2: string;
}
```

### 2. Define rules for your fields

You define all the form login on rules object. Rules object is defined based on your interface created before:

```typescript
const rules: FormValidationRules<RegisterForm> {
  fields: {
    displayName: {
      required: true,
      trim: true,
      validate: (value: string) =>
        validator.isLength(value, { min: 5, max: 30 }) || {
          type: MessageType.ERROR,
          message: 'Display name must be between 5 to 30 characters in length.',
        },
    },
    email: {
      required: true,
      trim: true,
      // We are using validator -library here to do the actual email -check
      validate: (value: string) =>
        validator.isEmail(value) || {
          type: MessageType.ERROR,
          message: 'Please give a valid email address',
        },
    },
    password1: {
      required: true,
      validate: (value: string) => validator.isLength(value, {min: 7, max: 20}) || {
          type: MessageType.ERROR,
          message: 'Password must be at least 7-20 characters in length',
        },
    },
    password2: {
      required: true,
      validate: (value: any) => validator.isLength(value, {min: 7, max: 20}) || {
          type: MessageType.ERROR,
          message: 'Password must be at least 7-20 characters in length',
        },
    },
  }
};
```

Now we have the basic checking rules for form fields. All fields except the `photoURL` -field are required. Notice that `validator.isEmail` and `validator.isLength` -functions are imported from validator -library, which is specialized to check correctnes of a single values. You can use validator library, any other checker or do your own checkers with `ts-form-validation`. This framework only helps you with the structure and strong typing.

### 3. Validation rule to check interdependant rules on form

On registration form, it is important that the user will write the same password twice. This requires the code to match values between to different fields. This can be done with `validateForm` -event handler. So we will add a handler for that to rules object:

```typescript
const rules: FormValidationRules<RegisterForm> {
  validateForm: form => {
    const messages = {};

    // Do not make checking if user has not yet filled both fields
    if (form.filled.password1 && form.filled.password2 && form.values.password1 !== form.values.password2) {
      return {
        ...form,
        messages,
        formMessage: {
          type: MessageType.ERROR,
          message: 'Password do not match',
        },
      };
    }
    return { ...form, messages };
  },
  // Field definitions continue here
  fields: {
    displayName: {
      required: true,
      trim: true,
    },
    ...
  }
};
```

The `validateForm` -handler will be called after all field validators have been triggered. The method must return `false`, when form validation will not find anything to notice. When there are some messages that we must inform to user, we can set a message for specific field on messages -object with the same key that the field has. In this example we will set an error message for both password -fields. There is also `formMessage` -field, where you can locale a general message that is targeted for the whole form.

The message interface supports three kind of messages:

```typescript
export interface ValidationMessage {
  /**
   * Type of the error message.
   */
  type: MessageType;

  /**
   * Message code if any available
   */
  code?: FormValidationMessageCode;
  /**
   * The actual message
   */
  message: string;
}
```

Currently supported message types are INFO, WARNING and ERROR. It up to you how you use them in the user interface.

### 4. Adding preprocessing for form fields

It is possible to do basic trimming for input or add your own pre processor events for fields. A common case that is needed for form input is to trim white spaces away from start and the end of the text. This can be done simply adding a `trim: true`-field for a field that must be trimmed. We already used this feature in the example above like this:

```typescript
  email: {
    required: true,
    trim: true,
    validate: (value: string) =>
        validator.isEmail(value) || {
          type: MessageType.ERROR,
          message: 'Please give a valid email address',
        },
```

To add a custom preprocessor, just add event `preprocess`-event handler to field like this:

```typescript
  currency: {
    required: true,
    trim: true,
    preprocess: (value: string) => value.toUppercase(),
  },
```

You can use trim and custom event handler together. When you use trim also, the value that your custom event handler will receive will already be trimmed.

### 5. Filled - letting the user to finnish writing before validating

So that we will not make the user irritated, we must be able the define when a field is ready to be validated. For that reason, this framwwork has a `filled` -set on form definition. When you know that the user has given an input that is ready to be validated, you just set a form field's key to true in this set. After that the validation will be executed for that fields on each call. Normally this will be set to true, in form field's `onBlur`-event handled which will happend when user will leave the field.

## Example using validation with React and Material-ui

With react, its natural to make an own component for the form. Let's make a component to support the register form that we created above:

```typescript
interface State extends WithForm { // <- this will include form -property to state
  
}

export default class RegisterScreen extends React.Component<any, State> {
  public state: State = {
    // Initialize form
    form: initForm<RegisterForm>(
      {
        displayName: '',
        email: '',
        password1: '',
        password2: '',
        photoURL: '',
      },
      rules,
    ),
  };

  public render() {
    const { classes } = this.props;
    const { formMessage, isFormValid } = this.state.form;

    return (
      <Paper className={classes.container}>
        <Typography variant="h3" gutterBottom>
          Register form example
        </Typography>
        {formMessage && (
          <FormHelperText error={formMessage.type === MessageType.ERROR}>
            {formMessage.message}
          </FormHelperText>
        )}
        {this.renderField('displayName', 'Display name')}
        {this.renderField('email', 'Email')}
        {this.renderField('password1', 'Password', { type: 'password' })}
        {this.renderField('password2', 'Password again', { type: 'password' })}

        <Button
          color="primary"
          variant="contained"
          disabled={!isFormValid}
          onClick={() => alert('Form ready to go!')}
        >
          Register
        </Button>
      </Paper>
    );
  }

  /**
   * Render a single form input field with all spices
   */
  private renderField = (
    key: keyof RegisterForm,
    label: string,
    props?: Partial<TextFieldProps>,
  ) => {
    const { classes } = this.props;

    const {
      values,
      messages,
    } = this.state.form;
    return (
      <>
        <TextField
          {...props}
          id={key}
          label={label}
          className={classes.textField}
          value={values[key]}
          onBlur={this.handleBlur(key)}
          onChange={this.handleChange(key)}
          margin="normal"
          variant="outlined"
        />
        {message && (
          <FormHelperText error={message.type === MessageType.ERROR}>
            {message.message}
          </FormHelperText>
        )}
      </>
    );
  };

  private handleChange = (key: keyof RegisterForm) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {

    this.setState({
      form: validateForm(
        this.state.form, {
        // Disable preprocess while validating when writing
        usePreprocessor: false,
        // Update the field value
        setValues: {
          [key] event.target.value
        }
      }),
    });
  };

  private handleBlur = (key: keyof RegisterForm) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    // set field filled after blur, means that the field as been set once
    this.setState({
      form: validateForm(this.state.form, {
        setFilled: key, // mark the field be filled
      }),
    });
  };
}
```

## Api

### InputForm

InputForm is the object to wrap up all the form functionality.

| Property | Description |
|----------|-------------|
| values: &lt;T&gt;   | The current field values on the form presented as an object where each key is the name of field and value is the field value. |
| rules: FormValidationRules&lt;T&gt;   | Rules object containing the validation and constraints of the form |
| filled?: FilledFormFields&lt;T&gt;   | Marked for each field that have a value to show possible errors on field. Fields will be validated even when the field is not set but no error message will be used. In most of the cases you do not implicitly update filled values. This cab be let be done by `validateForm` -function. |

### FieldValidator

Field validator is an validator interface for a single fields validation.

| Property | Description |
|----------|-------------|
| required: boolean   | When set to true, the field value must not be undefined. If the field is not defined. The required text will shown. |
| requiredText: string \| MessageFunction | Own text to shown when required field have no value after validation. This requires that the filled of the field is also set to true. |
| trim?: boolean | Trims field's value from white spaces before and after the value. If this is set to true, this will be done before `preprosess` -method |
| preprocess? (value: T) => T | Do custom preprocessing for the field before the validation. If trim is true, the value given as argument will be trimmed on this phase. Just return the preprocessed value as return value and it will be used by validate -method and formValidation. |
| validate? (value: T) => T | Do validation for the field. When field is valid after validation the return value must be `true`. When the value is erronous, the result value must be `ValidationMessage` -object. |

### ValidationMessage

ValidationMessage describes an message to be shown to the user when there are some issues that the user should be aware of.

| Property | Description |
|----------|-------------|
| type: MessageType | Type of the validation message  | 
| |  - |
| message: string | Human readable message to desribe the user what is the issue with the field or the whole form. | 

### MessageType

ValidationMessage describes an message to be shown to the user when there are some issues that the user should be aware of.

| Key | Description |
|----------|-------------|
| ERROR | Field or form contains an error. If any validator, will return a message with this code, the form will be treated as invalid (isFormValid will be false). |
| WARNING | Field or form contains a state for what user should be warned. Form can still to be valid event if it contains warnings. |
| HINT | Field or form contains a state for what user should be hinted. Form can be treaded valid when containing this kind of messages. |
| VALIDATION_ERROR | This validation error is to help to find errors at development phase. Error message given, when validator callback fails with the exception. Exception error message will be included into message.  |

## Helpers

### initForm

With init form, you can initialize form with required fields, so that you can set up the minimun required:

```typescript
initForm<T>(
      {
        // initial values for fields
      },
      rules,
      filled // optional setting of the fields filled as default
    ),

```
Note that setting fields filled will not run the form validation for the fields.

### WithForm

`WithForm` is an interface to make it easy to add form property to State interface

```typescript
interface State extends WithForm<FormType> {
}
```

Is same as:

```typescript
interface State {
  form: Form<FormType>;
}
```

### Custom messages for validation

Currently validator has only a single internal message that is given as result. This will hapen when you use ´required´ on
form validation rules. To customize this, you can add ´requiredText´-field into field validator:

```typescript
currency: {
    required: true,
    requiredText: 'You must give the currency code here',
    trim: true,
    preprocess: (value: string) => value.toUppercase(),
  },
```

If your system have multiple localizations, you might prefer to set a function into requiredText, which will give you a full control over message to be shown:

```typescript
currency: {
    required: true,
    requiredText: () => 'You must give the currency code here',
    trim: true,
    preprocess: (value: string) => value.toUppercase(),
  },
```

To set a new default message to be used in all fields that do not have explicit text override like done above, you can set default
message texts or message functions on rule -objects top level:

```typescript
const rules: FormValidationRules<RegisterForm> {
  ...
  defaultMessages: {
    requiredField: () => 'Hey, you missed this field!';
  };
}
```

### formHaveMessagesOfType

After validation, you can user `formHaveMessagesOfType`-function to check if the listed messages has some sort of messages, like:

```typescript
if formHaveMessagesOfType(form, MessageType.WARNING) {
  // do something handy
}
```

Please check [fully functional demo](https://github.com/mindhivefi/ts-form-validation-demo). for this example in its own repo.
