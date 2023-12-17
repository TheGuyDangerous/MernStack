const url = 'https://dummyjson.com/users'

const tableElem = document.querySelector('table');


const getUsers = async() => {
  try {
    let response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

const renderUsers =  async() => {
  let users = (await getUsers()).users;
  let tableElem = document.querySelector('table');
  let html = tableElem.innerHTML;
  users.forEach(user => {
    let htmlSegment = `
    <tr>
      <td style='text-align:center;'>${user.id}</td>
      <td style='text-align:center;'><img src='${user.image}' height='45px'/></td>
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.gender}</td>
      <td>${user.email}</td>
      <td>${user.username}</td>
      <td>${user.domain}</td>
      <td>${user.ip}</td>
      <td>${user.university}</td>
  </tr>  
    `
    html += htmlSegment
  })

  tableElem.innerHTML = html;
}

renderUsers()
