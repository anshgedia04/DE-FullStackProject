
export const post_data_fetch = async (url, data) => {
    const token = localStorage.getItem("token");
    console.log("token :",token);
    const responce = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    })
    if(!responce.ok){
        throw new Error('Failed to fetch data in post_data_fetch function');
    }
    return responce.json();
};
    