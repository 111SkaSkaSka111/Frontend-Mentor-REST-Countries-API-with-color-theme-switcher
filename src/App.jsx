import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import useDebounce from "./Function/useDebounce";
import Header from "./Components/Header";
import Content from "./Components/Content";
import Pagination from "./Components/Pagination";
import ModalBox from "./Components/ModalBox";

function App() {
    const [apiData, setApiData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [valueSelect, setValueSelect] = useState("");
    const [modal, setModal] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [page, setPage] = useState(1);
    const itemPerPage = 8;

    // useDebounce untuk mengurangi load data setiap 1 detik
    // https://www.npmjs.com/package/use-debounce
    // https://www.freecodecamp.org/news/javascript-debounce-example/
    // https://usehooks.com/useDebounce/
    // https://stackoverflow.com/questions/57269229/how-to-debounce-a-function-in-react
    // https://www.freecodecamp.org/news/debouncing-in-react-js/
    const debounceText = useDebounce(searchTerm, 1000);

    const filteredData = apiData.filter((data) => {
        if (debounceText === "" && valueSelect === "") {
            return data;
        } else if (debounceText !== "" && valueSelect === "") {
            return data.name.toLowerCase().includes(debounceText.toLowerCase());
        } else if (debounceText === "" && valueSelect !== "") {
            return data.region === valueSelect;
        } else {
            return data.name.toLowerCase().includes(debounceText.toLowerCase()) && data.region === valueSelect;
        }
    });

    const lastIndex = page * itemPerPage;
    const firstIndex = lastIndex - itemPerPage;
    const currentData = filteredData.slice(firstIndex, lastIndex);

    const totalPage = Math.ceil(filteredData.length / itemPerPage);

    const handleSearch = (event) => {
        const keyword = event.target.value;
        setValueSelect("");
        setSearchTerm(keyword);
        setPage(1);
    };

    const handleSelect = (event) => {
        const keyword = event.target.value;
        if (keyword !== "") {
            setValueSelect(keyword);
            setSearchTerm("");
            setPage(1);
        }
    };

    useEffect(() => {
        fetch("data.json")
            .then((response) => response.json())
            .then((data) => setApiData(data))
            .catch((error) => console.log(error));
    }, []);

    const region = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

    const handleClick = (data) => {
        setModal(data);
        setOpenModal(!openModal);
    };

    const handleModal = () => {
        setOpenModal(!openModal);
        setModal([]);
    };

    return (
        <section>
            <header>
                <Navbar />
            </header>
            <main className="container">
                {!openModal ? (
                    <>
                        <Header handleSearch={handleSearch} searchTerm={searchTerm} valueSelect={valueSelect} handleSelect={handleSelect} region={region} />
                        <Content currentData={currentData} handleClick={handleClick} />
                        {totalPage > 1 && <Pagination page={page} setPage={setPage} totalPage={totalPage} />}
                    </>
                ) : (
                    <ModalBox handleModal={handleModal} modal={modal} />
                )}
            </main>
        </section>
    );
}

export default App;
