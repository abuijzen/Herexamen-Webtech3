//chat oproepen
fetch('http://localhost:3000/api/v1/chat', {
    
    //nodige headers meegeven met localstorage
    'headers':{
        'Authorization': 'Bearer ' + localStorage.getItem('token')
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
input.addEventListener("keyup", e => {
    if (e.keyCode === 13){
        let text = input.value;

        //iets posten met de juiste token
        fetch('http://localhost:3000/api/v1/chat',{
            method : "post",
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "text": text
            })
        })//als dit lukt, dan krijg je het volledige document terug
        .then(result =>{
            return result.json();

        }).then(json => {
            console.log(json);
            //html opbouw voor 1 message
            //tekst opvullen met json.data.message.text

            /*<div class="todo__text">${req.user._id}</div>*/

            let message = `<div class="todo">
            <input type="checkbox" class="todo__state">
            
            <div class="todo__text">${json.data.message.text}</div>
            <a class="todo__delete" href="#" data-id="${json.data.message._id}">delete</a>
            </div>`

            document.querySelector(".todo__new ").insertAdjacentHTML('afterend', message);

        }).catch(err => {
            console.log(err)
        })
    }

    e.preventDefault();
});