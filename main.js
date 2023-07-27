const search = document.querySelector("#search");
const content = document.querySelector(".content");
const errorCase = document.querySelector(".errorCase");
const err = document.getElementById("error");

const listItems = [];

getData();
async function getData() {
  try {
    const res = await fetch("https://randomuser.me/api?results=50").catch(
      (error) => {
        throw new Error(error);
      }
    );
    console.log(res);
    if (!res.ok) {
      throw new Error(`Error ${res.status} ${res.statusText}`);
    } else {
      const data = await res.json();
      // console.log(data);

      const { results } = data;
      // console.log(results);
      content.innerHTML = "";
      results.forEach((user) => {
        const li = document.createElement("li");
        listItems.push(li);

        li.id = "listInfo";

        li.innerHTML = ` 
     <div class="imgInfo ">
      <img src="${user.picture.large}" alt="">
     </div>
     <div class="informations">
      <h4 class="title ">${user.name.first}  ${user.name.last}</h4> 
      <p class="small-title  ">${user.location.city} 
      ${user.location.state}
  
      </p>
     </div>
    `;

        content.appendChild(li);
      });
    }
  } catch (error) {
    content.innerHTML = "";

    err.innerHTML = error.message;
    errorCase.classList.add("active");
  }
}

const filterData = (eo) => {
  let searchData = search.value.toLowerCase();
  let li = document.querySelectorAll("#listInfo");
 console.log(li, searchData);
 li.forEach(item => {
  let items = item.innerText.toLowerCase()
  if (items.indexOf(searchData) != -1) {
    item.style.display= 'block'
  } else {
    item.style.display= 'none'
  }
 })
};
search.addEventListener('keyup', filterData)

