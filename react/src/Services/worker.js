self.addEventListener('push', e => {
  const data = e.data.json()
  console.log('Push Recieved...')
  self.registration.showNotification('iiii', {
    body: 'Notified by Traversy Media!',
    icon: 'http://image.ibb.co/frYOFd/tmlogo.png'
  })
})
