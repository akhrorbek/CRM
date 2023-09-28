const btn = document.querySelector('button')

function deleteHandle(e) {
        const Id = `${e.target.id}`
        fetch(`/admin/student/${Id}`,{
            method: 'DELETE'
        })
        .then(res =>res)
        .then(data => {
            if(data.status == 200) {
                window.location.reload()
            }
        })
        .catch(err => console.error(err));

    }

// const button = document.querySelector('button')
// function deleteHandle(event) {
//     const Id = `${event.target.id}`
//     console.log(Id);
// }

function deleteHandleGroup(e) {
    const Id = `${e.target.id}`
    fetch(`/admin/group/${Id}`,{
        method: 'DELETE'
    })
    .then(res =>res)
    .then(data => {
        if(data.status == 200) {
            window.location.reload()
        }
    })
    .catch(err => console.error(err));

}




function deleteHandleCourse(e) {
    const Id = `${e.target.id}`
    fetch(`/admin/course/${Id}`,{
        method: 'DELETE'
    })
    .then(res =>res)
    .then(data => {
        if(data.status == 200) {
            window.location.reload()
        }
    })
    .catch(err => console.error(err));

}