//toggle icon bar

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
   menuIcon.classList.toggle('bx-x');
   navbar.classList.toggle('active');
}

// scroll section 

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
   sections.forEach(sec => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 100;
      let height = sec.offsetHeight;
      let id = sec.getAttribute('id');

   
      if(top >= offset && top < offset + height){
         //activaet navbar Links

         navLinks.forEach(links =>{
            links.classList.remove('active');
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
         });
      }
   });

   //sticky header
   let header = document.querySelector('header');
   header.classList.toggle('sticky', window.scrollY > 100);


   //remove toggle icon and navbar when click navbar links (scroll)
   menuIcon.classList.remove('bx-x');
   navbar.classList.remove('active');
}







// selecting all required elemets

const filterItem = document.querySelector(".items");
const filterImg = document.querySelectorAll(".image");

window.onload = ()=> {
   filterItem.onclick = (selectionItem)=>{
      if(selectionItem.target.classList.contains("item")){
         filterItem.querySelector(".active").classList.remove("active"); //remove active class which is in the first
         selectionItem.target.classList.add("active"); //add that acytive class on the iser selected element or item
         let filterName = selectionItem.target.getAttribute("data-name");
         filterImg.forEach((Image)=>{
            let filterImages = Image.getAttribute("data-name");
            if((filterImages == filterName) || filterName == "all"){
               Image.classList.add("show");
            }else{
               Image.classList.add("hide");
               Image.classList.remove("show");
            }
         
         });
      }
   }
}


