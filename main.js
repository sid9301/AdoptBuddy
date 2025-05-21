const petPromise = await fetch("https://learnwebcode.github.io/pet-adoption-data/pets.json")
const pets = await petPromise.json()
console.log(pets)
const template = document.querySelector("#animal-card")
const wrapper = document.createElement("div")

function decideAgeText(age){
    if(!age)
        return "less than year old"
    return age>1 ? `${age} year old`: "1 year old"
}
pets.forEach(pet=> {
    const clone = template.content.cloneNode(true)
    clone.querySelector("h3").textContent = pet.name

   
    const img = clone.querySelector("img")
    img.src = pet.photo
    img.alt = `A ${pet.species} named ${pet.name}`

     const age = new Date().getFullYear() - pet.birthYear
    const ageText = decideAgeText(age)
    clone.querySelector(".age").textContent = ageText

    clone.querySelector(".species").textContent = pet.species
    clone.querySelector(".discription").textContent = pet.description
    clone.querySelector(".name").textContent = pet.name
  //  clone.querySelector(".adopt").textContent = pet.adopted ? "Adopted" : "Available"
  clone.querySelector(".primary-btn").href = `https://learnwebcode.github.io/pet-adoption-data/pets/${pet.id}`
    wrapper.appendChild(clone)

    
});

document.querySelector(".animal").appendChild(wrapper)

const filterbtn = document.querySelectorAll(".filter-nav a")
filterbtn.forEach(el => {
    el.addEventListener("click", (e) => handleFilter(e))
}
)
function handleFilter(e) {
    let target =e.target
    e.preventDefault()
    filterbtn.forEach(el=> {
        el.classList.remove("active")
    })
    target.classList.add("active")

    filterPets(target.dataset.filter)
    function filterPets(species){
        const allPets = document.querySelectorAll(".animal-card")
        if(species == "all"){
            allPets.forEach(pet => {
                pet.style.display = ""
            })
        }
        else{
            allPets.forEach(pet => {
                if(pet.querySelector(".species").textContent == species){
                    pet.style.display = ""
                }
                else{
                    pet.style.display = "none"
                }
            })
        }
    }
}
