import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Button } from 'react-bootstrap'
import pngImage from "../../src/assets/logo192.png"

//class componentes
class Hero extends Component {
    state = {
        heroId: this.props.state.heroId,
        heroName: this.props.state.heroName,
        movies: this.props.state.movies,
        likeCount: this.props.state.likeCount,
        birthName: this.props.state.birthName,
        imgUrl: this.props.state.imgUrl
    };

    render() {
        return (
            <React.Fragment>
                {/* <h1 style={{ color: "blue", fontSize: "40px" }}>Hero Component :{this.isHero()}</h1>
                <button type="button" className="btn btn-primary">{this.state.heroId}</button> */}
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={this.state.imgUrl} />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            {this.state.heroName}
                            <ul>
                                <li>Power 1</li>
                                <li>Power 2</li>
                                <li>Power 3</li>
                            </ul>
                            <p>Movies</p>
                            {/* <ul>
                                {this.showMovies()}
                            </ul> */}
                        </Card.Text>
                        <div className="col-xs-1 text-center">
                            <Button id="btnLike" variant="primary" onClick={() => { this.likeAvenger(10) }
                            }>Like Avenger <span className="badge badge-light">{this.state.likeCount}</span></Button>
                        </div>

                    </Card.Body>
                </Card>


            </React.Fragment>


        );
    }
    getHeroName() {
        alert(this.state.heroName);
    }
    isHero() {
        return this.state.heroId < 1000 ? "Already an avenger" : "Not an avenger";
    }
    showMovies() {

        if (this.state.movies.length !== 0) {
            return this.state.movies.map((movie, index) => (<li key={index}>{movie}</li>));
        }
        return (<div><br />No movies found</div>);

    }

    likeAvenger = (param1) => {
        this.setState({ likeCount: this.state.likeCount + 1 })
        console.log(param1);
    };

}

export default Hero;