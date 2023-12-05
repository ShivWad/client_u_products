'use client'
import React, { useState } from 'react'
import { TCategories, TLocations } from '@/types'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './components.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecycle, faUser, faSearch, faBars, faL } from '@fortawesome/free-solid-svg-icons';

const NavBar = ({ categoryJson, locationsJson }: { categoryJson: TCategories, locationsJson: TLocations }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [city, setCity] = useState("");
    const [category, setCategory] = useState("");
    const [showHBM, setShowHBM] = useState(false);
    const router = useRouter();
    const handleSearch = () => {
        if (searchQuery.length < 1) {
            return
        }
        let filter = `/products/filter?name=${searchQuery}&sortBy=price&sortDirection=asc`;
        if (city.length > 0) filter += `&city=${city}`;
        if (category.length > 0) filter += `&category=${category}`;
        router.push(filter);
    }

    return (
        <>
            <nav className={styles['main-nav']}>
                <div onClick={() => setShowHBM(false)} className={`${styles['nav-ham-bg']} ${styles[showHBM ? 'show-hm' : 'hide-hm']}`}></div>
                <Link className={styles['logo-link']} href={"/"}><FontAwesomeIcon icon={faRecycle} size={"2x"} /></Link>
                <div className={styles['nav-inner-div']}>
                    <FontAwesomeIcon className={styles['hm-menu-toggle']} icon={faBars} size='1x' onClick={() => { setShowHBM(!showHBM) }} />
                    <div className={styles['nav-inner-div-dropdown']}>
                        <select onChange={(e) => setCity(e.target.value)} className={styles["custom-select"]} >
                            <option key={"dasdkjasdfh"} value="hide" style={{ display: "none" }} >Select state</option>
                            {Object.keys(locationsJson).map((state, index) => {
                                return <>
                                    <option value={state} className={styles["category-opt-group"]} key={`${state}_${index}`} label={state}></option  >
                                </>
                            })}
                        </select >
                        <select onChange={(e) => setCategory(e.target.value)} className={styles["custom-select"]} >
                            <option key={"faguohls"} value="hide" style={{ display: "none" }} >Categories!</option>
                            {categoryJson.categories.map((category, index) => {
                                return <>
                                    <option className={styles["category-opt-group"]} key={`${category.name}_${index}`} label={category.name} value={category.name} />
                                </>
                            })}
                        </select >
                    </div>
                    <div className={styles["search-div"]}>
                        <input type='text' onChange={(e) => setSearchQuery((e.target as HTMLInputElement).value)} onKeyDown={(e) => {
                            if (e.key === "Enter") handleSearch();
                        }} className={styles['search-bar']} />
                        <FontAwesomeIcon fill='black' cursor={'pointer'} onClick={() => handleSearch()} size={"2x"} icon={faSearch} />
                    </div>
                </div>
                <div className={`${styles["profile-links"]}`}>
                    <Link href={"/account"}><FontAwesomeIcon icon={faUser} size={"2x"} /></Link>
                </div>
            </nav >
            <div className={`${styles['nav-ham-menu']} ${styles[showHBM ? 'show-hm' : 'hide-hm']}`}>
                <FontAwesomeIcon className={styles['hm-menu-toggle']} icon={faBars} size='2x' onClick={() => { setShowHBM(!showHBM) }} />
                <div className={styles["container"]}>
                    <Link href={"/account"} className={styles["nav-bar-links"]}><div><FontAwesomeIcon icon={faUser} size={"2x"} /></div></Link>
                </div>

                {categoryJson.categories.map((category, index) => {
                    return (
                        <div key={category + " " + index + "0"} className={`${styles["container"]}`}>
                            <Link key={category + " " + index} className={styles["nav-bar-links"]} href={`/products/filter?sortDirection=asc&category=${category.name}&sortBy=price`}>{category.name}</Link>
                        </div>
                    )
                })}
            </div >


        </>
    )
}

export default NavBar