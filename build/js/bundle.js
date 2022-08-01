const canvas=document.getElementById("canv"),ctx=canvas.getContext("2d");let w,h;function resizeCanva(){w=canvas.width=window.innerWidth,h=canvas.height=window.innerHeight}resizeCanva(),window.addEventListener("resize",resizeCanva),ctx.fillStyle="#000",ctx.fillRect(0,0,w,h);const cols=Math.floor(w/28)+1,ypos=Array(cols).fill(0);function matrix(){ctx.fillStyle="#0001",ctx.fillRect(0,0,w,h),ctx.fillStyle="#ff7300",ctx.font="11pt foundationtitleshandmedium",ypos.forEach((e,t)=>{const n=String.fromCharCode(640*Math.random()),o=28*t;ctx.fillText(n,o,e),e>12+1e5*Math.random()?ypos[t]=0:ypos[t]=e+17})}function rotationChar(e,t,n){const o=[" ","0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],i=document.querySelector(""+t),s=e.split("");let c=[],l=0;for(let e=0;e<s.length;e++)l=o.indexOf(s[e]),c.push(l),i.textContent+=" ";let a,r=-1,u=0,d=0,m=setInterval(()=>{r++,a=i.innerHTML.split(""),a[d]=o[r],a=a.join(""),i.innerHTML=a,r==c[u]&&(u++,d++,r=-1),u==s.length&&clearInterval(m)},n)}function scrollNav(){document.querySelectorAll("#header a").forEach(e=>{e.addEventListener("click",(function(e){e.preventDefault();const t=e.target.attributes.href.value;document.querySelector(t).scrollIntoView({behavior:"smooth"})}))})}function hoverScroll(){const e=document.querySelectorAll("#header a"),t=document.querySelectorAll("section");window.addEventListener("scroll",(function(){let n=document.body.offsetHeight;t[0].getBoundingClientRect().bottom>n/2?e[1].classList.remove("focusing"):t[1].getBoundingClientRect().bottom>n/2?(e[1].classList.add("focusing"),e[2].classList.remove("focusing")):t[2].getBoundingClientRect().bottom>n/2?(e[2].classList.add("focusing"),e[1].classList.remove("focusing"),e[3].classList.remove("focusing")):t[3].getBoundingClientRect().bottom>n/2?(e[3].classList.add("focusing"),e[2].classList.remove("focusing"),e[4].classList.remove("focusing")):t[4].getBoundingClientRect().bottom>n/2&&(e[4].classList.add("focusing"),e[3].classList.remove("focusing"))}))}function nocknock(){const e=document.getElementById("btn"),t=document.getElementsByClassName("form");let n=document.getElementsByClassName("campoField");const o=document.getElementsByClassName("consoleInter");let i=document.createElement("p");const s=new Audio("build/Knock.mp3");function c(e){i.innerHTML=e,o[0].appendChild(i)}function l(e,t,n){let o=e.split("");n.innerHTML="";let i=0,s=setInterval(()=>{n.innerHTML+=o[i],i++,i===o.length&&clearInterval(s)},t)}function a(){s.play()}function r(){t[0].setAttribute("action","https://formsubmit.co/d294e71093c7206943c3e205a62802a3"),t[0].setAttribute("method","POST")}function u(){document.form1.submit()}i.classList.add("textConsole"),e.addEventListener("click",(function(e){e.preventDefault(),t[0].style.display="none",c(""),l(`Wake up, ${n[0].value}...`,100,i),setTimeout(l,4e3,"The Matrix has you...",100,i),setTimeout(c,8e3,`Knock, knock, knock, ${n[0].value}.`),setTimeout(a,9e3),setTimeout(r,9e3),setTimeout(u,1e4)}))}function menuBars(){const e=document.querySelector(".nav-toggle"),t=document.querySelector(".nav");e.addEventListener("click",()=>{t.classList.toggle("nav-menu_visible"),t.classList.contains("nav-menu_visible")?e.setAttribute("aria-label","Cerrar menú"):e.setAttribute("aria-label","Abrir menú")})}setInterval(matrix,38),setTimeout(rotationChar,2e3,"gabriel",".titleN",40),setTimeout(rotationChar,2e3,"fagundez",".titleL",31.5),setTimeout(rotationChar,2e3,"desarrollador web",".subtitle",15.5),hoverScroll(),scrollNav(),nocknock(),menuBars();
//# sourceMappingURL=bundle.js.map
