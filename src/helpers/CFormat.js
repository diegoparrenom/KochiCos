
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

    const currency = (rawCurrency) => {

        return `S/.${rawCurrency}`
    }
    const hour = (rawHour) => {

        let h = parseInt(rawHour);
        let AmPm = "AM";

        if(h>12 && h<24){ 
            h=h-12;
            AmPm = "PM";
        }

        return ` ${h==24?'00':h}:00 ${AmPm}`;
    }

    return {
        date,
        currency,
        hour
    }
    
}


export default CFormat;