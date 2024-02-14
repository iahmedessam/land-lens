import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getCountryDetails } from '../../Redux/countryDetails';

export default function Country() {

    const country = useSelector(state => state.country.country);
    const dispatch = useDispatch();

    const [isloading, setisLoading] = useState(true)

    const { name } = useParams()

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    useEffect(() => {
        dispatch(getCountryDetails(name))
            .then(() => setisLoading(false));
    }, [dispatch,name]);

    return (
        <>
            {isloading
                ?
                <p>loading...</p>
                : <>
                    <div className='container mx-auto flex justify-center items-center content-center flex-grow'>
                        <div key={country.cca3} className='border shadow-lg flex justify-between w-3/4'>

                            <section className='px-8 pb-6'>
                                {/* Name */}
                                <p className=' text-8xl mb-8'>{country.name.common}</p>
                                <div className='grid grid-cols-2 gap-x-4 gap-y-2'>
                                    {/* Official */}
                                    {country.name
                                        ? <p className=''>{country.name.official}</p>
                                        : null}
                                    {/* Capital */}
                                    {country.capital
                                        ? <p className=''>Capital: {country.capital}</p>
                                        : null}
                                    {/* Area */}
                                    {country.area
                                        ? <p className=''>{country.area.toLocaleString()} KM</p>
                                        : null}
                                    {/* Borders */}
                                    {country.borders
                                        ? <p className=''>Borders: {country.borders.map((e, index) => <span key={index}>{e}&nbsp;</span>)} </p>
                                        : null}
                                    {/* Maps */}
                                    {country.maps
                                        ? <Link className='' to={country.maps.googleMaps} >Maps</Link>
                                        : null}
                                   
                                    {/* Timezone */}
                                    {country.timezones
                                        ? <p className=' '>Timezone: {country.timezones.map((e) => { <p>{e}&nbsp;|</p> })}</p>
                                        : null}
                                    {/* Region */}
                                    {country.region
                                        ? <p className=' '>Region: {country.region}</p>
                                        : null}
                                    {/* Sub Region */}
                                    {country.subregion
                                        ? <p className=' '>Sub Region: {country.subregion} </p>
                                        : null}
                                    {/* Population */}
                                    {country.population
                                        ? <p className=' '>Population: {country.population.toLocaleString()}</p>
                                        : null}
                                    {/* Start of week */}
                                    {country.startOfWeek
                                        ? <p className=' '>Week starting: {capitalizeFirstLetter(country.startOfWeek)}</p>
                                        : null}
                                    {/* Car Side */}
                                    {country.car
                                        ? <p className=' '>Car side: {capitalizeFirstLetter(country.car.side)} </p>
                                        : null}
                                    {/* Currencies */}
                                    {country.currencies
                                        ? <p className=' '>Currency: {Object.keys(country.currencies)}</p>
                                        : null}
                                    {/* United Nation Member */}
                                    {country.unMember
                                        ? <p className=' '>Member of United Nations</p>
                                        : "Not a member of United Nations"}
                                </div>
                            </section>

                            <section className=''>
                                <img src={country.flags.png} alt={country.alt} />
                            </section>
                        </div >
                    </div>
                </>
            }

        </>
    )
}
