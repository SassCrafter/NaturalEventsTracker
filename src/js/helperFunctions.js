const toggleClassName = (el, className) => {
    el.classList.toggle(className);
}

const fetchData = async (searchString) => {
    try {
        const resp = await fetch(searchString);
        if (!resp.ok) {
            throw new Error('Error');
        } else {
            const data = await resp.json();
            console.log(data);
            return data;
        }
    } catch(error) {
        console.log(error);
    }
}

export {toggleClassName, fetchData} ;