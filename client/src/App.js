import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {
  Jumbotron,
  Alert,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Table
} from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      alertVisible: false,
      title: '',
      mvs: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }
  showAllMovies = () => {
    axios
    .get('/showAllMovies')
    .then(result => {
        this.setState({ mvs: result.data });
        console.log(this.state.mvs);
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.showAllMovies();
  }

  //Popup
  onDismiss() {
    this.setState({ alertVisible: false });
  }
  //Form
  onSubmit = e => {
    e.preventDefault();
    this.setState({ alertVisible: false });

    const query = `/showmovie?title=${this.state.title}`;

    console.log(query);

    axios
    .get(query)
    .then(result => {
        console.log(result.data);
        if (result.data === 'Not found') {
          this.setState({ alertVisible: true });
        }
        this.showAllMovies();
      })
      .catch(error => {
        alert('There is an error: ', error);
      });
  };

  //Form field
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  deleteMovie(title) {
    this.setState({
      mvs: this.state.mvs.filter(mv => {
        if (mv.title !== title) return mv;
      })
    });
    const query = `/deleteMovie?title=${title}`;
    axios.get(query)
      .then(result => {
        this.showAllMovies();
      })
      .catch(error => {
        alert('Ops! Error: ', error);
      });
  }
  render() {
    return (
      <div className="App">
        <Jumbotron>
          <h1 className="display-2">That-MOVIE.INFO</h1>
          <p className="display-6">CHILL AND GET THAT MOVIE INFO</p>
        </Jumbotron>
        <Container>
          <Row>
            <Col>
              <Alert
                color="danger"
                isOpen={this.state.alertVisible}
                toggle={this.onDismiss}
              >
                Ops! what movie is that?
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="title">Find a movie</Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="What title on your mind?..."
                    onChange={this.onChange}
                  />
                </FormGroup>
                <Button color="success">Find</Button>
                <p />
              </Form>
            </Col>
          </Row>
          <Row>
            <Table dark>
              <thead>
                <tr>
                  <th>Remove</th>
                  <th>Title</th>
                  <th>Poster</th>
                  <th>Movie Info</th>
                </tr>
              </thead>
              <tbody>
                {this.state.mvs.map(mv => {
                  return (
                    <tr>
                      <td>
                        <button
                          onClick={() => {
                            this.deleteMovie(mv.title);
                          }}
                        >
                          REMOVE
                        </button>
                      </td>
                      <td>{mv.title}</td>
                      <td>
                        <img src={mv.post} />
                      </td>
                      <td>
                        Language: {mv.lang}
                        <p></p>
                        <p>Time: {mv.time}</p>
                        <p></p>
                        <p>Genre: {mv.genre}</p>
                        <p></p>
                        <p>Actors: {mv.act}</p>
                        <p></p>
                        <p>Plot: {mv.plot}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;

