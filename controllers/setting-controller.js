export const getSetting = async (req, res, next) => {
    try {
        res.json({
            success: true,
            message: 'Successfully fetch',
            version: '1.0.0',
            developer: 'Mohammad Ali',
            designatin: 'Mobile App Developer',
            email: 'mscsapan@gmail.com',
            phone: '+8801624188877'
        });

    } catch (error) {
        next(error);
    }
};