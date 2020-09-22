Per implementare il principio dell' Event Sourcing, ho memorizzato ogni stato (deposito, prelievo e trasferimento di denaro) in un apposito oggetto, e poi quest'ultimo inserito in un array in modo da avere un elenco ordinato di oggetti. Ho preferito avere un unico oggetto "Evento" per ogni Account in modo da poter avere in ogni momento tutto lo storico delle transazioni effettuate, basandomi su come funziona un banale estratto-conto.

Per quanto riguarda il trasferimento, ho deciso di salvare due stati contemporaneamente nell'array degli eventi, uno dal punto di vista del mittende ed uno dal punto di vista del destinatario, entrambi con stesso timestamp.

I campi degli eventi sono:
id, (generato randomicamente)
type, (il tipo di transizione)
timestamp,
oldBalance, (il bilancio antecedente la transazione)
newBalance, (il bilancio a transazione avvenuta)
accountId,
direction, (prelievo = OUT, deposito = IN, per il trasferimento si riferisce invece all'account destinatario/mittente)

Dal momento in cui si sta realizzando un sistema bancario, ho preferito non porre limite alla dimensione dell'array, in quanto sarebbe necessario mantenere tutto lo storico per intero. Qualora questo non fosse necessario si potrebbe mettere una dimensione fissata per l'array, e riempire quest'ultimo scartando eventualmente gli stati più vecchi.

Per eliminare eventualmente un elemento dell'array di stati, si può usare il metodo "splice(index, 1)" per eliminare l'elemento a posizione "index" dall'array.

Per quanto riguarda l'implementazione del CQRS, visto che prevede la separazione tra lettura e scrittura, ho realizzato due classi di supporto AccountQuery e AccountCommand: ad entrambi passo come parametro l'oggetto Account in modo da avere a disposizione ID, Balance e l'array delle transizioni. Su AccountQuery verranno fatte operazioni di richieste dati, come i "GET", mentre su AccountCommand verranno eseguite operazioni "SET" e tutti i metodi implementati per l'aggiornamento del bilancio (deposito, prelievo e trasferimento).

##### Per testare lo script ho stampato dei log su terminale considerando il seguente caso d'uso:

##### Account1 e Account2 inizialmente con Balance = 0.

##### Deposito di 500 su Account1.

##### Prelievo di 100 su Account1.

##### Prelievo di 1000 su Account1 - impossibile fondi insufficienti.

##### Trasferimento di 200 da Account1 a Account2.

##### Balance di Account1 = 200.

##### Balance di Account2 = 200.
