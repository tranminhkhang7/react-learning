import React from 'react'
import { Link } from 'react-router-dom'

import Helmet from '../components/Helmet'
import HeroSlider from '../components/HeroSlider'

import heroSliderData from '../assets/fake-data/hero-slider'

const Home = () => {
    return (
        <Helmet title="Trang chủ">
            {/* hero slider */}
            <HeroSlider
                data={heroSliderData}
                control={true}
                auto={false}
                timeOut={5000}
            />
        </Helmet>
    )
}

export default Home
