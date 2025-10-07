# scopeok lathatosagi szintjei


## lathatosagi script: 	
- globalis (scope) = mindenhol elerheto
- fuggveny scope 
- egy valtozot letrehozol fuggvenyen belul, csak azon belul latszik.
- block scope - egy blockon belul letrehozott valtozot csak a block lathatja.
- modul scope - modularis esetekben jon. sajat lathatosagi szint es nem egyezik a globalis scopeal.

## esemenyvezerelt programozas:  
- egy adott esemeny beteljesulese eseten fog vegrehajtodni.
- Minden bongeszo ezt koveti.
- alkalmazasok is egy esemeny bekovetkezesere varnak es arra reagalnak.

## kulcsfontossagu fogalom:
- eventloop : feladatokat és micro taskokat teljesit
- eventqueue: ha a stack ures akkor tud oda pakolni.
- colstack: js kod aktualis

- event target: kiinditja az esemenyt

- event segitsegevel: tudok reagalni
- target: tudod hogy hogy akarod hogy mukodjon a jovoben ezert jo ha van

- addEventlistener, removeEventlistener
- inline = nincs neki neve, se semmi, nem lehet ra hivatkozni

## szintek az esemenyek kozott: window -> document -> ***** -> célelem
## bubbleing: celelem -> document -> window

- ha megcelzol egy elemet, az onnantol targetkent mukodik

- event.stopPropagation() : megallitja az esemeny terjedeset. tehat celelembol nem megy at a documentbe.
- event.stopImmeditePropagation() : nem engedi hogy tobb eventListener ugyan arra az elemre mutasson.
- evenet.preventDefault() : Megakadalyozza az esemeny bekovetkezeset. Lanculat se epul fel.

1. document.addEvenetListener('click', () => {}, {capture: true}) - nem lentrol felfele hanem fentrol lefele futtat
2. document.addEvenetListener('click', () => {}, {once: true}) - 
3. document.addEvenetListener('click', () => {}, {passive: true}) - nem engedi hogy defaultot hivjon 
4. document.addEvenetListener('click', () => {}, {signal: AbortController.signal}) - automatikusan eltavolitja az esemenykezelot ha aktivalodik. erdemes ha: tobb muveletet akarsz torolni.

- setTimeOut
- setTimeOut torlese: ha egy valtozoba ki van mentve akkor kap egy id-t --> clearTimeout(id) csak id alapjan tud torolni

- promise = micro task
- ha a macro task celba er megnezi hogy van e micro task ami hozza tartozik. Ha nincs akkor indul egy ujabb macro task.
