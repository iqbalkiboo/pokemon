import React, { useEffect, useState } from 'react'
import CardList from '../../components/Card';
import {
    Row, Col, Container,
} from 'reactstrap';
import API from '../../service';
import Header from '../../components/Header';
import Skeleton from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { getListPokemon } from '../../store/data/actions';

//Redux
// import { connect } from 'react-redux';
// import updatePokemon from '../../store/data/';

function ListCharacter(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispat = useDispatch()

    // fetch API List evolution-chain
    const listPokemon = () => {
        API.getListPokemon().then(res => {
            if (res.status === 200) {
                var response = res.data.results;
                // masukin data ke redux
                dispat(getListPokemon(response))
                if (response) {
                    setData(response);
                    setLoading(false);
                }
            }
        }).catch(err => {
            return err
        });
    }

    useEffect(() => {
        listPokemon()
    }, [])
    
    return (
        <div>
            <Container>
                <Header />
                <span>Your Pokemon is : </span>
                {/* {props.pokemon.name} */}
                {
                    loading === true ? <Skeleton height={30} count={5} /> :
                        <Row xs={1} sm={2} md={3} lg={4} className="mb-4">
                            {
                                data.map((val, i) => {
                                    return < Col className="mt-1 mb-1" key={i} >
                                        <CardList data={val} index={i} />
                                    </Col>
                                })
                            }
                        </Row>
                }
            </Container>
        </div>
    )
}

export default (ListCharacter);
