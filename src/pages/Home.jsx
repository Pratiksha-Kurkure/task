import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
    const [fetchedData, setfetchedData] = useState()
    const [remainingTime, setRemainingTime] = useState(35);
    const [spinner, setspinner] = useState(true)
    let timerIntervalId;
    //function for API call
    const getData = async (xxx) => {
        const { data } = await axios.post("http://97.74.94.225:8282/besstMainApi/df/videoSection", xxx, {
            headers: {
                Client_ID: 123
            }
        })
        setfetchedData(data);
        setspinner(false)
    }

    const startTimer = () => {
        timerIntervalId = setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 1);
        }, 1000);
    };
    useEffect(() => {
        getData()
        startTimer()
    }, [])
    useEffect(() => {
        if (remainingTime === 0) {
            console.log(" Again API call ");
            getData();
            setRemainingTime(35);
        }
    }, [remainingTime]);
    //to clear the timer and restart
    useEffect(() => {
        return () => {
            clearInterval(timerIntervalId);
        };
    }, [timerIntervalId]);

    // functions to handle buttons
    const handleView = () => {
        //set data to storage
        sessionStorage.setItem("data", JSON.stringify(fetchedData.Data))

    }
    const handleRemove = () => {
        //remove data from storage
        sessionStorage.removeItem("data")
    }
    return <>
        {spinner == true && <>
            <div className="spinner-border" role="status" />
        </>
        }
        <div className='text-center container'>
            <p>Status:{
                fetchedData && fetchedData.ResultCode == 200 ? <>
                    Active <br />
                    Number of items: {fetchedData.Data.length} <br />
                    Next API call in {remainingTime} seconds
                </> : <>InActive</>
            }</p>
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <Link className="nav-link" to="/details">
                            <button type="button" className="btn btn-success" onClick={e => handleView()}>View</button>
                        </Link>
                        <button type="button" className="btn btn-danger mt-2 " onClick={handleRemove}>Clear</button>
                    </div>
                </div>
            </div>

        </div>
    </>
}