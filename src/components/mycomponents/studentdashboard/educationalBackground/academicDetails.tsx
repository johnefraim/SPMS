import React, { useState } from 'react';
import { CreateAcademicDetail } from './createAcademicDetails';
import { CreateAcademicDialog } from './createAcademicDialog';
import { AcademicListview } from './academicListview';

const AcademicDetailsForm = () => {
    const [open, setOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const refreshPortfolio = () => {
        setRefresh(!refresh);
    };
    const showAlertMessage = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 8000);
    }

    return (
        <>
        <section>
            <div className="ml-4 mt-2 mr-2 w-full">
                <CreateAcademicDialog showAlertDialog= {showAlertMessage} refreshAcademicListview={refreshPortfolio} onClick={()=>{setOpen(true)}}/>
                <AcademicListview refreshlist={refresh}/>
            </div>
        </section>
    </>
    );
};

export default AcademicDetailsForm;