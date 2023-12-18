const userAuthorization = (localStorageRole, linkPage) => {
    const listPageHrAccept = [
        '/projectdetailhr',
        '/projectlist',
        '/hiringrequestlistincompanypartnerdetail',
        '/laborSubleasingAgreement'
    ];
    const listPageManagerAccpet = [
        '/projectlistinmanager',
        '/listcontract',
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
        '/manageSkill',
        '/manageType',
        '/manageLevel'
    ]

    const listPageStaffAccper = [
        '/listcompanyPartner',
        '/newlistinterview',
        '/listreportinmanager',
        '/listcompanyPartnerdetail',
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
    if (localStorageRole === "Staff") {
        return listPageStaffAccper.includes(linkPage);
    }
};

export default userAuthorization;