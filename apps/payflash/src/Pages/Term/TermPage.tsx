import React from 'react';
import TermsOfService from './Components/TermsOfService';

const TermPage: React.FC = () => {
    return (
        <TermsOfService
        appName="FLash web application"
        ownerName="NGUYEN THANH SE"           
        contactEmail="thanhse123@gmail.com"
        websiteUrl="https://flash.sent.vn"
        privacyUrl="https://flash.sent.vn/privacy"
        effectiveDate="2025-10-13"
        governingLaw="Laws of Vietnam"
        isIndividual={true}
        postalAddress="Da Nang City, Viet Nam"
        />
    );
};

export { TermPage }
