import React, {useEffect} from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CreateEntryForm from '../../components/CreateEntryForm';

const CreateEntry = () => {
    useEffect(() => {
        document.title = "Create Entry";
    }, []);

    return (
        <>
            <Navbar />
            <CreateEntryForm />
            <Footer />
        </>
    );
}

export default CreateEntry;