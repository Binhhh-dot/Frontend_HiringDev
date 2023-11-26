const userAuthorization = (localStorageRole, linkPage) => {
    const listPageHrAccept = [
        '/projectdetailhr',
        '/projectlist',
        '/hiringrequestlistincompanypartnerdetail',
        '/laborSubleasingAgreement'
    ];
    const listPageManagerAccpet = [
        '/newlistinterview',
        '/projectlistinmanager',
        '/listcontract',
        '/listcompanyPartner',
        '/manager',
    ]

    if (localStorageRole === "HR") {
        return listPageHrAccept.includes(linkPage);
    }
    if (localStorageRole === "Manager") {
        return listPageManagerAccpet.includes(linkPage);
    }
};

export default userAuthorization;