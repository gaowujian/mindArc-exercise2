import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"
import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"
import MediaQuery from "react-responsive"
import "./App.css"
class App extends React.Component {
  state = {
    isFetched: false,
    data: []
  }
  componentDidMount() {
    this.getUsers()
  }
  getUsers = async () => {
    const response = await axios.get("./data.json")
    const data = response.data
    this.setState({ isFetched: true, data: data })
  }
  render() {
    const { isFetched, data } = this.state
    return (
      <div className="App">
        {isFetched && (
          <Tabs defaultActiveKey={"Section 1"} className="Tabs">
            {data.map((item, index) => {
              const htmlString = item.content
              return (
                <Tab
                  key={index}
                  eventKey={item.title}
                  title={item.title}
                  className="Tab"
                  dangerouslySetInnerHTML={{ __html: htmlString }}
                ></Tab>
              )
            })}
          </Tabs>
        )}

        {isFetched && (
          <Accordion defaultActiveKey="0" className="Accordion">
            {data.map((item, index) => {
              const htmlString = item.content
              return (
                <Card key={index}>
                  <Accordion.Toggle as={Card.Header} variant="link" eventKey={index}>
                    {item.title}
                  </Accordion.Toggle>

                  <Accordion.Collapse eventKey={index}>
                    <Card.Body dangerouslySetInnerHTML={{ __html: htmlString }}></Card.Body>
                  </Accordion.Collapse>
                </Card>
              )
            })}
          </Accordion>
        )}
      </div>
    )
  }
}

export default App
