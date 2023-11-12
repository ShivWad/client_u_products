'use client'

import React, { useState } from 'react'
import { TCategories, TLocations } from '@/types'
import Image from 'next/image'
import logo from "../public/recycle.png";
import searchIcon from "../public/search.png"
import { useRouter } from 'next/navigation';
const NavBar = ({ categoryJson, locationsJson }: { categoryJson: TCategories, locationsJson: TLocations }) => {


    const [searchQuery, setSearchQuery] = useState("");
    const [city, setCity] = useState(locationsJson["Delhi"][0]);
    const [category, setCategory] = useState(categoryJson.categories[0].subcategories[0]);
    const router = useRouter();
    const handleSearch = () => {
        let filter = `/products/filter?city=${city}&sortDirection=asc&name=${searchQuery}&category=${category}&sortBy=price`;
        console.log(filter);
        router.push(filter);
    }
    return (
        <nav className='root-navbar'>
            <Image src={logo} height={20} alt='logo' />
            <select onChange={(e) => setCategory(e.target.value)} className="custom-select" >
                {Object.keys(locationsJson).map((state, index) => {
                    return <>
                        <optgroup className="category-opt-group" key={`${state}_${index}`} label={state}>
                            {locationsJson[state].map((city, i) => {
                                return <>
                                    <option key={`${city}_${i}`} className="category-option" value={city}>{city}</option>
                                </>
                            })}
                        </optgroup  >
                    </>
                })}
            </select >
            <select onChange={(e) => setCategory(e.target.value)} className="custom-select" >
                {categoryJson.categories.map((category, index) => {
                    return <>
                        <optgroup className="category-opt-group" key={`${category.name}_${index}`} label={category.name}>
                            {category.subcategories.map((subCategory, i) => {
                                return <>
                                    <option key={`${subCategory}_${i}`} className="category-option" value={subCategory}>{subCategory}</option>
                                </>
                            })}
                        </optgroup  >
                    </>
                })}
            </select >
            <input type='text' onChange={(e) => setSearchQuery((e.target as HTMLInputElement).value)} className='search-bar' />
            <Image height={20} style={{ cursor: "pointer" }} onClick={() => handleSearch()} src={searchIcon} alt='search ico' />
        </nav>
    )
}

export default NavBar