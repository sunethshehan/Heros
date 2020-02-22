import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Button } from 'react-bootstrap'
import pngImage from "../../src/assets/logo192.png"
import axios from 'axios'

import Hero from "../components/Hero";

//class componentes
class Heros extends Component {
    state = {
        allHeros: []
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    {
                        this.state.allHeros.map((hero, index) =>
                            (<div key={hero.id} className="col"><Hero state={hero} /></div>))
                    }
                </div>
            </div>

        );
    }
    async componentDidMount() {
        const { data } = await axios.get("http://localhost:3005/api/heros/");
        console.log(data);

        let heros = data.map(hero => {

            console.log(hero.imgUrl)
            return {
                id: hero._id,
                heroName: hero.name,
                likeCount: hero.likeCount,
                imgUrl: hero.imgUrl,
                movies : hero.movies
            }

        });

        this.setState({ allHeros: heros });

    }
}

export default Heros;