const socket = io.connect('http://localhost:3000')

socket.on('connected', () => {
  console.log('Socket Connected')
})
socket.on('disconnect', () => {
  console.log('Socket Disconnected')
})

/*
socket.on('click', () => console.log('server registered click event'))

document.addEventListener('click', e =>
  socket.emit('click', { x: e.clientX, y: e.clientY }) 
  // we listening for client click events
  // and sending this data to server
)
*/

socket.on('data', data => {
  document.body.innerHTML = JSON.stringify(data);
})