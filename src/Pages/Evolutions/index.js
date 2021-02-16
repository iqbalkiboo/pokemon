import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Row, Col, Card, CardTitle, Alert } from 'reactstrap'
import API from '../../service';
import './style.css';
import Skeleton from 'react-loading-skeleton';
import ModalDetail from '../../components/Modals';
import { useSelector } from 'react-redux';

export default function Evolutions() {
    var getParams = useParams();
    var id = getParams.id;
    const [imgId, setImgId] = useState();
    const [defaultId, setDefaultId] = useState();
    const [stateImages, setStateImages] = useState([]);
    const [name, setName] = useState();
    const [color, setColor] = useState();
    const [habitat, setHabitat] = useState();
    const [rate, setRate] = useState();
    const [generation, setGeneration] = useState();
    const [alertEmpty, setAlertEmpty] = useState(false);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [idToModal, setIdToModal] = useState();

    //Card Description Detial
    const [detailText, setDetailText] = useState("");
    const [detailLanguage, setDetailLanguage] = useState("");

    // untuk get data dari redux
    const getDataListPokemon = useSelector((state) => {
        return state.dataReducer.dataListPokemon
        // console.log(state,"pokemonData")
    })
    console.log(getDataListPokemon)
    const getDataDetailPokemon = useSelector((state) => {
        return state.dataReducer.dataDetailPokemon
        // console.log(state,"pokemonData")
    })
    console.log(getDataDetailPokemon)

    var listImage = [];

    useEffect(() => {
        fetchGetPokemon();
    }, [])

    // fetch API evolution-chain
    const fetchGetPokemon = async () => {
        await API.getPokemon(id).then(res => {
            let curPokemon = res.data.chain
            if (curPokemon) {
                var curEvolution = curPokemon.evolves_to
                getDefaultDetail(curPokemon)
                getEvolvesTo(curEvolution)
            }
            setAlertEmpty(true)
        }).catch(err => {
            return err
        })
    }

    const getDefaultDetail = (curPokemon) => {
        let speciesUrl = curPokemon ? curPokemon.species ? curPokemon.species.url : "" : "";
        let arrayUrl = speciesUrl.split('/')
        let speciesID = arrayUrl[arrayUrl.length - 2]
        setDefaultId(speciesID)
        fetchPokemonSpecies(speciesID)
        setImgId(speciesID)
    }

    const getEvolvesTo = (curEvolution) => {
        if (curEvolution) {
            while (curEvolution.length > 0) {
                curEvolution.forEach(element => {
                    listImage.push(element)
                });
                curEvolution = curEvolution[0].evolves_to
            }
            setStateImages(listImage);
        }
    }

    // fetch API Species
    const fetchPokemonSpecies = async (speciesID) => {
        await API.getPokemonSpecies(speciesID).then(res => {
            if (res.status === 200) {
                var response = res.data
                if (response) {
                    collectData(response)
                    collectDetailDesc(response)
                    setLoading(false)
                }
            }
        }).catch(err => {
            return err
        })
    }

    const collectData = (response) => {
        var detailName = response ? response.name ? response.name : "" : ""
        var detailColor = response ? response.color ? response.color.name : "" : ""
        var detailHabitat = response ? response.habitat ? response.habitat.name : "" : ""
        var detailId = response ? response.id ? response.id : "" : ""
        var detailRate = response ? response.growth_rate ? response.growth_rate.name : "" : ""
        var detailGeneration = response ? response.generation ? response.generation.name : "" : ""
        setGeneration(detailGeneration)
        setHabitat(detailHabitat)
        setRate(detailRate)
        setName(detailName)
        setColor(detailColor)
        setImgId(detailId)
    }

    const collectDetailDesc = (response) => {
        var detailText = response ? response.flavor_text_entries[22] ? response.flavor_text_entries[22].flavor_text : "" : ""
        var detailLanguage = response ? response.flavor_text_entries[22] ? response.flavor_text_entries[22].language ? response.flavor_text_entries[22].language.name : "" : "" : ""
        setDetailText(detailText)
        setDetailLanguage(detailLanguage)
    }

    const handleDetail = (val) => {
        var url = val.species.url
        var splitUrl = url.split('/')
        var idUrl = splitUrl[splitUrl.length - 2]
        fetchPokemonSpecies(idUrl)
    }
    const handleDetailDefault = (val) => {
        fetchPokemonSpecies(val)
    }

    const showModalDetail = (id) => {
        setIdToModal(id)
        setModal(!modal)
    }

    return (
        <div>
            {
                alertEmpty !== true ? <Alert color="danger">Data Tidak Ada</Alert> :
                    <Container>
                        <Row className="mt-4">
                            <Col>
                                <Link to="/" style={{ textDecoration: 'none' }}>
                                    <h3 style={{ color: "#000" }}>Evolutions</h3>
                                </Link>
                            </Col>
                        </Row>
                        <hr style={{ border: "1px solid #ee4d2d" }} />
                        {
                            loading === true ? <Skeleton height={50} count={5} /> :
                                <div>
                                    <Row xs={1} md={1} lg={2}>
                                        <Col>
                                            <div className="container-img" onClick={() => showModalDetail(imgId)}>
                                                <img src={`https://pokeres.bastionbot.org/images/pokemon/${imgId}.png`} className="img-fluid" alt="Images Detial" />
                                            </div>
                                        </Col>
                                        <Col>
                                            <Container className="mt-4">
                                                <Card body style={{ backgroundColor: "#FAFAFA" }}>
                                                    <CardTitle tag="h5" className="title-name">{name}</CardTitle>
                                                    <Row xs={1} sm={2} md={2} lg={2}>
                                                        <Col>
                                                            <p className="text-details">Color</p>
                                                            <p className="text-capital">{color}</p>
                                                        </Col>
                                                        <Col>
                                                            <p className="text-details">Rate</p>
                                                            <p className="text-capital">{rate}</p>
                                                        </Col>
                                                        <Col>
                                                            <p className="text-details">Habitat</p>
                                                            <p className="text-capital">{habitat}</p>
                                                        </Col>
                                                        <Col>
                                                            <p className="text-details">Generation</p>
                                                            <p className="text-capital">{generation}</p>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </Container>
                                            <Container className="mt-4">
                                                <Card body style={{ backgroundColor: "#FAFAFA" }}>
                                                    <CardTitle tag="h5" className="title-name">{name}</CardTitle>
                                                    <Row >
                                                        
                                                        {/* <Col>
                                                            <p className="text-details">Rate</p>
                                                            <p className="text-capital">{rate}</p>
                                                        </Col> */}
                                                        <Col>
                                                            <p className="text-details">Language</p>
                                                            <p className="text-capital">{detailLanguage}</p>
                                                        </Col>
                                                        <Col>
                                                            <p className="text-details">説明</p>
                                                            <p className="text-capital">{detailText}</p>
                                                        </Col>
                                                        <span style={{width : "100%", padding: "4%"}}>
                                                            <p className="text-details">Description</p>
                                                            <p className="text-capital">From the time it was born, there was a mysterious seed in the middle, and it is said that both are sodatsu.</p>
                                                        </span>
                                                    </Row>
                                                </Card>
                                            </Container>
                                        </Col>
                                    </Row>
                                    <Row className="mt-1 mb-4">
                                        {/* <Container> */}
                                            <ul className="list-group flex-md-row" id="list-pokemon">
                                                <li className="list-group-item list-thumbnails" style={{ border: "none " }} onClick={() => handleDetailDefault(defaultId)}>
                                                    <img src={`https://pokeres.bastionbot.org/images/pokemon/${defaultId}.png`} width="90px" height="90px" alt="Detail Img" className="rounded img-thumbnail" />
                                                </li>
                                                {stateImages.map((val, i) => {
                                                    let curPokemon = val
                                                    let url = curPokemon ? curPokemon.species ? curPokemon.species.url : "" : "";
                                                    let arrayUrl = url.split('/')
                                                    let speciesIdImg = arrayUrl[arrayUrl.length - 2]
                                                    return <li className="list-group-item list-thumbnails" style={{ border: "none " }} onClick={() => handleDetail(val)} key={i}>
                                                        <img src={`https://pokeres.bastionbot.org/images/pokemon/${speciesIdImg}.png`} width="90px" height="90px" alt="Detail Img" className="rounded img-thumbnail" />
                                                    </li>
                                                })}
                                            </ul>
                                        {/* </Container> */}
                                    </Row>
                                    <ModalDetail modal={modal} toggle={showModalDetail} data={idToModal} />
                                </div>
                        }
                    </Container>
            }
        </div >
    )
}
