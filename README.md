# CLS-Transactions
## Erkenntnisse

* Wenn Services orchestraten, wird nur ein @Transactional über jeder schreibenden Service-Methode (oder am besten über
  allen?) benötigt (sinnvollster Ansatz)
* @Transactional erstellt einen CLS Context, falls es keinen gibt!
* Über Umwege ist der jeweils äußerste Call, der eine Transaktion startet, dafür verantwortlich und committed diese auch
* Ob der gleiche Kontext (zwischen Tests) verwendet wird, ist egal, da die erste Transaktion immer committed (und damit beim nächsten mal eine neue erzeugt werden muss)
  * Theoretisch sollte auch der Context immer neu erstellt werden, muss allerdings nicht extra enforced werden

## Implementierung
Daraus lässt sich folgende Implementierung ableiten:
* ClsModule mit Plugin in `app.module.ts` instanzieren
* `@Transactional` über jede schreibende Service-Methode geben
* Tests müssen nicht angepasst werden