import React from 'react'

// import components
import CarouselComp from '../components/carousel'
import Products from '../components/products'

class Home extends React.Component{
    render(){
        return(
            <div>
                <CarouselComp/>
                <Products/>
            </div>
        )
    }
}

export default Home