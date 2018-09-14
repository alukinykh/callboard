import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Container, Segment, Divider } from 'semantic-ui-react'
import AdvertList from './components/AdvertList'
import AddAdvert from './components/AddAdvert'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
    }
  }

  componentDidMount() {
    const list = JSON.parse(localStorage.getItem('advertList'))
    // eslint-disable-next-line no-unused-expressions
    list && this.setState({ list })
  }

  add = (advert) => {
    const list = JSON.parse(localStorage.getItem('advertList')) || []
    list.push({ ...advert })
    localStorage.setItem('advertList', JSON.stringify(list))
    this.setState({ list })
  }

  remove = (id) => {
    const list = JSON.parse(localStorage.getItem('advertList'))
    const newList = list.filter((item) => { return item.id !== id })
    localStorage.setItem('advertList', JSON.stringify(newList))
    this.setState({ list: newList })
  }

  render() {
    const { list } = this.state
    return (
      <Container>
        <Segment padded>
          <AddAdvert onSubmit={this.add} />
        </Segment>
        <Divider horizontal />
        {list.length > 0
        && (
        <Segment>
          <AdvertList onRemove={this.remove} list={list} />
        </Segment>
        )
        }
      </Container>
    )
  }
}

export default App
