
const toggle=document.querySelector('.nav-toggle');
const links=document.querySelector('.nav-links');
if(toggle&&links){toggle.addEventListener('click',()=>{links.classList.toggle('open');toggle.setAttribute('aria-expanded',links.classList.contains('open'));});}
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
