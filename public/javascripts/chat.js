//chat oproepen
fetch("http://localhost:3000/api/v1/chat",{

    //nodige headers meegeven met localstorage
    'headers':{
        'Authorization': 'Bearer' + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();
}).then(json =>{
    console.log(json);
}).catch(err =>{
    console.log("Unauthorized")
});


// chatbericht versturen met "enter-toets"

let input = document.querySelector(".todo__input");
input.addEventListener("keyup",e =>{
    if (e.keyCode === 13){
        let text = input.nodeValue;

        fetch('http://localhost:3000/api/v1/chat',{
            
        })
    }
})