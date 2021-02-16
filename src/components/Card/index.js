import React, { useEffect, useState } from 'react';
import {
    Card, CardImg, CardBody,
    CardTitle, Container
} from 'reactstrap';
import API from '../../service';
import { useHistory } from 'react-router-dom';
// import Evolutions from '../../Pages/Evolutions';


export default function CardList(props) {
    // const { data, index } = props;
    const {index} = props;
    const history = useHistory();
    const [allData, setAllData] = useState();

    var i = index + 1;

    var fetchPokemon = () => {
        API.getPokemon(i).then(res => {
            setAllData(res.data)
        }).catch(err => {
            return err
        })
    }

    var speciesName = allData ? allData.chain ? allData.chain.species ? allData.chain.species.name : "" : "" : ""
    var speciesUrl = allData ? allData.chain ? allData.chain.species ? allData.chain.species.url : "" : "" : ""
    var arrayUrl = speciesUrl.split('/')
    var speciesID = arrayUrl[arrayUrl.length - 2]

    useEffect(() => {
        fetchPokemon()
    }, [])

    const handleEvolutions = (id) => {
        history.push(`/evolution/${id}`)
    }

    return (
        <div>
            <div onClick={() => handleEvolutions(allData.id)} style={{ cursor: "pointer" }}>
                <Card>
                    <Container className="mt-4">
                        <CardImg top width="100%" src={`https://pokeres.bastionbot.org/images/pokemon/${speciesID}.png`} alt="Card image cap" />
                        <CardBody>
                            <CardTitle tag="h5">{speciesName}</CardTitle>
                        </CardBody>
                    </Container>
                </Card >
            </div >
        </div >
    )
}
