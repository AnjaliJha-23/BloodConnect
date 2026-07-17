export const isProfileComplete = (user) => {

    return (

        user?.bloodGroup &&
        user?.city &&
        user?.state &&
        user?.phone &&
        user?.age &&
        user?.gender

    );

};