'use client'
import { TAuthObj } from '@/types'
import { faArrowLeft, faArrowRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { File } from 'buffer';
import React, { createRef, use, useEffect, useRef, useState, } from 'react'
import { LoaderButton } from '..';
import { Sleep } from '@/utils';





const NewProduct = ({ authObj }: { authObj: TAuthObj }) => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [city, setCity] = useState("");
    const [category, setCategory] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const refArr = useRef(new Array(5).fill(null))
    const [imageUrlArr, setImageUrlArr] = useState(new Array(5).fill(""));
    const handleListProduct = async () => {

    }


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
        console.log(refArr);
        refArr.current[index]?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if (event.target.files) {
            const file = event.target.files[0];
            //@ts-ignore
            setSelectedFiles((prevFiles) => [...prevFiles, file]);
            let st = await selectedFiles[index].arrayBuffer();
            const blob = new Blob([st], { type: 'image' });
            let url = URL.createObjectURL(blob);

            const updatedArray = [...imageUrlArr];
            updatedArray[index] = url;
            setImageUrlArr(updatedArray);
        }
    };


    // const getFileUrl = (file: File) => {
    //     let fileReader: FileReader;
    //     fileReader = new FileReader();
    //     if (file) {
    //         fileReader = new FileReader();
    //         fileReader.onload = (e) => {
    //             const { result } = e.target;
    //             if (result && !isCancel) {
    //                 setFileDataURL(result)
    //             }
    //         }
    //         fileReader.readAsDataURL(file);
    //     }
    // }


    const getUrl = async (index: number) => {
        console.log(
            ">>>", selectedFiles[index]

        )
        // let st = await selectedFiles[index];
        // const blob = new Blob([st], { type: 'image' });
        // let url = URL.createObjectURL(blob);

        // const updatedArray = [...imageUrlArr];
        // updatedArray[index] = url;
        // setImageUrlArr(updatedArray);
        return ""
    }

    const InputImage = () => {
        return (
            <>
                Choose upto five images for your product, you can also upload images later.
                <div className='image-input'>
                    {/* <FontAwesomeIcon icon={faPlus} onClick={() => handleIconClick(0)} />
                    <input
                        type="file"
                        ref={fileInputRefs1}
                        onChange={(e) => handleFileChange(e)}
                        hidden
                    /> */}
                    {Array(5).fill(0).map((e, index) => {
                        return (
                            <div key={`inedx_${index}`}>
                                {selectedFiles[index] ?
                                    <>
                                        <img src={imageUrlArr[index]} />
                                    </> : <>
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

    return (
        <div className='new-product'>
            <h1>Step {step}</h1>
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
                                        <LoaderButton handleClick={async () => await Sleep(1990)} displayText='List product' />
                                    </>
                }

            </div>
            <NavigationButtons />
        </div>
    )


}

export default NewProduct