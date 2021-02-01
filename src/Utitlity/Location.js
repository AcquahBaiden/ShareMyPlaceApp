const GOOGLE_API_Key = 'AIzaSyDoeD2rbOd0993TrgD9O_B_zc-8qgc9XGs';

export async function getAddressFromCoords(coords){
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${GOOGLE_API_Key}`)

    const data = await (await response).json();
    if(data.error_message){
        throw new Error(data.error_message);
    }
    const address = data.results[0].formatted_address;
    return address;
}

export async function getCoordsFromAddress(address){
    const urlAddress = encodeURI(address);
    const response = fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_API_Key}`);
    // console.log(response.status.ok);
    // if(!response.status.ok){
    //     throw new Error('Failed to fetch the coordinates. Please try again');
    // }
    const data = await (await response).json();
    if(data.error_message){
        throw new Error(data.error_message);
    }

    // console.log(data);
    const coordinates = data.results[0].geometry.location;
    // console.log(coordinates); 
    return coordinates;
}