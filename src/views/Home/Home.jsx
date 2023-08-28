import React, {useEffect} from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ListEntries from '../../components/ListEntries';

const Home = () => {
    useEffect(() => {
        document.title = "Home";
    }, []);

    return (
        <>
            <Navbar />
            <ListEntries />
            <Footer />
        </>
    );
}

export default Home;