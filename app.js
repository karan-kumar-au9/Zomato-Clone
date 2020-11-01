const sub = document.getElementById('sub'); //get the form id
const input = document.getElementById('searchInput'); //get the search input id
const searchList = document.getElementById('searchList');
const searchInfo = async searchJson => { //am using Es6 arrow function here


    const response = await fetch('./info.json');

    const info = await response.json()
    let list = info.filter(infos => {
        const infoReg = new RegExp(`^${searchJson}`, 'gi');

        return infos.name.match(infoReg); 


    });


    if (searchJson.length == 0) {
        list = [];
        searchList.innerHTML = ''; 

    }

    outputInfo(list);
};
const outputInfo = list => {
    if (list.length > 0) {
        //add the search value you want to show when you search the page
        const inputValue = list.map(info => `
             <div class="card card-body mt-3 mb-3" style="background: #eee;">
                    <h3><a href="${info.url}" target="_blank">${info.name}</a></h3>
                    <p>${info.text}    <span class="text-secondary">${info.number}</span></p> 
                </div>
        `).join('');
        // add the searched value(inputValue) to the div in index.html (searchList)
        searchList.innerHTML = inputValue;
    }
}



// add Eventlistener to the input
sub.addEventListener('input', (e) => {
    
    searchInfo(input.value); //
    
});
