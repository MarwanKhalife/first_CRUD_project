const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

update.addEventListener('click', _ => {
    fetch('/artistNames', {
        method: 'put',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Dr.',
            realName: 'Dre'
        })
    })

    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        //console.log(response)
        window.location.reload(true)
    })
})

deleteButton.addEventListener('click', _ => {
    fetch('/artistNames', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          name: 'Dr.'
      })
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(data => {
            window.location.reload()
        })
  })