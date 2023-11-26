const userAuthorization = (localStorageRole, linkPage) => {
    const listPageHrAccept = [
        '/projectdetailhr',
        '/projectlist',
        '/myprofile',
        '/hiringrequestlistincompanypartnerdetail',
        '/laborSubleasingAgreement'
    ];

    if (localStorageRole === "HR") {
        return listPageHrAccept.includes(linkPage);
    } else {
        return false;
    }
};

export default userAuthorization;