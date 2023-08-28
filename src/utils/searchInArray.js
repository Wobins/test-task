export default function searchInArray (query, tab) {
    let newTab = tab.filter(function (el) {
        return query.toLowerCase() === "" ? el : el.name.toLowerCase().includes(query)
    });
    return newTab;  
}