import React from "react";

const ModalBox = ({ handleModal, modal }) => {
    const [languages] = modal.languages.map((item) => Object.values(item));

    return (
        <div className="modal-container">
            <div className="modal-back" onClick={handleModal}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" id="svg-back" viewBox="0 0 256 256">
                    <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
                </svg>
                <p>Back</p>
            </div>
            <div className="modal-detail">
                <div className="modal-image">
                    <img src={modal.flags.png} alt="" />
                </div>
                <div className="modal-info">
                    <h1>{modal.name}</h1>
                    <div className="details">
                        <div className="details-left">
                            <p>
                                <span>Native Name:</span> {modal.name}
                            </p>
                            <p>
                                <span>Population:</span> {modal.population}
                            </p>
                            <p>
                                <span>Region:</span> {modal.region}
                            </p>
                            <p>
                                <span>Sub Region:</span> {modal.subregion}
                            </p>
                            <p>
                                <span>Capital:</span> {modal.capital}
                            </p>
                        </div>
                        <div className="details-right">
                            <p>
                                <span>Top Level Domain:</span> {modal.topLevelDomain[0]}
                            </p>
                            <p>
                                <span>Currencies:</span> {modal.currencies[0].name}
                            </p>
                            <p>
                                <span>Languages:</span> {languages.join(", ")}
                            </p>
                        </div>
                    </div>
                    <div className="modal-borders">
                        <p>Border Countries:</p>
                        <div className="borders">
                            {modal.borders.map((item) => (
                                <p key={item}>{item}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalBox;
