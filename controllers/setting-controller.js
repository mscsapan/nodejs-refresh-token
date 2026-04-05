export const getSetting = async (req, res, next) => {
    try {
        res.json({
            success: true,
            message: 'Successfully fetch',
            version: '1.0.0',
            developer: 'Mohammad Ali',
            designation: 'Mobile Application Developer',
            email: 'mscsapan@gmail.com',
            phone: '+8801624188877',
            address: 'Dhaka, Bangladesh'
        });

    } catch (error) {
        next(error);
    }
};