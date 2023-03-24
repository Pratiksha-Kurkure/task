import React, { useEffect, useState } from 'react'

export default function Details() {
    const [allData, setAllData] = useState([])
    useEffect(() => {
        //get data from storage
        setAllData(JSON.parse(sessionStorage.getItem("data")))
    }, [])

    return <>
        <h1></h1>
        {
            allData &&
            allData.map(item => <div className='d-flex ' key={item.id}>
                <h5>Name:</h5><p> {item.name}</p>
            </div>)}
        <div className=' horizontal-scrollable'   >
            {allData &&
                allData.map(item => <span key={item.id}>
                    <iframe src={item.videoUrl} ></iframe>
                </span>)
            }

        </div>

    </>
}