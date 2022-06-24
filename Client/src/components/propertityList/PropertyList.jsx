import React,{useState} from 'react';
import useFetch from '../../hooks/useFetch';
import "./propertyList.css";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
const override = css`
display: block;
margin: 0 auto;
border-color: red;
`;


const PropertyList = () => {
    const [color, setColor] = useState("#ffffff");
    const {data, loading} = useFetch("/hotels/countByType")
    console.log(data)
    const images = [
        "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg"
    ]
let dataitem = [...data]
console.log(dataitem)
  return (
    <div className='pList'>
       { loading ?
        (<>
        <div className="sweet-loading">
            <ClipLoader color={color} css={override} size={100} />
        </div>
       </>) : (
           <>

           {/* trying the double map then we wont have the var for dataitem
                 {
                data && img.map((data, i) => (
                    <div className="pListItem" key={i}>
                        <img src={images[i]} alt="" className="pListImg"/>
                    <div className="pListTitles" key={i}>
                        <h1>{data.type}</h1>
                        <h2>{data.count} {data.type}</hb n bb bbbbbbb2>
                    </div>    
                 </div> 
                ))
            }
           
           */}
            {
                dataitem.map((data, i) => (
                    <div className="pListItem" key={i}>
                        <img src={images[i]} alt="" className="pListImg"/>
                    <div className="pListTitles" key={i}>
                        <h1>{data.type}</h1>
                        <h2>{data.count} {data.type}</h2>
                    </div>    
                 </div> 
                ))
            }
           </>
           )
       }
    </div>
  )
}

export default PropertyList