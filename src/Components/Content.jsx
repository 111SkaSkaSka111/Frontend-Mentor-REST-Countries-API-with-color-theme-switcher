import React from "react";

const Content = ({ currentData }) => {
    return (
        <div className="content">
            {currentData.map((data, index) => {
                return (
                    <div className="cards" key={index}>
                        <img src={data.flags.png} alt="" className="img" />
                        <div className="info">
                            <h3>{data.name}</h3>
                            <p>
                                <span>Population:</span> {data.population}
                            </p>
                            <p>
                                <span>Region:</span> {data.region}
                            </p>
                            <p>
                                <span>Capital:</span> {data.capital}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Content;
