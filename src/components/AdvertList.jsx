import React from 'react'
import PropTypes from 'prop-types'
import { Item, Button } from 'semantic-ui-react'

const AdvertList = ({ list, onRemove }) => {
  return (
    <Item.Group divided>
      {list.map((item) => {
        const handleRemove = () => { return onRemove(item.id) }
        return (
          <Item key={item.id}>
            <Item.Image src={item.picture[0]} />
            <Item.Content>
              <Item.Header>{item.title}</Item.Header>
              <Item.Description>
                {item.description}
              </Item.Description>
              <Item.Extra>
                <Button floated="right" onClick={handleRemove}>Remove</Button>
              </Item.Extra>
            </Item.Content>
          </Item>
        )
      })}
    </Item.Group>
  )
}

AdvertList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default AdvertList
