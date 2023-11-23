'use client'
import React, { useState } from 'react'
import { TCategories, TLocations } from '@/types'
import Image from 'next/image'
import logo from "../public/recycle.png";
import searchIcon from "../public/search.png"
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './components.module.css'
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
        <nav className={styles['main-nav']}>
            <Image src={logo} height={20} alt='logo' className='logo' />
            <div className={styles['nav-inner-div']}>
                <div className={styles['nav-inner-div-dropdown']}>
                    <select onChange={(e) => setCategory(e.target.value)} className={styles["custom-select"]} >
                        {Object.keys(locationsJson).map((state, index) => {
                            return <>
                                <optgroup className={styles["category-opt-group"]} key={`${state}_${index}`} label={state}>
                                    {locationsJson[state].map((city, i) => {
                                        return <>
                                            <option key={`${city}_${i}`} className={styles["category-option"]} value={city}>{city}</option>
                                        </>
                                    })}
                                </optgroup  >
                            </>
                        })}
                    </select >
                    <select onChange={(e) => setCategory(e.target.value)} className={styles["custom-select"]} >
                        {categoryJson.categories.map((category, index) => {
                            return <>
                                <option className="category-opt-group" key={`${category.name}_${index}`} label={category.name} />
                            </>
                        })}
                    </select >
                </div>
                <div className={styles["search-div"]}>
                    <input type='text' onChange={(e) => setSearchQuery((e.target as HTMLInputElement).value)} className={styles['search-bar']} />
                    <Image height={20} style={{ cursor: "pointer" }} onClick={() => handleSearch()} src={searchIcon} alt='search ico' />
                </div>
            </div>
            <div className={styles["profile-links"]}>
                <Link href={"/account"}>Profile</Link>
                <Link href={"/orders"}>Orders</Link>
            </div>
        </nav>
    )
}

export default NavBar