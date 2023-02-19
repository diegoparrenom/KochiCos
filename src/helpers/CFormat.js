
const CFormat = () => {

    const date = (rawDay) => {

        let date = rawDay.split(' ')[0]; 

        return {
            "day":date.split('-')[0],
            "month":date.split('-')[1],
            "year":date.split('-')[2],
            "hour":rawDay.split(' ')[1]
        }
    }

    return {
        date
    }
    
}


export default CFormat;