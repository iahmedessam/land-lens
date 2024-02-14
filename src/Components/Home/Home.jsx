import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountriesData } from '../../Redux/getCountriesData';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const countries = useSelector((state) => state.countries.countries);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountryIndex, setSelectedCountryIndex] = useState(0);

    function handleKeyDown(e) {
        if (e.key === 'ArrowDown') {
            setSelectedCountryIndex((prevIndex) => Math.min(prevIndex + 1, countries.length - 1));
        } else if (e.key === 'ArrowUp') {
            setSelectedCountryIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if (e.key === 'Enter') {
            const selectedCountry = countries[selectedCountryIndex];
            setSearchValue(selectedCountry);
            setIsOpen(false);
            navigate(`/country/${selectedCountry}`);
        }
    };

    useEffect(() => {
        dispatch(getCountriesData());
    }, [dispatch]);

    return (
        <>
            <div className='bg-black min-h-screen'>
                <main className='sm:container mx-auto flex flex-col-reverse lg:grid lg:grid-cols-2 lg:mt-32 xl:mt-20'>
                    <section className='flex flex-wrap justify-center lg:justify-start m-auto px-5'>
                        {/* Text */}
                        <div> 
                            <h1 className='text-4xl text-center lg:text-left lg:text-6xl mb-4 lg:mb-4  text-white'>Land Lens</h1>
                            <p className='text-1xl sm:text-1xl font-light text-center lg:text-left lg:text-2xl mb-6 lg:mb-6 text-white '>Dive into Diversity - Your Gateway to Country Facts.</p>
                        </div>
                        {/* Input, Button & Tooltip */}
                        <div className='relative flex flex-nowrap w-4/4'>
                            <input
                                className='input '
                                type='text'
                                name='search'
                                autoComplete='off'
                                placeholder='&nbsp;Search by country name'
                                value={searchValue}
                                onFocus={() => setIsOpen(true)}
                                onChange={(e) => setSearchValue(e.target.value)}
                                onBlur={() => setTimeout(() => setIsOpen(false), 300)}
                                onKeyDown={handleKeyDown}
                            ></input>
                            <button type='button' className='btnSearch' onClick={() => navigate(`/country/${searchValue}`)}>
                                Search
                            </button>
                        </div>
                        {/* Tooltip */}
                        {searchValue && isOpen && (
                            <div className={countries.filter((country) => country.name.common.toLowerCase().startsWith(searchValue.toLowerCase())).length > 0 ? 'tooltip bg-white w-3/4 lg:w-2/4 px-1 rounded-md relative mt-1' : null}>
                                {countries
                                    .filter((country) => country.name.common.toLowerCase().startsWith(searchValue.toLowerCase()))
                                    .map((country) => (
                                        <button
                                            key={country.cca3}
                                            type='button'
                                            className='p-1 block text-left text-black border-b-2 hover:bg-blue-400 hover:text-white w-full'
                                            onClick={() => {
                                                setSearchValue(country.name.common);
                                                setIsOpen(false);
                                            }}
                                        >
                                            {country.name.common}
                                        </button>
                                    ))}
                            </div>
                        )}
                    </section>

                    <section className='w-4/6 lg:w-6/6 block m-auto mt-12 mb-2 lg:mb-0 lg:mt-0'>
                        <video src="/images/Earth.mp4" autoPlay muted loop></video>
                    </section>
                </main>
            </div>
        </>
    );
}
