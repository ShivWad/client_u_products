'use client'
import { TAuthObj, TListProduct } from '@/types'
import { faArrowLeft, faArrowRight, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react'
import { LoaderButton } from '..';
import { ListProduct } from '@/utils';
import { useRouter } from 'next/navigation';

const NewProduct = ({ authObj }: { authObj: TAuthObj }) => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [city, setCity] = useState("");
    const [category, setCategory] = useState("");
    const [selectedFiles, setSelectedFiles] = useState(new Array(5).fill(0));
    const refArr = useRef(new Array(5).fill(null))
    const [err, setError] = useState("");
    // const [imageUrlArr, setImageUrlArr] = useState(new Array(5).fill(""));
    const router = useRouter();
    const NavigationButtons = () => {
        return (
            <div className='nav-button'>
                {step === 1 ? <>
                    <FontAwesomeIcon icon={faArrowRight} onClick={() => setStep(step + 1)} />
                </> : step === 5 ? <>
                    <FontAwesomeIcon icon={faArrowLeft} onClick={() => setStep(step - 1)} />
                </> :
                    <>
                        <FontAwesomeIcon icon={faArrowRight} onClick={() => setStep(step + 1)} />
                        <FontAwesomeIcon icon={faArrowLeft} onClick={() => setStep(step - 1)} />
                    </>
                }
            </div>
        )

    }

    const handleIconClick = (index: number) => {
        refArr.current[index]?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if (event.target.files) {
            const file = event.target.files[0];
            //@ts-ignore
            let tempArr = selectedFiles;
            //@ts-ignore
            tempArr[index] = file;

            setSelectedFiles((prev) => [...tempArr]);

        }
    };
    const InputImage = () => {
        return (
            <>
                Choose upto five images for your product, you can also upload images later.
                <div className='image-input'>
                    {Array(5).fill(0).map((e, index) => {
                        return (
                            <div key={`index_${index}`}>
                                {selectedFiles[index] ? <FontAwesomeIcon className='check' icon={faCheck} /> :
                                    <>
                                        <FontAwesomeIcon icon={faPlus} onClick={() => handleIconClick(index)} />
                                        <input
                                            accept="image/*"
                                            type="file"
                                            ref={(ele) => refArr.current[index] = ele}
                                            onChange={async (e) => await handleFileChange(e, index)}
                                            hidden
                                        />
                                    </>}
                            </div>)
                    })}

                </div>
            </>
        )
    }
    const handleProductList = async () => {
        let productDetails: TListProduct = {
            name: name,
            description: description,
            price: price.toString(),
            category: category,
            city: city,
            ownderId: authObj.user?._id || "",
            ownerName: authObj.user?.email || "",
        };
        // let tempFileArr = new Array(...selectedFiles);
        let formdata = new FormData();
        formdata.append("name", productDetails.name);
        formdata.append("ownerId", productDetails.ownderId);
        formdata.append("ownerName", productDetails.ownerName);
        formdata.append("category", productDetails.category);
        formdata.append("subCategory", "Others");
        formdata.append("city", productDetails.city);
        formdata.append("price", productDetails.price);
        formdata.append("description", productDetails.description);
        if (selectedFiles.length != 0) {
            let counter = 1; //need a different counter as imageFileArr can contain null values in between
            for (let i = 0; i < selectedFiles.length; i++) {
                if (selectedFiles[i] != 0) {
                    formdata.append(`image_${counter}`, selectedFiles[i]);
                    counter++;
                }
            }
        }

        let response = await ListProduct(formdata);
        console.log("response", response);
        if (response.status === "SUCCESS" && response.res?._id) {
    
            setError("");
            router.push(`/product/${response.res._id}`)
        }
        else {
            setError("Error occured: " + response.message);
        }
    }
    return (
        <div className='new-product'>
            <h1>Step {step}</h1>
            {err != "" && <h1>{err}</h1>}
            <div className='new-produt-inputs'>
                {
                    step === 1 ?
                        <>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className='global-text-input new-product-name' placeholder='Enter Name' />
                            <input type='text' className='global-text-input new-product-name' placeholder='Enter category' onChange={(e) => setCategory(e.target.value)} value={category} />

                        </> : step === 2 ?
                            <>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='global-text-input new-product-description' placeholder='Enter description' />
                            </> : step === 3 ?
                                <>
                                    <input value={price} min={0} onChange={(e) => setPrice(parseInt(e.target.value))} type="number" className='global-text-input new-product-name price' placeholder='Enter Price' />
                                    <input type='text' className='global-text-input new-product-name' placeholder='Enter city' onChange={(e) => setCity(e.target.value)} value={city} />
                                </> : step === 4 ?
                                    <>
                                        <InputImage />
                                    </>
                                    :
                                    <>
                                        <LoaderButton handleClick={async () => await handleProductList()} displayText='List product' />
                                    </>
                }

            </div>
            <NavigationButtons />
        </div>
    )


}

export default NewProduct