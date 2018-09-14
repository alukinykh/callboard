import React, { PureComponent } from 'react'
import { Form, Button } from 'semantic-ui-react'
import Select from 'react-select'
import ImageUploader from 'react-images-upload'
import PropTypes from 'prop-types'

const options = [
  { value: 'Moscow', label: 'Moscow' },
  { value: 'Saint Petersburg', label: 'Saint Petersburg' },
  { value: 'Novosibirsk', label: 'Novosibirsk' },
  { value: 'Yekaterinburg', label: 'Yekaterinburg' },
  { value: 'Nizhny Novgorod', label: 'Nizhny Novgorod' },
  { value: 'Kazan', label: 'Kazan' },
  { value: 'Chelyabinsk', label: 'Chelyabinsk' },
  { value: 'Omsk', label: 'Omsk' },
  { value: 'Samara', label: 'Samara' },
]

class AddAdvert extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      title: {
        value: '',
        error: 'The title must be no more than 100 characters',
        isValid: true,
      },
      description: {
        value: '',
        error: 'The description must be no more than 300 characters',
        isValid: true,
      },
      phone: {
        value: '',
        error: 'Enter phone number in the format +7**********',
        isValid: true,
      },
      selectedOption: null,
      picture: [],
    }
  }

    handleChangeTitle = (event) => {
      this.setState({ title: { ...this.state.title, value: event.target.value } })
    }

    handleChangeDescription = (event) => {
      this.setState({ description: { ...this.state.description, value: event.target.value } })
    }

    handleChangePhone = (event) => {
      this.setState({ phone: { ...this.state.phone, value: event.target.value } })
    }

    handleSelectChange = (selectedOption) => {
      this.setState({ selectedOption })
    }

    validateField = ({
      id, title, description, phone, selectedOption, picture,
    }, callback) => {
      const titleValid = title.value && title.value.length <= 100
      const descriptionValid = description.value.length <= 300
      const phoneValid = phone.value && phone.value.match(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)
      this.setState({
        title: {
          ...title,
          isValid: titleValid,
        },
        description: {
          ...description,
          isValid: descriptionValid,
        },
        phone: {
          ...phone,
          isValid: phoneValid,
        },
      })
      const data = {
        id,
        title: title.value,
        description: description.value,
        phone: phone.value,
        country: selectedOption && selectedOption.value,
        picture,
      }
      titleValid && descriptionValid && phoneValid && callback(data)
    }

    handleSubmit = () => {
      const data = { ...this.state, id: (new Date().getTime()).toString(36) }
      this.validateField(data, this.props.onSubmit)
    }

    onDrop = (pictureFiles, pictureDataURLs) => {
      this.setState({
        picture: [pictureDataURLs[pictureDataURLs.length - 1]],
      })
    }

    render() {
      const {
        title, description, phone, selectedOption,
      } = this.state
      return (
        <Form>
          <Form.Field>
            <Form.Input required error={!title.isValid} label="Title" type="text" name="title" onChange={this.handleChangeTitle} />
            <div>{!title.isValid && <span>{title.error}</span>}</div>
          </Form.Field>
          <Form.Field>
            <Form.Input error={!description.isValid} label="Description" type="text" name="description" onChange={this.handleChangeDescription} />
            <div>{!description.isValid && <span>{description.error}</span>}</div>
          </Form.Field>
          <Form.Field>
            <Form.Input required error={!phone.isValid} label="Phone Number" type="text" name="phone" onChange={this.handleChangePhone} />
            <div>{!phone.isValid && <span>{phone.error}</span>}</div>
          </Form.Field>
          <Form.Field>
            <Select
              value={selectedOption}
              onChange={this.handleSelectChange}
              options={options}
            />
          </Form.Field>
          <Form.Field>
            <ImageUploader
              withIcon
              buttonText="Choose images"
              onChange={this.onDrop}
              imgExtension={['.jpg', '.gif', '.png', '.gif']}
              maxFileSize={5242880}
            />
          </Form.Field>
          <Button onClick={this.handleSubmit}>Submit</Button>
        </Form>
      )
    }
}

AddAdvert.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default AddAdvert
