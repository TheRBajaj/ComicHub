import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory, Link }  from 'react-router-dom';
import { useSpring, animated as a } from 'react-spring';
import { Button } from 'react-bootstrap';

import '../../styles/dashboard.css';

const DashBoard = () => {

    //comicAPI states
    const [id, setId] = useState();
    const [url, setUrl] = useState("");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [transcript, setTranscript] = useState([]);

    //react router history
    const history = useHistory();
    let urlParams = useParams();
    // let urlId;

    //react-sping animation
    const [status, displayStatus] = useState(false);
    const contentProps = useSpring({
        opacity: status ? 1 : 0,
        marginLeft: status ? 0: -1000
    });

    //use effect on mount
    useEffect(() => {
        let urlId = urlParams.id;
        console.log(urlId);
        console.log("on mount id is: "+id);
        const param = "/"+urlId;
        axios.get(param)
            .then( res => {
                setId(res.data.num);
                setUrl(res.data.img);
                setTitle(res.data.title);
                //split transcript
                const splitTranscript = res.data.transcript.split("\n");
                setTranscript(splitTranscript);
                //date in form day/month/year
                const comicDate = res.data.day+"/"+res.data.month+"/"+res.data.year;
                setDate(comicDate);
                history.push('/'+res.data.num);               
            })
            .catch(err => {
                history.push('/error');
            })       
    }, [])

    //use effect every time id changes
    useEffect(() => {
        let param;
        if (id === 100000000){
            param = "random";
        }
        else{
            param = id;
        }

        axios.get("/"+param)
            .then( res => {
                setId(res.data.num);
                setUrl(res.data.img);
                setTitle(res.data.title);
                //split transcript
                const splitTranscript = res.data.transcript.split("\n");
                setTranscript(splitTranscript);
                //date in form day/month/year
                const comicDate = res.data.day+"/"+res.data.month+"/"+res.data.year;
                setDate(comicDate);
                history.push('/'+res.data.num);              
            })
            .catch(err => {
                console.log(err);
            })
    }, [id])

    const nextComicHandler = () => {
        if (id < 2472){
            setId(prevId => prevId + 1);
        }
    }

    const prevComicHandler = () => {
        if (id > 1){
            setId(prevId => prevId - 1);
        }
    }

    const ranComicHandler = () => {
        setId(prevId => prevId = 100000000);
    }

    return(
        <div className="bodyContainer">
            <div className="dashboardContainer">
                <h1>{title}</h1>
                <img src={url} alt={"comic-url"}></img>
                <div>
                    <h4>Date Created: {date}</h4>
                </div>
                <div className="control-container">
                    <Button variant="success" size="lg" onClick={prevComicHandler}>Previous</Button>
                    <Button variant="warning" size="lg" onClick={ranComicHandler}>Random</Button>
                    <Button variant="danger" size="lg" onClick={nextComicHandler}>Next</Button>
                </div>
                <div className="bottom-container"> 
                    <Button variant="info" size="sm" onClick= {() => displayStatus((a) => !a)}>Transcript</Button>
                    <Link to='/' style={{ textDecoration: "none" }}>
                        <Button variant="primary" size="sm" className="homeButton">
                            Home
                        </Button>
                    </Link>
                </div>
                <div className="transContainer">
                    {!status ? "" : <a.div className="box" style={contentProps}>
                            {transcript.length === 1 ? "No Transcript avaliable" : 
                            <ul className="transcript" >
                                {transcript.map( (text, i) => <li key={i}>{text}</li>)}
                            </ul>
                            }
                        </a.div>}
                </div>
            </div>
        </div>
    );

};

export default DashBoard;

