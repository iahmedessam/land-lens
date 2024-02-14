import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountriesData } from '../../Redux/getCountriesData';
import { useNavigate } from 'react-router-dom';

const AlphabetButton = ({ letter, onClick }) => (
    <button className='text-black font-light text-2xl mr-7 hover:text-blue-500' type='button' onClick={onClick}>
        {letter}
    </button>
);

export default function Countries() {
    const countries = useSelector((state) => state.countries.countries);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [filtered, setFiltered] = useState('');
    const [isClicked, setisClicked] = useState(false);

    function handleAlphabetClick(letter) {
        const filteredCountries = countries.filter((country) =>
            country.name.common.toUpperCase().startsWith(letter)
        );
        setFiltered(filteredCountries);
        setisClicked(true);
    };

    function handleAllCountriesClick() {
        setFiltered('');
        setisClicked(false);
    };

    function generateAlphabetButtons() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return alphabet.split('').map((letter) => (
            <AlphabetButton key={letter} letter={letter} onClick={() => handleAlphabetClick(letter)} />
        ));
    };

    useEffect(() => {
        dispatch(getCountriesData());
    }, [dispatch]);

    return (
        <>
            <div className='sm:container mx-auto'>

                <div className='mt-10 w-12/12 border shadow-md flex flex-wrap justify-center items-center py-1 '>
                    <button className='text-black font-semibold text-2xl ml-3 mr-5' type='button' onClick={handleAllCountriesClick}>
                        All
                    </button>
                    {generateAlphabetButtons()}
                </div>

                <div>
                    <img src='/images/1.jpg' alt="" className='w-5/12 block mx-auto mt-10' />
                </div>

                {isClicked ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5'>
                        {filtered
                            .slice()
                            .sort((a, b) => a.name.common.localeCompare(b.name.common))
                            .map((country) => (
                                <div key={country.cca3} className='flex items-center ml-28 mt-4'>
                                    <img src={country.flags.png} alt={country.alt} loading='lazy' className='w-8 h-4 mr-2' />
                                    <button
                                        onClick={() => navigate(`/country/${country.name.common}`)}
                                        className='text-black hover:text-blue-500'
                                    >
                                        {country.name.common}
                                    </button>
                                </div>
                            ))}
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3'>
                        {countries
                            .slice()
                            .sort((a, b) => a.name.common.localeCompare(b.name.common))
                            .map((country) => (
                                <div key={country.cca3} className='flex items-center ml-28 mt-4'>
                                    <img src={country.flags.png} alt={country.alt} loading='lazy' className='w-8 h-4 mr-2' />
                                    <button
                                        onClick={() => navigate(`/country/${country.name.common}`)}
                                        className='text-black hover:text-blue-500 truncate'
                                    >
                                        {country.name.common}
                                    </button>
                                </div>
                            ))}
                    </div>
                )}

            </div>
        </>
    );
}
