
const INITIAL_MS = 2 * 60 * 1000; 
const EXTEND_MS = 30 * 1000;      
const TICK_MS = 250;              
const TOAST_MS = 2.5 * 1000;      


const timerEl = document.querySelector("#timer");       
const statusEl = document.querySelector("#status");     
const extendBtn = document.querySelector("#extendBtn"); 
const cancelBtn = document.querySelector("#cancelBtn"); 
const toastEl = document.querySelector("#toast");       


let deadline = Date.now() + INITIAL_MS; 
let tickTimeoutId = null;               
let expireTimeoutId = null;             
let expired = false;                    

const pad = n => n.toString().padStart(2, "0");
/**
 * 
 * @param {*} ms 
 * @returns 
 */
function msToMMSS(ms) {
    const sec = Math.max(0, Math.ceil(ms / 1000)); 
    const m = Math.floor(sec / 60);                
    const s = sec % 60;                            
    return `${pad(m)}:${pad(s)}`;                  
}
/**
 * 
 */
function renderTime() {
    const remaining = deadline - Date.now();       
    timerEl.textContent = msToMMSS(remaining);     
}
/**
 * 
 */
function scheduleTick() {
    tickTimeoutId = setTimeout(() => {
        renderTime();                             
        if (!expired) scheduleTick();              
    }, TICK_MS);
}

/**
 * 
 */
function scheduleExpire() {
    const remaining = Math.max(0, deadline - Date.now()); 
    expireTimeoutId = setTimeout(onExpire, remaining);    
}

/**
 * 
 */
function clearTimer() {
    if (tickTimeoutId) {
        clearTimeout(tickTimeoutId);
        tickTimeoutId = null;
    }
    if (expireTimeoutId) {
        clearTimeout(expireTimeoutId);
        expireTimeoutId = null;
    }
}

/**
 * 
 */
function disableActions() {
    extendBtn.disable = true;
    cancelBtn.disable = true;
}

/**
 * 
 * @returns 
 */
function onExpire() {
    if (expired) return;                            
    expired = true;
    clearTimer();                                   
    statusEl.textContent = 'Lejárt az idő. A foglalás felszabadult';
    timerEl.textContent = '00:00';                  
    disableActions();                               
}

/**
 * 
 * @returns 
 */
function onExtend() {
    if (expired) return;                            
    deadline += EXTEND_MS;                          
    statusEl.textContent = 'Hosszabbítva +30 mp';
    if (expireTimeoutId) {
        clearTimeout(expireTimeoutId);              
        scheduleExpire();
    }
    renderTime();                                   
}
/**
 * 
 * @returns 
 */
function onCancel() {
    if (expired) return;                            
    expired = true;
    clearTimer();                                   
    statusEl.textContent = 'A foglalást lemondtad';
    timerEl.textContent = '00:00';                  
    disableActions();                              
}

/**
 * 
 * @returns 
 */
function showToastOnce() {
    if (toastEl.dataset.shown === '1') return;      
    toastEl.dataset.shown = '1';                    
    toastEl.classList.add('show');                  
    setTimeout(() => toastEl.classList.remove('show'), TOAST_MS); 
}


extendBtn.addEventListener("click", onExtend);      
cancelBtn.addEventListener("click", onCancel);      


document.addEventListener("visibilitychange", () => {
    if (document.hidden && !expired) showToastOnce();
});


document.addEventListener("keydown", (e) => {
    if (e.key.toLocaleLowerCase() === "e") onExtend(); 
    if (e.key === "Escape") onCancel();                
});


renderTime();        
scheduleTick();       
scheduleExpire();     
