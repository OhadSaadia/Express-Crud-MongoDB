

const updateBtn = document.getElementById('updatebtn');

const ahcavQuote = {
    name:'Achav',
    quote: 'jieijei'
};

updateBtn.addEventListener('click' , () => {
    fetch('/quotes',
            {
                method:'PUT',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(ahcavQuote)
            }        
    );
});

const deleteBtn = document.getElementById('deletebtn');

deleteBtn.addEventListener('click' , () => {
    let response = fetch('/quotes',
                            {
                                method: 'DELETE',
                                headers: {'Content-Type' : 'application/json'},
                                body: JSON.stringify({name:'Achav'})
                            }          
    );
});