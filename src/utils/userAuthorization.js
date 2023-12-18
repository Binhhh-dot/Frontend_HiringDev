const userAuthorization = (localStorageRole, linkPage) => {
    const listPageHrAccept = [
        '/projectdetailhr',
        '/projectlist',
        '/hiringrequestlistincompanypartnerdetail',
        '/laborSubleasingAgreement',
        '/notificationList',
        '/reportList',
        '/contractListHr',
        '/transactionlist',
        '/createproject',
        '/createReport',
        '/companydetails',
        '/myprofile',
    ];
    const listPageManagerAccpet = [
        '/newlistinterview',
        '/projectlistinmanager',
        '/listcontract',
        '/listcompanyPartner',
        '/manager',
        '/listcontract',
        '/projectlistinmanager',
        '/listAccountDeveloper',
    ]
    const listPageAdminAccpet = [
        '/listAccountHR',
        '/listAccountManager',
        '/listAccountStaff',
        '/listcompanyPartner',
    ]

    if (localStorageRole === "HR") {
        return listPageHrAccept.includes(linkPage);
    }
    if (localStorageRole === "Manager") {
        return listPageManagerAccpet.includes(linkPage);
    }
    if (localStorageRole === "Admin") {
        return listPageAdminAccpet.includes(linkPage);
    }
};

export default userAuthorization;