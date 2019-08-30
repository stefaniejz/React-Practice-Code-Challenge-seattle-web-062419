import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {
  
  return (
    <Fragment>
      <div className="belt">
        {props.sushis.map((sushi,index)=> {
         return  <Sushi sushi={sushi} key={index}
         onEaten={props.onEaten}/>
        })
         
      }
        <MoreButton moreSushi={props.moreSushi}/>
      </div>
    </Fragment>
  )
}

export default SushiContainer
