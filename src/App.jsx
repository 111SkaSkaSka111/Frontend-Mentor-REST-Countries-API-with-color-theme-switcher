import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import useDebounce from "./Function/useDebounce";
import Header from "./Components/Header";
import Content from "./Components/Content";
import Pagination from "./Components/Pagination";

function App() {
    const [apiData, setApiData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [valueSelect, setValueSelect] = useState("");
    const [page, setPage] = useState(1);
    const itemPerPage = 8;

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

    return (
        <section>
            <header>
                <Navbar />
            </header>
            <main className="container">
                <Header handleSearch={handleSearch} searchTerm={searchTerm} valueSelect={valueSelect} handleSelect={handleSelect} region={region} />
                <Content currentData={currentData} />
                {totalPage > 1 && <Pagination page={page} setPage={setPage} totalPage={totalPage} />}
            </main>
        </section>
    );
}

export default App;
