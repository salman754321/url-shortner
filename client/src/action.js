require("dotenv").config();
export  const CreateUrl=async(url)=>{
    console.log(url)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url })
    };
  let data= await fetch('https://url-shrtner.herokuapp.com/url', requestOptions).then(response=>response.json());

        console.log(data)
        return data;
}
