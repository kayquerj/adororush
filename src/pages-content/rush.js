
function faq(el){const item=el.closest('.faq-item'),open=item.classList.contains('open');document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));if(!open)item.classList.add('open')}
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')})},{threshold:.07,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.rv').forEach(el=>obs.observe(el));
const numObs=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.querySelectorAll('.pf-num,.tn-n').forEach(el=>{const raw=el.textContent;const num=parseFloat(raw.replace(/[^0-9.]/g,''));if(!num)return;const suf=raw.replace(/[0-9.]/g,'');let start=null;const dur=1600;const step=ts=>{if(!start)start=ts;const p=Math.min((ts-start)/dur,1);const ease=p<.5?2*p*p:(1-2*(1-p)*(1-p));const val=ease*num;el.textContent=(num<10?val.toFixed(1):Math.round(val))+suf;if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)});numObs.unobserve(entry.target)})},{threshold:.5});
document.querySelectorAll('.proof-bar,.testi-numbers').forEach(el=>numObs.observe(el));
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}})});
