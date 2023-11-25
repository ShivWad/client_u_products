'use client'
import React, { useState } from 'react'
import { TCategories, TLocations } from '@/types'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './components.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecycle, faUser, faCartShopping, faSearch, faBars } from '@fortawesome/free-solid-svg-icons';

const NavBar = ({ categoryJson, locationsJson }: { categoryJson: TCategories, locationsJson: TLocations }) => {


    const [searchQuery, setSearchQuery] = useState("");
    const [city, setCity] = useState(locationsJson["Delhi"][0]);
    const [category, setCategory] = useState(categoryJson.categories[0].subcategories[0]);
    const [showHBM, setShowHBM] = useState(false);
    const router = useRouter();
    const handleSearch = () => {
        let filter = `/products/filter?city=${city}&sortDirection=asc&name=${searchQuery}&category=${category}&sortBy=price`;
        router.push(filter);
    }
    return (
        <>
            <nav className={styles['main-nav']}>
                <Link href={"/"}><FontAwesomeIcon icon={faRecycle} size={"2x"} /></Link>
                <div className={styles['nav-inner-div']}>
                    <FontAwesomeIcon className={styles['hm-menu-toggle']} icon={faBars} size='1x' onClick={() => { setShowHBM(!showHBM) }} />
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
                        <FontAwesomeIcon style={{ cursor: "pointer" }} onClick={() => handleSearch()} size={"2x"} icon={faSearch} />
                    </div>
                </div>
                <div className={`${styles["profile-links"]} ${styles[showHBM ? 'show-hm' : 'hide-hm']}`}>
                    <Link href={"/account"}><FontAwesomeIcon icon={faUser} size={"2x"} /></Link>
                    <Link href={"/orders"}><FontAwesomeIcon icon={faCartShopping} size={"2x"} /></Link>
                </div>
            </nav>


            <div className={`${styles['nav-ham-menu']} ${styles[showHBM ? 'show-hm' : 'hide-hm']}`}>
                <FontAwesomeIcon className={styles['hm-menu-toggle']} icon={faBars} size='2x' onClick={() => { setShowHBM(!showHBM) }} />

                <div className={styles["profile-links"]}>
                    <Link href={"/account"}> <div>Account <FontAwesomeIcon icon={faUser} size={"2x"} /></div></Link>
                    <Link href={"/orders"}> <div>Orders <FontAwesomeIcon icon={faCartShopping} size={"2x"} /></div></Link>
                </div>

                {/* <select onChange={(e) => setCategory(e.target.value)} className={styles["custom-select"]} >
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
                </select > */}
            </div >
        </>
    )
}

export default NavBar