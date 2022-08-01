const md = document.querySelector('.md');
const linkButton = document.querySelectorAll('.link-button');
linkButton.forEach(e =>{
  e.addEventListener("click", ()=>{
    const linkSrc = e.getAttribute("src")
    md.src = linkSrc
  })
})
