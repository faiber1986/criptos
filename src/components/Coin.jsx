import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Coin = () => {

    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        getData();
    }, []);
    
    const getData = async() => {
        const {data} = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false');


        setCoins(data);
    };

    const numberWithCommas = (x) => {
        if (typeof x !== 'undefined'){return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };
    };


    const filtros = coins.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) || item.symbol.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className='container'>
            <h1 className='text-center fw-bold mt-2'>CRIPTO-MARKET</h1>
            <h6 className='text-center mt-2'>La información que necesitas para operar en el mercado</h6>
            <div className="mt-5 d-flex justify-content-center align-items-center">
                <div className="col-6">
                    <form>
                         <div className="mb-3">
                             <input type="text" placeholder='SEARCH' className='form-control' autoFocus onChange = {e => setSearch(e.target.value)}/>
                         </div>
                    </form>
                </div>
            </div>

            <table className='table'>
                <thead className='table-dark'>
                    <tr>
                        <th>Logo</th>
                        <th>Nombre</th>
                        <th>Simbolo</th>
                        <th>Precio</th>
                        <th>Rendimiento</th>
                        <th>Volumen</th>
                        <th>Capitalización</th>
                        <th>Mínimo</th>
                        <th>Máximo</th>
                    </tr>
                </thead>
                <tbody>
                    {filtros.map(item => (
                        <tr key={item.id}>
                            <td>
                                <img src={item.image} alt="img" className='img-fluid' style = {{width: '20px', height: '20px'}}/>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.symbol}</td>
                            <td>{item.current_price}</td>
                            <td className = {item.price_change_percentage_24h < 0 ? 'text-danger' : 'text-success'}>{Math.round(item.price_change_percentage_24h*100)/100}{'%'}</td>
                            <td>{numberWithCommas(item.total_volume)}</td>
                            <td>{numberWithCommas(item.market_cap)}</td>
                            <td>{item.low_24h}</td>
                            <td>{item.high_24h}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Coin


